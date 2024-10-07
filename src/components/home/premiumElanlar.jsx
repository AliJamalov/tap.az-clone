import React from "react";
import { useState, useEffect } from "react";
import Container from "../common/container";
import { getPremiumElanlar } from "../../api/products";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const PremiumElanlar = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const data = await getPremiumElanlar();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div className="mt-[30px] font-unusual">
        <h1 className="text-[40px] text-yellow-300">Premium Elanlar</h1>
        <div className="grid grid-cols-4 gap-4 mt-[30px]">
          {products?.slice(0, 4).map((item) => (
            <Link to={`/productDetails/${item.id}`}>
              <div
                key={item.id}
                className="bg-[#f6f7fa] w-[250px] h-[250px] relative p-4 rounded-[8px]"
              >
                <FaRegHeart className="absolute right-8 top-[30px] text-[26px]" />
                <img className="rounded-[8px]" src={item.image} />
                <p className="mt-[10px]">AZN {item.price}</p>
                <p className="mt-[10px] truncate">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center mt-[30px] mb-[60px]">
          <Link to={"/products/premium elanlar"}>
            <button className="bg-black text-white px-[60px] rounded-[8px] py-[10px]">
              Hamisini goster
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PremiumElanlar;
