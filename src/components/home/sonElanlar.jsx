import React, { useEffect, useState } from "react";
import Container from "../common/container";
import { getSonElanlar } from "../../api/products";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const SonElanlar = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const data = await getSonElanlar();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div className="mt-[30px] font-unusual">
        <h1 className="text-[40px]">Son Elanlar</h1>
        <div className="grid grid-cols-4 gap-4 mt-[30px]">
          {products.slice(0, 4).map((item) => (
            <Link to={`/productDetails/${item.id}`}>
              <div
                key={item.id}
                className="bg-[#f6f7fa] w-[250px] h-[250px] p-4 relative rounded-[8px]"
              >
                <FaRegHeart className="absolute right-8 top-[30px] text-[26px]" />
                <img
                  className="rounded-[8px]"
                  src={item.image}
                  alt={item.name}
                />
                <p className="mt-[10px]">AZN {item.price}</p>
                <p className="mt-[10px] truncate">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center mt-[30px]">
          <Link to={"/products/son elanlar"}>
            <button className="bg-black text-white px-[60px] rounded-[8px] py-[10px]">
              Hamisini goster
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SonElanlar;
