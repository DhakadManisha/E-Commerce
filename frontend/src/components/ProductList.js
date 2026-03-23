import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

function ProductList(){

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/products")
      .then(response=>{
        setProducts(response.data);
      })
      .catch(error=>{
        console.error(error);
      });
  },[]);

  const addToCart = (productId) => {

    axios.post(`http://localhost:8080/api/cart/add?userId=1&productId=${productId}&quantity=1`)
    .then(res=>{
      alert("Added to cart");
    })
    .catch(err=>{
      console.log(err);
    });

  };

  return(
    <div className="container mt-4">
      <div className="row">

        {products.map(product =>(

          <div className="col-md-3 mb-4" key={product.id}>

            <div className="card shadow-sm p-3 h-100">

              <h5>{product.name}</h5>
              <p>₹ {product.price}</p>
              <p>{product.description}</p>

              <button
                className="btn btn-primary mt-auto"
                onClick={()=>addToCart(product.id)}
              >
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default ProductList;
