import React from "react";
import Container from "../common/container";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useStore } from "../../../store/store";

const Header = () => {
  const { isLogin, setFields } = useStore();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("username");
    setFields({ isLogin: false });
  };
  return (
    <header className="font-unusual">
      {/* 1 header*/}
      <Container>
        <div className="flex my-[5px] justify-between">
          <div>
            <ul className="flex gap-[15px] text-[#8d94ad]">
              <li>Turbo.az</li>
              <li>Bina.az</li>
              <li>Boss.az</li>
            </ul>
          </div>
          <div className="flex gap-[20px]">
            <Link to={"/wishList"}>
              <div className="flex items-center gap-[10px]">
                <CiHeart className="text-[20px]" />
                <p>Wishlist</p>
              </div>
            </Link>
            <div className="flex items-center gap-[15px]">
              {isLogin ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to={"/register"}>Sign up</Link>
              )}
              <FaRegUserCircle />
            </div>
          </div>
        </div>
      </Container>
      <div className="bg-[#ff4f08] py-[15px]">
        <Container>
          <div className="flex items-center justify-between">
            <Link to={"/"}>
              <h1 className="text-white text-[26px]">Tap.az</h1>
            </Link>
            <div className="w-[400px]">
              <input
                className="px-[10px] outline-none w-full py-[5px] rounded-[8px]"
                type="text"
                placeholder="search..."
              />
            </div>
            <div className="flex gap-[20px] items-center">
              <Link to={"/kabinet"}>
                <p className="font-500 text-[16px]">kabinet</p>
              </Link>
              <Link to={"/newElan"}>
                <button className="bg-green-600 px-[10px] rounded-[8px] py-[5px] text-white">
                  Yeni Elan
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
