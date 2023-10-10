import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /* handleChange */
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  /* handleSubmit */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 h-screen max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8">Sign In</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className="border rounded-md p-2 focus:outline-none"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="border rounded-md p-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-slate-700 text-white p-2 rounded-md uppercase tracking-wide hover:bg-slate-600 duration-300 cursor-pointer disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading.." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-1 mt-7">
        <p>Do not have an account?</p>
        <Link to="/sign-up" className="text-blue-700 underline">
          Sign up
        </Link>
      </div>
      {error && <p className="text-rose-500 mt-3">{error}</p>}
    </div>
  );
};

export default SignIn;
