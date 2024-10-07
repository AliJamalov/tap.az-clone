import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const hanldeRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warn("please fill all requireds fields", {
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

    if (password !== confirmPassword) {
      toast.warn("passwords does not match", {
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

    if (password.length < 6) {
      toast.warn("password is weak", {
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

    const newUser = {
      username,
      password,
    };

    const existingUserResponse = await fetch(
      `http://localhost:3000/users?username=${username}`
    );
    const exisitingUserData = await existingUserResponse.json();
    if (exisitingUserData.length) {
      toast.warn("username already exists", {
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
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    toast.success("Registration successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="flex justify-center mb-20 mt-[80px] font-poppins">
      <form onSubmit={hanldeRegister}>
        <h2 className="text-center text-2xl mb-6">Register</h2>
        <ToastContainer />
        {/* username */}
        <label>username</label>
        <div className="flex mt-2 w-[300px]">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border w-full border-black px-[7px] py-[5px] rounded-[8px] outline-none"
            placeholder="username..."
          />
        </div>
        {/* password */}
        <label className="block mt-4">password</label>
        <div className="flex mt-2 w-[300px] relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="border w-full border-black px-[7px] py-[5px] rounded-[8px] outline-none"
            placeholder="password"
          />
          {showPassword ? (
            <IoIosEyeOff
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-[10px] text-lg"
            />
          ) : (
            <IoIosEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-[10px] text-lg"
            />
          )}
        </div>
        {/* confirm password */}
        <label className="block mt-4">confirm password</label>
        <div className="flex mt-2 w-[300px] relative">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirm ? "text" : "password"}
            className="border w-full border-black px-[7px] py-[5px] rounded-[8px] outline-none"
            placeholder="confirm password"
          />
          {showConfirm ? (
            <IoIosEyeOff
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-1 top-[10px] text-lg"
            />
          ) : (
            <IoIosEye
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-1 top-[10px] text-lg"
            />
          )}
        </div>
        <button className="w-full py-[7px] bg-black rounded-[8px] mt-5 text-white">
          Sign up
        </button>
        <Link to={"/login"}>
          <p className="font-normal text-4 mt-5">
            you have account? <span className="text-blue-600">login</span>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Register;
