import { useSelector } from "react-redux";
import SectionTitle from "../components/shared/SectionTitle";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [availableFile, setAvailableFile] = useState({});

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

  return (
    <div className="p-3 h-screen max-w-lg mx-auto">
      <SectionTitle title="Profile" />

      <form className="flex flex-col gap-5">
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
          type="text"
          name="username"
          id="username"
          placeholder="username"
          className="border rounded-md p-2 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="border rounded-md p-2 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="border rounded-md p-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={false}
          className="bg-slate-700 text-white p-2 rounded-md uppercase tracking-wide hover:bg-slate-600 duration-300 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500">Delete an account</span>
        <span className="text-red-500">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
