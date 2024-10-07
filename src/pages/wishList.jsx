import React, { useEffect, useState } from "react";
import Container from "../components/common/container";
import { FaRegHeart } from "react-icons/fa";
import { getVipById } from "../api/products";
import { useStore } from "../../store/store";

const WishList = () => {
  const { customFav } = useStore(); // Получаем список ID избранных товаров
  const [favProducts, setFavProducts] = useState([]);

  // Функция для получения данных о продуктах из избранного
  const fetchFavoriteProducts = async () => {
    const products = await Promise.all(
      customFav.map(async (id) => {
        const productData = await getVipById(id);
        return productData;
      })
    );
    setFavProducts(products);
  };

  useEffect(() => {
    if (Array.isArray(customFav) && customFav.length > 0) {
      fetchFavoriteProducts(); // Загружаем данные о товарах при изменении избранного
    }
  }, [customFav]);
  return (
    <Container>
      <div className="mt-[30px] font-unusual">
        <h1 className="text-[30px] font-500">Wish-list</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-[20px] mt-[40px]">
          {favProducts.map((product) => (
            <div
              key={product.id}
              className="w-[200px] h-[300px] px-[20px] py-[20px] flex flex-col rounded-[8px] items-center bg-slate-300"
            >
              <div className="w-[150px] relative h-[150px] rounded-[8px]">
                <FaRegHeart className="absolute right-0 top-3 text-[22px]" />
                <img
                  className="rounded-[8px] w-full h-full object-cover"
                  src={product.image}
                />
              </div>
              <p className="mt-[10px] text-[16px] font-400">
                {product.price} AZN
              </p>
              <p className="mt-[10px] text-[16px] font-400">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WishList;
