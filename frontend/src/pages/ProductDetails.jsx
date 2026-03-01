// Import page specific CSS
import "../pageStyles/ProductDetails.css";

// Import reusable UI components
import PageTitle from "../component/PageTitle"; // Updates browser tab title
import Navbar from "../component/Navbar"; // Website top navigation
import Footer from "../component/Footer"; // Website footer
import Rating from "../component/Rating"; // Star rating component

// Import React hooks
import { useState, useEffect } from "react";

// Import Redux hooks
import { useSelector, useDispatch } from "react-redux";

// Import hook to access URL parameters
import { useParams } from "react-router-dom";

// Import Redux async actions
import {
  getProductDetails, // Fetch single product details from API
  removeError, // Clear error from Redux store
} from "../features/products/productSlice.js";

// Import toast notification library
import { toast } from "react-toastify";

// Import loading spinner component
import Loader from "../component/Loder.jsx";

const ProductDetails = () => {
  // ----------------------------------------------------
  // State to store rating selected by the user
  // ----------------------------------------------------
  const [userRating, setUserRating] = useState(0);

  // Function triggered when user selects star rating
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  // ----------------------------------------------------
  // Access Redux store state
  // ----------------------------------------------------
  const { product, loading, error } = useSelector((state) => state.product);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Extract product ID from URL
  const { id } = useParams();

  // ----------------------------------------------------
  // Fetch product details when component loads
  // ----------------------------------------------------
  useEffect(() => {
    // If product ID exists call API
    if (id) {
      dispatch(getProductDetails(id));
    }

    // Cleanup function when component unmounts
    return () => {
      dispatch(removeError());
    };
  }, [dispatch, id]);

  // ----------------------------------------------------
  // Show error notification if API fails
  // ----------------------------------------------------
  useEffect(() => {
    if (error) {
      // Display error message using toast
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });

      // Clear error from Redux
      dispatch(removeError());
    }
  }, [dispatch, error]);

  // ----------------------------------------------------
  // Show loader while API request is in progress
  // ----------------------------------------------------
  if (loading) {
    return (
      <>
        <PageTitle title="Product-Details-My-Wevsite" />
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  // ----------------------------------------------------
  // If error or product not available show fallback UI
  // ----------------------------------------------------
  if (error || !product) {
    return (
      <>
        <PageTitle title="Product-Details-My-Wevsite" />
        <Navbar />
        <Footer />
      </>
    );
  }

  // ----------------------------------------------------
  // Main Product Details Page UI
  // ----------------------------------------------------
  return (
    <>
      {/* Dynamic page title */}
      <PageTitle title={`${product.name}-Details-My-Wevsite`} />

      {/* Website navigation */}
      <Navbar />

      {/* Product details container */}
      <div className="product-details-container">
        <div className="product-detail-container">
          {/* Product Image */}
          <div className="product-image-container">
            <img
              src={product?.images?.[0]?.url?.replace("./", "/")}
              alt={product?.name}
              className="product-detail-image"
            />
          </div>

          {/* Product Information Section */}
          <div className="product-info">
            {/* Product name */}
            <h2>{product.name}</h2>

            {/* Product description */}
            <p className="product-description">{product.description}</p>

            {/* Product price */}
            <p className="product-price">Price: {product.price}</p>

            {/* Product rating display */}
            <div className="product-rating">
              {/* Average rating */}
              <Rating value={product.rating} disabled={true} />

              {/* Total reviews */}
              <span className="productCardSpan">({product.numOfReviews})</span>
            </div>

            {/* Stock availability */}
            <div className="stock-status">
              <span
                className={`${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
              >
                {product.stock > 1
                  ? ` In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity selector only visible if product in stock */}
            {product.stock > 0 && (
              <>
                <div className="quantity-controls">
                  <span className="quantity-label">Quantity: </span>

                  {/* Decrease quantity */}
                  <button className="quantity-button">-</button>

                  {/* Quantity display */}
                  <input
                    type="text"
                    className="quantity-value"
                    value={1}
                    readOnly
                  />

                  {/* Increase quantity */}
                  <button className="quantity-button">+</button>
                </div>

                {/* Add to cart button */}
                <button className="add-to-cart-btn">Add to Cart</button>
              </>
            )}

            {/* -----------------------------------
                Product Review Form
            ----------------------------------- */}
            <form className="review-form">
              <h3>Write a Review</h3>

              {/* User interactive rating component */}
              <Rating
                value={userRating}
                disabled={false}
                onRatingChange={handleRatingChange}
              />

              {/* Review comment textarea */}
              <textarea
                className="review-input"
                placeholder="Write your review here..."
              ></textarea>

              {/* Submit review button */}
              <button className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        </div>
      </div>

      {/* -----------------------------------
          Customer Reviews Section
      ----------------------------------- */}
      <div className="reviews-container">
        <h3>Customer Reviews</h3>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-section">
            {product.reviews.map((review, index) => (
              <div className="review-item" key={index}>
                {/* Review rating */}
                <div className="review-header">
                  <Rating value={review.rating} disabled={true} />
                </div>

                {/* Review comment */}
                <p className="review-comment">{review.comment}</p>

                {/* Reviewer name */}
                <p className="reviewer-name">By: {review.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductDetails;
