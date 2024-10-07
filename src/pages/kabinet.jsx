import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/common/container";
import EditModal from "../components/kabinet/editModal";

const Kabinet = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Для выбранного продукта
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Ошибка при получении объявлений:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (username) {
      const userProducts = products.filter(
        (product) => product.username === username
      );
      setFilteredProducts(userProducts);
    }
  }, [products, username]);

  // Открытие модального окна
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Обновление продукта в списке
  const handleSaveProduct = (updatedProduct) => {
    setFilteredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <Container>
      <h1 className="text-2xl mt-[20px] font-bold">Menim elanlarim</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border flex flex-col items-center p-4 rounded shadow-md"
            >
              <div>
                <h2 className="text-xl font-semibold">{product.category}</h2>
                <p className="text-sm">{product.price} AZN</p>
              </div>
              <img
                src={product.image}
                alt={product.category}
                className="w-32 rounded-[8px] mt-[8px] h-32 object-cover"
              />
              <p
                className="text-[16px] mt-[10px] font-normal text-green-500 cursor-pointer"
                onClick={() => openEditModal(product)} // Открытие модального окна при нажатии
              >
                edit
              </p>
            </div>
          ))
        ) : (
          <p>elaniniz yoxdu.</p>
        )}
      </div>

      {/* Рендер модального окна */}
      {isModalOpen && (
        <EditModal
          product={selectedProduct}
          onClose={closeEditModal} // Функция закрытия модального окна
          onSave={handleSaveProduct} // Функция сохранения изменений
        />
      )}
    </Container>
  );
};

export default Kabinet;
