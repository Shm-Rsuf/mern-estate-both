import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser", currentUser);
  return (
    <header className="bg-slate-300 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Usuf</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-2 rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent placeholder:text-black focus:outline-none w-24 sm:w-64 px-1"
          />
          <FaSearch className="text-slate-500 cursor-pointer" />
        </form>
        <ul className="flex gap-3">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline duration-300 cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline duration-300 cursor-pointer">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avater}
                alt={currentUser.username}
                className="rounded-full h-8 w-8 object-cover"
              />
            ) : (
              <li className="text-slate-700 hover:underline duration-300 cursor-pointer">
                Sing in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
