import React, { use } from "react";
import Footer from "../component/Footer.jsx";
import "../pageStyles/Home.css";
import Navbar from "../component/Navbar.jsx";
import ImageSlider from "../component/imageSlider.jsx";
import Product from "../component/Product.jsx";
import PageTitle from "../component/PageTitle.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, removeError } from "../features/products/productSlice.js";
import { useEffect } from "react";
import Loder from "../component/Loder.jsx";
import { toast } from "react-toastify";

const Home = () => {
  // useSelector((state) => state);
  const { products, loading, error, productCount } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          <PageTitle title="Home-My-Wevsite" />
          <Navbar />
          <ImageSlider />
          <div className="home-container">
            <h2 className="home-heading"> Welcome to our E-commerce Store</h2>
            <div className="home-product-container">
              {products?.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
