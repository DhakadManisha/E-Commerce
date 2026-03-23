import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

function OrderHistory(){

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8080/api/orders/user/1")
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return(
    <div>
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map(order => (
          <div key={order.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px"
            }}>

            <h3>Order ID: {order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: {order.totalAmount}</p>

            <h4>Items:</h4>

            {order.items.map(item => (
              <div key={item.id}>
                <p>{item.product.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            ))}

          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;