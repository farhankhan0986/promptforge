import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const { data } = await API.post(endpoint, form);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-background text-textdark">
      <div className="bg-surface p-10 rounded-lg w-80 text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-sidebar">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full p-2.5 my-2.5 rounded-md border border-primary bg-background text-textdark placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-2.5 my-2.5 rounded-md border border-primary bg-background text-textdark placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-2.5 my-2.5 rounded-md border border-primary bg-background text-textdark placeholder-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button className="w-full p-2.5 mt-2.5 rounded-md border-none bg-primary hover:bg-sidebar text-white cursor-pointer transition-colors font-medium">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="mt-4 cursor-pointer text-sm text-primary hover:text-sidebar transition-colors"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;