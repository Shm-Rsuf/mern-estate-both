import { useSelector } from "react-redux";
import SectionTitle from "../components/shared/SectionTitle";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 h-screen max-w-lg mx-auto">
      <SectionTitle title="Profile" />

      <form className="flex flex-col gap-5">
        <img
          src={currentUser.avater}
          alt={currentUser.username}
          className="rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-2"
        />
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
