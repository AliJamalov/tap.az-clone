import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/layouts/header";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetails";
import Login from "./pages/login";
import Register from "./pages/register";
import NewElan from "./pages/newElan";
import Kabinet from "./pages/kabinet";
import WishList from "./pages/wishList";

function App() {
  const location = useLocation();

  const hideHeaderFooter = ["/login", "/register"];

  return (
    <>
      {!hideHeaderFooter.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryName" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newElan" element={<NewElan />} />
        <Route path="/kabinet" element={<Kabinet />} />
        <Route path="/WishList" element={<WishList />} />
      </Routes>
    </>
  );
}

export default App;
