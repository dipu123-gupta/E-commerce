import React from "react";
import Footer from "../component/Footer.jsx";
import "../pageStyles/Home.css";
import Navbar from "../component/Navbar.jsx";
import ImageSlider from "../component/imageSlider.jsx";
import Product from "../component/Product.jsx";
import PageTitle from "../component/PageTitle.jsx";

const Home = () => {
  const Products = [
    {
      _id: "699ef17264863857e006625b",
      name: "iPhone 15 Pro",
      description:
        "Latest Apple iPhone with A17 chip and advanced camera system.",
      price: 129999,
      ratings: 2.5,
      images: [
        {
          public_id: "iphone15_1",
          url: "https://example.com/iphone15.jpg",
          _id: "699ef17264863857e006625c",
        },
      ],
      category: "Electronics",
      stock: 15,
      numOfReviews: 2,
      reviews: [
        {
          user: "699ef17264863857e006625d",
          name: "John Doe",
          rating: 4,
          comment: "Great product!",
          _id: "699ef17264863857e006625e",
        },
        {
          user: "699ef17264863857e006625f",
          name: "Jane Smith",
          rating: 3,
          comment: "Average product.",
          _id: "699ef17264863857e0066260",
        },
      ],
      createdAt: "2026-02-25T12:56:18.032Z",
      __v: 0,
    },
    {
      _id: "699ef18d64863857e006625e",
      name: "Dell Inspiron 15",
      description: "Powerful laptop with Intel i7 processor and 16GB RAM.",
      price: 75999,
      ratings: 4.5,
      images: [
        {
          public_id: "dell_1",
          url: "https://example.com/dell.jpg",
          _id: "699ef18d64863857e006625f",
        },
      ],
      category: "Electronics",
      stock: 10,
      numOfReviews: 3,
      reviews: [],
      createdAt: "2026-02-25T12:56:45.859Z",
      __v: 0,
    },
    {
      _id: "699ef1a164863857e0066261",
      name: "Men Cotton T-Shirt",
      description: "Comfortable 100% cotton t-shirt for daily wear.",
      price: 799,
      ratings: 3.8,
      images: [
        {
          public_id: "tshirt_1",
          url: "https://example.com/tshirt.jpg",
          _id: "699ef1a164863857e0066262",
        },
      ],
      category: "Clothing",
      stock: 50,
      numOfReviews: 5,
      reviews: [],
      createdAt: "2026-02-25T12:57:05.766Z",
      __v: 0,
    },
    {
      _id: "699ef17264863857e006625b",
      name: "iPhone 15 Pro",
      description:
        "Latest Apple iPhone with A17 chip and advanced camera system.",
      price: 129999,
      ratings: 2.5,
      images: [
        {
          public_id: "iphone15_1",
          url: "https://example.com/iphone15.jpg",
          _id: "699ef17264863857e006625c",
        },
      ],
      category: "Electronics",
      stock: 15,
      numOfReviews: 2,
      reviews: [],
      createdAt: "2026-02-25T12:56:18.032Z",
      __v: 0,
    },
    {
      _id: "699ef18d64863857e006625e",
      name: "Dell Inspiron 15",
      description: "Powerful laptop with Intel i7 processor and 16GB RAM.",
      price: 75999,
      ratings: 4.5,
      images: [
        {
          public_id: "dell_1",
          url: "https://example.com/dell.jpg",
          _id: "699ef18d64863857e006625f",
        },
      ],
      category: "Electronics",
      stock: 10,
      numOfReviews: 1,
      reviews: [],
      createdAt: "2026-02-25T12:56:45.859Z",
      __v: 0,
    },
    {
      _id: "699ef1a164863857e0066261",
      name: "Men Cotton T-Shirt",
      description: "Comfortable 100% cotton t-shirt for daily wear.",
      price: 799,
      ratings: 3.8,
      images: [
        {
          public_id: "tshirt_1",
          url: "https://example.com/tshirt.jpg",
          _id: "699ef1a164863857e0066262",
        },
      ],
      category: "Clothing",
      stock: 50,
      numOfReviews: 0,
      reviews: [],
      createdAt: "2026-02-25T12:57:05.766Z",
      __v: 0,
    },
  ];

  return (
    <>
      <PageTitle title="Home-My-Wevsite" />
      <Navbar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading"> Welcome to our E-commerce Store</h2>
        <div className="home-product-container">
          {Products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
