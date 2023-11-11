import React, { useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import wave from '../assets/wave.png'
import Badge from 'react-bootstrap/Badge';
import user from '../assets/user.png'
import { BiUser } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {BsCalendarDate} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date_of_birth: '',
        password: '',
    });
    const navigate=useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4040/api/v1/register', formData);

           
            toast.success("User created successfully. Please log in.");
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error submitting registration:', error);
            const {success,message}=error.response.data;
            if(!success){
                toast.error(message);
            }
            
        }
    };


    return (
        <Card  className='usercard w-[24rem] relative flex flex-col  items-center'>
            <Badge bg="primary" className="flex items-center justify-center absolute p-3 bottom-[34rem]">WELCOME !!</Badge>
            <Image src={user} roundedCircle className='w-[80px] h-[80px] absolute bottom-[20.5rem] left-[9rem] '/>
            <Card.Img variant="top" src={wave} />
            <Card.Body className='w-[24rem] p-5 ' style={{ backgroundColor: 'rgb(8 51 68)' }}>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><BiUser /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><BsCalendarDate/></InputGroup.Text>
                        <Form.Control
                            type='date'
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            placeholder="Date-of-Birth"
                            aria-label="Date-of-Birth"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><AiOutlineMail /></InputGroup.Text>
                        <Form.Control
                            type='email'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><RiLockPasswordLine /></InputGroup.Text>
                        <Form.Control
                            type='password'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <Button type="submit" variant="primary" className="w-[100%]">
                        SIGN UP
                    </Button>

                </Form>

            </Card.Body>
        </Card>
    )
}

export default RegisterPage
