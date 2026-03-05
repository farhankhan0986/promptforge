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
    <div className="min-h-screen flex justify-center items-center bg-background text-textdark animate-fade-in">
      {/* Auth container — typography-driven, minimal */}
      <div className="w-80">
        {/* Editorial heading */}
        <h2 className="text-editorial-lg text-textdark mb-1">
          {isLogin ? "Login" : "Register"}
        </h2>
        <div className="w-8 h-0.5 bg-primary mb-8" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
                Name
              </label>
              <input
                name="name"
                placeholder="Your name"
                onChange={handleChange}
                required
                className="input-forge"
              />
            </div>
          )}

          <div>
            <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
              Email
            </label>
            <input
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="input-forge"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="input-forge"
            />
          </div>

          <button className="btn-primary w-full mt-2">
            <span className="font-mono text-xs">
              {isLogin ? "login →" : "register →"}
            </span>
          </button>
        </form>

        <p
          className="mt-6 cursor-pointer font-mono text-xs text-primary
            hover:text-textdark transition-colors duration-200 hover-underline inline-block"
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