import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Gọi API GET để lấy dữ liệu giỏ hàng
        const response = await axios.get('http://localhost:7049/api/Cart/GetCart');
        
        if (response.status === 200) {
          setCartItems(response.data); // Lưu dữ liệu giỏ hàng vào state
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
      }
    };

    fetchCart();
  }, []);

  if (!cartItems) {
    return <p>Loading...</p>; // Hiển thị loading khi đang lấy dữ liệu
  }

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {cartItems.values.map((item) => (
        <div key={item.sid}>
          <p>ID sản phẩm: {item.fishId}</p>
          <p>Số lượng: {item.quantity}</p>
          <p>Giá: {item.price}</p>
          <img src={item.imageUrl} alt="Sản phẩm" width="100" />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Cart;