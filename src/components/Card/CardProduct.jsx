/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Card, Col, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardProduct = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const navigate = useNavigate();

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

  // Hàm gửi yêu cầu mua hàng tới API  
  const handlePurchase = async () => {  
    const fishId = product.fishId; // Giả sử bạn có trường fishId trong product  
    const quantity = 1; // Điều chỉnh số lượng ở đây nếu cần  

    try {  
      const response = await axios.post('https://localhost:7049/api/Cart/AddToCart', {  
        fishId: fishId,  
        quantity: quantity,  
      }, {withCredentials: true}); 

      console.log('Ket qua tra ve ', response.data); 

      if  (response.data.isSuccess){
        console.log(response.data.message);
        navigate('/cart') 
      }
      else {
        // Handle unsuccessful response
        console.error("Error adding to cart:", response.data.message || "No additional information available");
      }

      // Hiển thị thông báo thành công  
     
    } catch (error) {  
      console.error('Unexpected error:', error);  
     
    }  
  };  
  return (
    <>
      <Col className='mt-3 mb-2' key={product?.id}>
        <Card className='img'
          hoverable
          cover={<img alt={product?.breed} src={product?.image} />}
        >
          <Card.Meta title={product?.origin} />

          <Card.Meta
            description={
              <span>
                <strong>Price </strong>
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
                <strong>Gender: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.gender}</span>
              </span>
            }
          />
          <Card.Meta
            description={
              <span>
                <strong>Năm sinh: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.born}</span>
              </span>
            }
          />
          <Card.Meta
            description={
              <span>
                <strong>Size: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.size}</span>
              </span>
            }
          />
          <Card.Meta
            description={
              <span>
                <strong>Giống: </strong>
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.species}</span>
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

  )
}

export default CardProduct