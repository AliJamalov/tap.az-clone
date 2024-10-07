import React from "react";
import Container from "../common/container";
import { getVipElanlar } from "../../api/products";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStore } from "../../../store/store";

const VipElanlar = () => {
  const { customFav, setFields } = useStore();
  const [products, setProducts] = useState([]);
  const [wishedProducts, setWishedProducts] = useState({}); // Хранит состояние избранного для каждого продукта

  const fetchData = async () => {
    const data = await getVipElanlar();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToFav = (id) => {
    const isWished = wishedProducts[id]; // Проверяем, есть ли продукт в wishedProducts

    if (isWished) {
      const newFav = customFav.filter((elem) => elem !== id);
      setWishedProducts((prev) => ({ ...prev, [id]: false })); // Обновляем состояние wishedProducts
      setFields({ customFav: newFav });
    } else {
      setFields({ customFav: [...customFav, id] });
      setWishedProducts((prev) => ({ ...prev, [id]: true })); // Обновляем состояние wishedProducts
    }
  };

  return (
    <Container>
      <div className="mt-[30px] font-unusual">
        <h1 className="text-[40px] text-green-600">Vip Elanlar</h1>
        <div className="grid grid-cols-4 gap-4 mt-[30px]">
          {products?.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-[#f6f7fa] w-[250px] h-[250px] p-4 relative rounded-[8px]"
            >
              {wishedProducts[item.id] ? ( // Используем wishedProducts для определения состояния
                <FaHeart
                  onClick={() => handleAddToFav(item.id)}
                  className="cursor-pointer absolute right-8 top-[30px] text-[26px]"
                />
              ) : (
                <FaRegHeart
                  onClick={() => handleAddToFav(item.id)}
                  className="cursor-pointer absolute right-8 top-[30px] text-[26px]"
                />
              )}
              <Link to={`/productDetails/${item.id}`}>
                <img className="rounded-[8px]" src={item.image} />
              </Link>
              <p className="mt-[10px]">AZN {item.price}</p>
              <p className="mt-[10px] truncate">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-[30px]">
          <Link to={"/products/vip elanlar"}>
            <button className="bg-black text-white px-[60px] rounded-[8px] py-[10px]">
              Hamisini goster
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default VipElanlar;
