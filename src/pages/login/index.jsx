/* eslint-disable no-unused-vars */

import React from 'react';
import AuthenTemplate from '../../components/authen-template';
import { Button, Checkbox, Form, Input } from 'antd';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();

  const handleLoginGoogle = async () => {
    const auth = getAuth();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const token = res.user.accessToken;
      console.log(res.user);
      console.log(token);
      // Bạn có thể xử lý token ở đây (ví dụ: lưu vào localStorage)
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  const handleLogin = async (values) => {
    const { email, password } = values; // Thay đổi thành email và password
    try {
      const response = await axios.post('https://localhost:7049/api/User/Login', { email, password }); 
      console.log(response)// Gửi dữ liệu đăng nhập
      const userData = response.data.data.userName;  

      // Lưu userName vào localStorage  
      localStorage.setItem('userName', userData);  

      if (response.data.data.role === 1) {
        navigate("/dashboard");
      } else if (response.data.data.role === 2) {

        navigate("/");
      } else {

      }
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <AuthenTemplate>
      <h1>Welcome back!</h1>
      <h4>Enter your credentials to access your account</h4>
      <Form
        labelCol={{ span: 24 }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Email"
          name="email" // Thay đổi thành email
          rules={[{ required: true, message: "Please input your email!" }, { type: 'email', message: 'The input is not a valid email!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Link to="/register">Don't have an account? Register new account</Link>

        <Form.Item>
          <Checkbox>Remember account</Checkbox>
        </Form.Item>
        
        <Button type='primary' htmlType='submit'>Login</Button>
        <Button onClick={handleLoginGoogle}>Login with Google</Button>

        <Link to="/">Home</Link>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;