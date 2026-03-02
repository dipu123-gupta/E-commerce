import React, { useEffect } from "react";
import "../pageStyles/Products.css";
import PageTitle from "../component/PageTitle.jsx";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice.js";
import Product from "../component/Product.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Loder from "../component/Loder.jsx";
import { toast } from "react-toastify";
import { removeError } from "../features/products/productSlice.js";
import NoProducts from "../component/NoProducts.jsx";
import Pagination from "../component/Pagination.jsx";

const Products = () => {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const kategory = searchParams.get("category");
  const pageFromUrl = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = React.useState(pageFromUrl);
  const navigate = useNavigate();
  const categories = [
    "electronics",
    "clothing",
    "Accessories",
    "Shoes",
    "mobiles",
    "chairs",
    "tablets",
    "laptops",
  ];
  useEffect(() => {
    dispatch(getProducts({ keyword, page: currentPage, category: kategory }));
  }, [dispatch, keyword, currentPage, kategory]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);

      const newSearchParams = new URLSearchParams(location.search);

      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }

      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategoryClick = (category) => {
    const newSearchParams = new URLSearchParams(location.search);

    newSearchParams.set("category", category);
    newSearchParams.delete("page");

    navigate(`?${newSearchParams.toString()}`);
  };
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <>
          {" "}
          <PageTitle title="All Products" />
          <Navbar />
          <div className="products-layout">
            <div className="filter-section">
              <h3>CATEGORIES</h3>
              {/* render categories */}
              <ul>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={kategory === category ? "active-category" : ""}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="products-section">
              {products?.length > 0 ? (
                <div className="products-product-container">
                  {/* render products */}
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProducts keyword={keyword} />
              )}
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          <Footer />{" "}
        </>
      )}
    </>
  );
};

export default Products;
