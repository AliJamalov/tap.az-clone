import React, { useState } from "react";
import Container from "../components/common/container";
import axios from "axios";

const NewElan = () => {
  const [formData, setFormData] = useState({
    category: "",
    price: "",
    image: "",
    description: "",
    username: "",
  });

  const createElan = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("username");
    if (user) {
      try {
        const response = await axios.post("http://localhost:3000/products", {
          ...formData,
          price: parseFloat(formData.price), // преобразуем цену в число
          image: formData.image,
          category: formData.category,
          category: formData.category,
          username: localStorage.getItem("username"),
        });
        alert("elan created sucssesfuly");
        setFormData({
          category: "",
          price: "",
          image: "",
          description: "",
          username: "",
        });
      } catch (error) {
        console.error("Ошибка при создании объявления:", error);
      }
    } else {
      alert("you have to login");
    }
  };

  return (
    <Container>
      <div className="mt-[10px] flex justify-center font-unusual">
        <form className="mt-[10px] mb-[50px]" onSubmit={createElan}>
          <h1 className="font-500 text-[40px]">Yeni elan</h1>
          <div className="w-[500px] items-center gap-[40px] mt-[20px] mb-[20px] flex">
            <label className="font-500 text-[26px]">username:</label>
            <input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              name="username"
              className="rounded-[8px] border border-black px-[5px] py-[5px] w-full outline-none"
              type="text"
              placeholder="username..."
            />
          </div>
          <div className="w-[500px] items-center gap-[40px] flex">
            <label className="font-500 text-[26px]">Category:</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              name="category"
              className="rounded-[8px] border border-black px-[5px] py-[5px] w-full outline-none"
            >
              <option value="" disabled>
                Select a category...
              </option>
              <option value="electronics">Electronics</option>
              <option value="animals">Animals</option>
              <option value="apartments">Apartments</option>
              <option value="jobs">Jobs</option>
            </select>
          </div>
          <div className="w-[500px] mt-[30px] items-center gap-[40px] flex">
            <label className="font-500 text-[26px]">description:</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              name="description"
              className="rounded-[8px] border h-[100px] border-black px-[5px] py-[5px] w-full outline-none"
              placeholder="description..."
            />
          </div>
          <div className="w-[500px] mt-[30px] items-center gap-[40px] flex">
            <label className="font-500 text-[26px]">image:</label>
            <input
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              name="image"
              className="rounded-[8px] border border-black px-[5px] py-[5px] w-full outline-none"
              type="text"
              placeholder="image..."
            />
          </div>
          <div className="flex mt-[20px] w-[400px]">
            <button
              type="submit"
              className="py-[7px] rounded-[8px] bg-black text-white w-full"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default NewElan;
