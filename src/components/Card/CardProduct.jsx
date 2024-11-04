/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Col, Button, Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const CardProduct = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log("Added to comparison:", product);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm để thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    // Lấy giỏ hàng hiện tại từ localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
    const existingItem = existingCart.find(item => item.fishId === product.fishId);
    
    if (existingItem) {
      // Nếu đã có, tăng số lượng
      existingItem.quantity += 1;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      existingCart.push({
        ...product,
        quantity: 1 // Khởi tạo số lượng là 1
      });
    }

    // Lưu lại giỏ hàng mới vào localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    console.log('Product added to cart:', product);
  };

  // Hàm gửi yêu cầu mua hàng tới API
  const handlePurchase = async () => {
    const fishId = product.fishId;
    const quantity = 1;

    try {
      const response = await axios.post('https://localhost:7049/api/Cart/AddToCart', {
        fishId: fishId,
        quantity: quantity,
      });

      if (response) {
        toast.success("Product added to cart successfully");
        addToCart(response.data.data); // Gọi hàm thêm sản phẩm vào giỏ hàng
      } else {
        console.log('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <>
      <Col className='mt-3 mb-2' key={product?.id}>
        <Card
          className='img'
          hoverable
          cover={<img alt={product?.breed} src={product?.image} />}
        >
          <Card.Meta title={product?.origin} />
          <Card.Meta
            description={
              <span>
                <strong>Giá tiền: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.price}</span>
              </span>
            }
          />
          <Card.Meta
            description={
              <span>
                <strong>Trang trại: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.breeder}</span>
              </span>
            }
          />
          <Card.Meta
            description={
              <span>
                <strong>Giới tính: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.gender}</span>
              </span>
            }
          />
          <Card.Meta
            description={
              <div style={{ marginTop: "10px", display: 'flex', gap: 20 }}>
                <Button type="default" onClick={showModal}>So sánh</Button>
                <Button onClick={handlePurchase} type="primary">Mua ngay</Button>
              </div>
            }
          />
        </Card>

        <Modal
          title="Xác nhận thêm sản phẩm"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              alt={product.name}
              src={product.image}
              style={{
                width: '100px',
                height: '100px',
                marginRight: '16px',
                borderRadius: '4px',
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
              }}
            />
            <div style={{ flexGrow: 1 }}>
              <p style={{ margin: '0 0 8px', fontSize: '15px' }}>
                <strong>{product.name}</strong> vào danh sách so sánh?
              </p>
              <p style={{ margin: '0', fontWeight: 'bold', fontSize: '16px' }}>
                <strong>Giá:</strong> {product.price}
              </p>
            </div>
          </div>
        </Modal>
      </Col>
    </>
  );
}

export default CardProduct;