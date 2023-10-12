import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* handleGoogleClick */
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
        }),
      });

      const data = await res.json();
      console.log("google", data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-rose-50 p-2 rounded-md uppercase tracking-wide hover:bg-red-500 duration-300 cursor-pointer disabled:bg-red-500 disabled:cursor-not-allowed"
    >
      sign in with google
    </button>
  );
};

export default OAuth;
