// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Layout, Table, InputNumber, Button, Typography, Row, Col, Card, Form, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CardProduct from '../../components/Card/CardProduct'
import axios from 'axios';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [form] = Form.useForm();

  const fetchCartItems = async () => {
    console.log('Fetching cart items...'); // Log when fetching starts
    try {
      const response = await axios.get('https://localhost:7049/api/Cart/GetCart'); // Call the GetCart API
      console.log('Response from GetCart:', response.data); 

      const items = response.data.cartItems?.$values || []; // Use optional chaining and fallback to an empty array

      if (Array.isArray(items) && items.length > 0) {
        const itemsWithKeys = items.map((item, index) => ({
          ...item,
          key: item.fishId || index, // Add key to each item
        }));
        console.log('Items with keys:', itemsWithKeys);
        setCartItems(itemsWithKeys); // Assuming the API returns an object with 'items' as the cart items array
      }
      else {
        console.warn('Items not found or not an array:', items)
        setCartItems([]); // Set to empty if no items are found
      }
    } catch (error) {
      console.error('Error fetching cart items:', error); // Handle any errors
    }
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when component mounts
  }, []);

  const calculateTotal = (items) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price || 0)* (item.quantity || 0), 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (value, key) => {
    const newCartItems = cartItems.map(item => 
      item.key === key ? { ...item, quantity: value } : item
    );
    setCartItems(newCartItems);
  };

  const handleDelete = (key) => {
    const newCartItems = cartItems.filter(item => item.key !== key);
    setCartItems(newCartItems);
  };

  const onFinish = (values) => {
    console.log('Thông tin đặt hàng:', { ...values, cartItems, totalAmount });
    // Xử lý đặt hàng ở đây
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={imageUrl} alt={record.fishId} style={{ width: 50, marginRight: 10 }} />
          <span>{record.fishId}</span> {/* Display fishId or a more descriptive name */}
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: price => `${price.toLocaleString()}đ`,
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber 
          min={1} 
          value={record.quantity} 
          onChange={(value) => handleQuantityChange(value, record.key)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record) => `${(record.price * record.quantity).toLocaleString()}đ`,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<DeleteOutlined />} 
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Title level={2}>Giỏ hàng</Title>
        <Row gutter={24}>
          <Col span={16}>
            <Table 
              columns={columns} 
              dataSource={cartItems}
              pagination={false}
            />
            <Card title="Thông tin giao hàng" style={{ marginTop: 20 }}>
              <Form
                form={form}
                name="shipping_info"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="address"
                  label="Địa chỉ giao hàng"
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  name="paymentMethod"
                  label="Phương thức thanh toán"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                >
                  <Select placeholder="Chọn phương thức thanh toán">
                    <Option value="cod">Thanh toán khi nhận hàng</Option>
                    <Option value="bank_transfer">Chuyển khoản ngân hàng</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đặt hàng
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Tổng tiền giỏ hàng">
              <Row justify="space-between">
                <Text>Tạm tính:</Text>
                <Text strong>{totalAmount.toLocaleString()}đ</Text>
              </Row>
              <Row justify="space-between" style={{ marginTop: 10 }}>
                <Text>Thành tiền:</Text>
                <Text strong style={{ fontSize: 18, color: '#ff4d4f' }}>{totalAmount.toLocaleString()}đ</Text>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CartPage;


