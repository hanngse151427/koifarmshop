/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Card, Col, Button, Modal } from 'antd';

const CardProduct = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Logic để thêm sản phẩm vào danh sách so sánh
    console.log("Added to comparison:", product);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Col className='mt-3 mb-2' key={product?.id}>
        <Card className='img'
          hoverable
          cover={<img alt={product?.name} src={product?.image} />}
        >
          <Card.Meta title={product?.name} />

          <Card.Meta
            description={
              <span>
                <strong>Giá tiền </strong>
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
                <span style={{ fontWeight: 'bold', color: '#FF5733' }}>{product?.sex}</span>
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
                <Button type="primary">Mua ngay</Button>
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