import React, { useState } from 'react';
import { Button, Form, InputGroup, Card, Image, Badge, Row, Col } from 'react-bootstrap';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import axios from 'axios';
import user from '../assets/user.png';
import wave from '../assets/wave.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3000/api/v1/login', formData);

            const { success, token, user, message } = response.data;

            if (success) {
                // Store the token in local storage
                localStorage.setItem('token', token);

                setFormData({ email: '', password: '' });
                toast.success(message || 'Welcome back !!')


                navigate('/dashboard');
            }

        } catch (error) {
            console.error('Error during login:', error);
            const { success, message } = error.response.data;
            if (!success) {
                toast.error(message);
            }
        }

    };

    return (
        <Card  className='usercard w-[24rem] relative flex flex-col  items-center'>
            <Badge bg="primary" className="flex items-center justify-center absolute p-3 bottom-[31.5rem]">SIGN IN</Badge>

            <Image src={user} roundedCircle className='w-[80px] h-[80px] absolute bottom-[18rem] left-[9rem]' />
            <Card.Img variant="top" src={wave} />
            <Card.Body className='w-[24rem] p-5 ' style={{ backgroundColor: 'rgb(8 51 68)' }}>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><BiUser /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <Row className="mb-3 text-blue-500">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Check
                                type="checkbox"
                                label="Remember Me"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridForgotPassword">
                            <a href="/forgot-password">Forgot Password?</a>
                        </Form.Group>
                    </Row>

                    <Button type="submit" variant="primary" className="w-[100%]">
                        LOG IN
                    </Button>
                </Form>
                <Link to="/register" >New User ?</Link>
            </Card.Body>
        </Card>
    );
};

export default LoginPage;
