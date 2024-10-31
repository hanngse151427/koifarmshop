import React, { useState } from 'react';

const AddToCartButton = ({ fishId, quantity }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    const requestData = {
      FishId: fishId,
      Quantity: quantity,
    };

    try {
      const response = await fetch('/api/AddToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding to cart');
      }

      const result = await response.json();
      console.log('Success:', result); // Xem kết quả thêm vào giỏ hàng

      // Cập nhật trạng thái giỏ hàng nếu cần
      // Ví dụ: setCart(prevCart => [...prevCart, result.Data]);

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={loading}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
