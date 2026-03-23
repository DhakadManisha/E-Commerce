import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

function Cart(){

  const [cart, setCart] = useState(null);

  useEffect(()=>{
    fetchCart();
  },[]);

  const fetchCart = () => {
    axios.get("http://localhost:8080/api/cart/1")
      .then(res => {
        setCart(res.data);
      })
      .catch(err => console.log(err));
  };

  const updateQuantity = (productId, quantity) => {

    if(quantity < 1) return;

    axios.post(`http://localhost:8080/api/cart/add?userId=1&productId=${productId}&quantity=${quantity}`)
      .then(res=>{
        fetchCart();
      })
      .catch(err=>console.log(err));
  };

  const removeItem = (productId) => {
    axios.delete(`http://localhost:8080/api/cart/remove?userId=1&productId=${productId}`)
      .then(()=>{
        fetchCart();
      })
      .catch(err=>console.log(err));
  };

  if(!cart) return <h3 className="text-center mt-5">Loading Cart...</h3>;

  return(
    <div className="container mt-4">

      <h2 className="mb-3">🛒 Your Cart</h2>

      <table className="table table-bordered text-center">

        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {cart.items.map(item =>(

            <tr key={item.product.id}>

              <td>{item.product.name}</td>
              <td>{item.product.price}</td>

              <td>
                <button className="btn btn-sm btn-danger me-2"
                  onClick={()=>updateQuantity(item.product.id, item.quantity - 1)}>
                  -
                </button>

                {item.quantity}

                <button className="btn btn-sm btn-success ms-2"
                  onClick={()=>updateQuantity(item.product.id, item.quantity + 1)}>
                  +
                </button>
              </td>

              <td>{item.quantity * item.product.price}</td>

              <td>
                <button className="btn btn-warning"
                  onClick={()=>removeItem(item.product.id)}>
                  Remove
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Cart;