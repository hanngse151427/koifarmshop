// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  InputNumber,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CardProduct from "../../components/Card/CardProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchCartItems = () => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const items = JSON.parse(cartData);
        setCartItems(items)
         
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when component mounts
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };



const handleQuantityChange = (value, key) => {
  const updatedCartItems = cartItems.map((item) => {
    if (item.key === key) {
      return { ...item, quantity: value };
    }
    return item;
  });
  setCartItems(updatedCartItems);
  calculateTotalAmount(updatedCartItems);
};

const handleDelete = (key) => {
  const updatedCartItems = cartItems.filter((item) => item.key !== key);
  setCartItems(updatedCartItems);
  calculateTotalAmount(updatedCartItems);
  localStorage.setItem("cart", JSON.stringify(updatedCartItems));
};

  const onFinish = (values) => {
    console.log("Thông tin đặt hàng:", { ...values, cartItems, totalAmount });
    // Xử lý đặt hàng ở đây
  };
  const showConfirmExit = () => {  
    Modal.confirm({  
      title: "Xác nhận thoát",  
      content: "Bạn chưa thanh toán. Bạn có chắc chắn muốn rời khỏi không?",  
      okText: "Có",  
      okType: "danger",  
      cancelText: "Không",  
      onOk() {  
        navigate(-1); // Quay lại trang trước  
      },  
      onCancel() {  
        console.log("Người dùng đã chọn không thoát."); // Đưa ra log cho hành động hủy  
      },  
    });  
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={image} alt={record.fishId} style={{ width: 50, marginRight: 10 }} />
          <span>{record.fishId}</span>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}đ`,
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) => (
        <InputNumber min={1} value={record.quantity} />
      ),
    },
    {
      title: "",
      key: "action",
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
      <Content style={{ padding: "0 50px" }}>
        <Title level={2}>Giỏ hàng</Title>
        <Button
          type="default"
          onClick={() => navigate(-1)} // Điều hướng về trang trước đó
          style={{ margin: "20px 0" }}
        >
          Quay lại
        </Button>
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
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ giao hàng!",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  name="paymentMethod"
                  label="Phương thức thanh toán"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương thức thanh toán!",
                    },
                  ]}
                >
                  <Select placeholder="Chọn phương thức thanh toán">
                    <Option value="cod">Thanh toán khi nhận hàng</Option>
                    <Option value="bank_transfer">
                      Chuyển khoản ngân hàng
                    </Option>
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
                <Text strong style={{ fontSize: 18, color: "#ff4d4f" }}>
                  {totalAmount.toLocaleString()}đ
                </Text>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CartPage;
