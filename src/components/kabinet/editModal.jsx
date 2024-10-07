import React, { useState } from "react";
import axios from "axios";

const EditModal = ({ product, onClose, onSave }) => {
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  // Функция для сохранения изменений
  const handleSave = async () => {
    try {
      // Отправка обновленных данных на сервер
      await axios.patch(`http://localhost:3000/products/${product.id}`, {
        category,
        price,
        image,
      });

      // Вызов функции onSave для обновления данных на странице
      onSave({
        ...product,
        category,
        price,
        image,
      });

      // Закрытие модального окна после сохранения
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении изменений:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">edit product</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">category:</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Обновляем значение категории
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">price:</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Обновляем значение цены
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">image (URL):</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)} // Обновляем значение изображения
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={onClose} // Закрытие модального окна
          >
            close
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSave} // Сохранение изменений
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
