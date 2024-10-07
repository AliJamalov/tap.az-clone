import React, { useEffect, useState } from "react";
import Container from "../components/common/container";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getProducts,
  getVipElanlar,
  getSonElanlar,
  getPremiumElanlar,
} from "../api/products";

const Products = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [vipElanlar, setVipElanlar] = useState([]);
  const [sonElanlar, setSonElanlar] = useState([]);
  const [premiumElanlar, setPremiumElanlar] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      const vipData = await getVipElanlar();
      const sonData = await getSonElanlar();
      const premiumData = await getPremiumElanlar();
      setProducts(data);
      setVipElanlar(vipData);
      setSonElanlar(sonData);
      setPremiumElanlar(premiumData);
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = [
      ...products.filter((product) => product.category === categoryName),
      ...vipElanlar.filter((product) => product.category === categoryName),
      ...sonElanlar.filter((product) => product.category === categoryName),
      ...premiumElanlar.filter((product) => product.category === categoryName),
    ];

    setFilteredProducts(filtered);
  }, [categoryName, products, vipElanlar, sonElanlar, premiumElanlar]);

  return (
    <Container>
      <div className="mt-[30px] font-unusual">
        <h1 className="text-[40px] font-semibold">Elanlar: {categoryName}</h1>
        <div className="grid grid-cols-4 gap-4 mt-[30px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Link
                to={`/productDetails/${item.id}`}
                key={item.id}
                className="bg-[#f6f7fa] w-[250px] h-[250px] p-4 rounded-[8px]"
              >
                <img
                  className="rounded-[8px]"
                  src={item.image}
                  alt={item.name}
                />
                <p className="mt-[10px] font-medium">AZN {item.price}</p>
                <p className="mt-[10px] truncate">{item.description}</p>
              </Link>
            ))
          ) : (
            <p>Нет продуктов в этой категории.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Products;
