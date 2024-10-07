import React from "react";
import Container from "../common/container";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <Container>
      <div className="px-[25px] bg-[#f1f3f7] py-[20px] font-unusual">
        <div className="flex justify-around pb-[20px]">
          <Link to={"/products/animals"}>
            <div className="w-[150px] h-[150px] flex flex-col items-center bg-white rounded-[8px]">
              <img className="w-full" src="/animals.png" />
              <p className="mt-[7px]">animals</p>
            </div>
          </Link>
          <Link to={"/products/electronics"}>
            <div className="w-[150px] h-[150px] flex flex-col items-center bg-white rounded-[8px]">
              <img className="w-full" src="/electronika.png" />
              <p className="mt-[7px]">electronics</p>
            </div>
          </Link>
          <div className="w-[150px] h-[150px] flex flex-col items-center bg-white rounded-[8px]">
            <img className="w-full" src="/house.png" />
            <p className="mt-[7px]">apartments</p>
          </div>
          <div className="w-[150px] flex flex-col items-center h-[150px] bg-white rounded-[8px]">
            <img className="w-full" src="/work.png" />
            <p className="mt-[7px]">jobs</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Category;
