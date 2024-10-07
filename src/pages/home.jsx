import React from "react";
import Category from "../components/home/category";
import VipElanlar from "../components/home/vipElanlar";
import SonElanlar from "../components/home/sonElanlar";
import PremiumElanlar from "../components/home/premiumElanlar";

const Home = () => {
  return (
    <div>
      <Category />
      <VipElanlar />
      <SonElanlar />
      <PremiumElanlar />
    </div>
  );
};

export default Home;
