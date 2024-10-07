import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../../store/store";

const SignIn = () => {
  const { isLogin, setFields } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Простая проверка заполненности полей
    if (!username || !password) {
      toast.warn("Please fill in both fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Пример запроса для проверки логина
    const response = await fetch(
      `http://localhost:3000/users?username=${username}&password=${password}`
    );
    const userData = await response.json();

    if (userData.length) {
      // Успешный вход
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("username", username);
      setFields({ isLogin: true });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Invalid username or password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex justify-center mt-20 font-poppins">
      <form onSubmit={handleLogin} className="w-[300px]">
        <ToastContainer />
        <h2 className="text-center text-2xl mb-6">Login</h2>

        {/* Username */}
        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-black rounded mb-4"
          placeholder="Enter username"
        />

        {/* Password */}
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-black rounded mb-4"
          placeholder="Enter password"
        />

        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-700 transition"
        >
          Login
        </button>
        <Link to={"/register"}>
          <p className="font-normal text-4 mt-5">
            you have account? <span className="text-blue-600">register</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
