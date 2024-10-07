import React, { useEffect, useState } from "react";
import Container from "../components/common/container";
import { useParams } from "react-router-dom";
import { getVipById } from "../api/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [vipProduct, setVipProduct] = useState([]);

  const fetchById = async () => {
    const vipData = await getVipById(id);
    setVipProduct(vipData);
  };

  useEffect(() => {
    fetchById();
  }, [id]);
  return (
    <Container>
      <div className="flex gap-[50px] font-unusual">
        <div className="mt-[30px] mb-[50px]">
          <h1 className="text-[30px] mb-[15px] font-medium">
            {vipProduct.category}
          </h1>
          <div className="w-[500px] h-[500px] justify-center flex bg-gray-300 rounded-[8px]">
            <img
              className="w-full object-cover rounded-[8px]"
              src={vipProduct.image}
            />
          </div>
        </div>
        <div className="mt-[80px] mb-[50px]">
          <p className="text-[30px] font-medium">{vipProduct.price} AZN</p>
          <p className="text-[30px] mt-[20px] font-medium">
            {vipProduct.description}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
