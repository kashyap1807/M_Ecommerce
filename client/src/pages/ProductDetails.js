import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const [cart, setCart] = useCart([]);
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add this within the ProductDetails component
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the rating to your backend API
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/add-review`,
        {
          productId: product._id,
          rating: rating,
          // Include any additional data you need for the review
        }
      );
      // Handle success message or any other logic
      console.log(response.data);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/add-comment`,
        {
          productId: product._id,
          comment: comment,
          // Include any additional data you need for the comment
        }
      );
      console.log(response.data);
      // Refresh comments after adding a new comment
      getComments();
      setComment(""); // Clear the comment input
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-comments/${product._id}`
      );
      setCommentsList(data?.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch comments when the component mounts
  useEffect(() => {
    if (params?.slug) {
      getProduct();
      getComments();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <hr />
      <div className="row container m-3 p-3">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500"
            width={"300px"}
          />
        </div>
        <div className="col-md-6  product-details-info flex-wrap">
          {/* Add review section here */}
          {/* <div className="row container m-3 p-3"> */}
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleRatingChange(value)}
                style={{
                  cursor: "pointer",
                  color: value <= rating ? "gold" : "gray",
                  fontSize: 30,
                }}
              >
                ★
              </span>
            ))}
          </div>
          {/* </div> */}
          <h1 className="text-center">Product Details</h1>
          <br />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <br />

          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr />
      <div className="row container similar-products m-3 p-3">
        <h4>Similar Products : </h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* comment section */}
      <div className="row container m-3 p-3">
        

        <h4>Leave a Comment :</h4>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your comment here..."
        ></textarea>
        <button type="button" className="btn btn-success" onClick={addComment}>
          Add Comment
        </button>
        
        {/* Display comments */}
        {commentsList.length > 0 ? (
          <div>
            <h4>Comments</h4>
            {commentsList.map((comment) => (
              <div key={comment._id}>
                <p>{comment.text}</p>
                <p>{comment.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
