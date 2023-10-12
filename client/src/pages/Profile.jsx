import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../components/shared/SectionTitle";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/features/user/userSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  /* hooks */
  const [file, setFile] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [availableFile, setAvailableFile] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(availableFile);

  /* using here useEffect hook */
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  /* handleFileUpload */
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    /* test code */
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvailableFile({ ...availableFile, avater: downloadURL });
        });
      }
    );
    /* test code */
  };

  /* handleChangeData */
  const handleChangeData = (event) => {
    setAvailableFile({
      ...availableFile,
      [event.target.id]: event.target.value,
    });
  };

  /* handleSubmit */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());

      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(availableFile),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  /* handleDeleteAccount */
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = response.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  /* handleSignOut */
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const response = await fetch("/api/auth/signout");
      const data = await response.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 h-screen max-w-lg mx-auto">
      <SectionTitle title="Profile" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="file"
          id="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={availableFile.avater || currentUser.avater}
          alt={currentUser.username}
          className="rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-2"
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">error image upload</span>
          ) : percentage > 0 && percentage < 100 ? (
            <span className="text-slate-700">{`uploading image ${percentage}%`}</span>
          ) : percentage === 100 ? (
            <span className="text-green-700">image successfully uploaded</span>
          ) : null}
        </p>

        <input
          onChange={handleChangeData}
          type="text"
          name="username"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border rounded-md p-2 focus:outline-none"
        />
        <input
          onChange={handleChangeData}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border rounded-md p-2 focus:outline-none"
        />
        <input
          onChange={handleChangeData}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="border rounded-md p-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-2 rounded-md uppercase tracking-wide hover:bg-slate-600 duration-300 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          {loading ? "Loading" : "update"}
        </button>

        <Link
          to="/create-listing"
          disabled={false}
          className="bg-green-700 text-white p-2 rounded-md uppercase tracking-wide hover:bg-green-600 duration-300 cursor-pointer disabled:bg-green-500 disabled:cursor-not-allowed text-center"
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-500 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer">
          Sign out
        </span>
      </div>
      {error && <p className="text-rose-500 mt-3">{error}</p>}
      {updateSuccess ? (
        <p className="text-green-700 mt-3">info successfully uploaded</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
