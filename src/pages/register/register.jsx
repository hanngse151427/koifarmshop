// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import AuthenTemplate from '../../components/authen-template'
import { Button, Checkbox, Form } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Input from 'antd/es/input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const initialFormData = {
  UserName: '',
  email: '',
  Password:'',
  ConfirmPassword:'',
  numberPhone: '',
  userImageUrl: null, // Khởi tạo với null cho trường ảnh
  Address: '',
  Role: ''
};
function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null); // State để lưu trữ file hình ảnh

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Lưu trữ file chọn
  };

  const handleSubmit = async (values) => {
    // Cập nhật formData từ values
    const dataToSubmit = {
      userName: values.username,
      email: values.email,
      Password:values.password,
      ConfirmPassword:values.confirmPassword,
      numberPhone: values.phone,
      userImageUrl: file ? URL.createObjectURL(file) : null, // Lưu URL của file ảnh
      Address: 'HoChiMinh', // Nếu cần, bạn có thể thêm trường này
      Role: '2' // Gán vai trò mặc định nếu cần
    };

    const formDataToSend = new FormData();
    formDataToSend.append('userName', dataToSubmit.userName);
    formDataToSend.append('email', dataToSubmit.email);
    formDataToSend.append('Password', dataToSubmit.Password);
    formDataToSend.append('ConfirmPassword', dataToSubmit.Password);
    formDataToSend.append('numberPhone', dataToSubmit.numberPhone);
    formDataToSend.append('userImageUrl', file); // Thêm file vào FormData
    formDataToSend.append('address', dataToSubmit.Address);
    formDataToSend.append('role', dataToSubmit.Role);

    try {
      await axios.post('https://localhost:7049/api/User/Register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Successfully registered new account");
      navigate("/login");
      // Reset form data
      setFormData(initialFormData);
      setFile(null); // Reset file
    } catch (error) {
      console.error(error);
      toast.error("Registration failed: " + (error.response?.data || "Unknown error"));
    }
  };

  return (
    <AuthenTemplate>
      <h1>Register Form</h1>
      <Form
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
      >
        <FormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </FormItem>
        
        <FormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </FormItem>
        
        <FormItem
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </FormItem>
        
        <FormItem
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </FormItem>
        
        <FormItem
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits!' },
          ]}
        >
          <Input />
        </FormItem>
        
        <FormItem
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not a valid email!' },
          ]}
        >
          <Input />
        </FormItem>

        {/* Trường tải lên ảnh */}
        <FormItem
          label="Upload Image"
          name="userImageUrl"
          rules={[{ required: true, message: 'Please upload your image!' }]}
        >
          <Input type="file" onChange={handleFileChange} />
        </FormItem>

        <Link to="/login">Already have an account? Go to login page</Link>

        <FormItem
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator: (_, value) => (value ? Promise.resolve() : Promise.reject('You must accept the terms!')) },
          ]}
        >
          <Checkbox>I agree to the terms and policy</Checkbox>
        </FormItem>
        
        <Button type='primary' htmlType='submit'>Sign up</Button>
      </Form>
    </AuthenTemplate>
  );
}

export default RegisterPage