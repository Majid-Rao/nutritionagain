import React,{useEffect} from 'react'
import './Login.css'
import {Spin, Card, Flex, Form,Input,Button, Typography, Alert } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/dr.webp'
import useLogin from '../../hooks/useLogin.jsx';


function Login() {
  const {error,loading,loginUser} = useLogin();
    useEffect(() => {
   
        document.body.classList.add('login-page');
    
        return () => {
          document.body.classList.remove('login-page');
        };
      }, []);
    
      const handleLogin = async (values) => {
        // console.log(values);
        await loginUser(values);
      };
  return (
    <Card className="form-container">
    <Flex gap='large' align= "center">
         {/* image */}
       
      <Flex flex={1}>
        <img src={loginImage} className="auth-image"/>
      </Flex>
      {/* form */}
      <Flex vertical flex={1}>
        
          <Typography.Title level={3} strong className="title">
            Sign In 
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Unlock Your World!
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                }
              ]}
            >
              {/* Input fields */}
              <Input size="large" placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              {/* Input fields */}
              <Input.Password size="large" placeholder="Enter your Password" />
            </Form.Item>
           
            {
              error && toast.error(error)
            }
            <Form.Item>
              <Button 
             type={`${loading ? '' : 'primary'}`} 
              htmlType="submit" size="large" className="btn">
                {loading ? <Spin /> :'Sign In'}
                </Button>
            </Form.Item>
          </Form>
        </Flex>
      
      <ToastContainer />
      </Flex>
  </Card>
  )
}

export default Login
