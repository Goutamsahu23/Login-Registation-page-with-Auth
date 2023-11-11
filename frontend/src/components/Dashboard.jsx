import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4040/api/v1/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setData(userData);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (!isAuthenticated) {
    navigate('/');
  }

  return (
    <Container className="mx-auto p-4">
  <h1 className="text-3xl font-semibold mb-4 text-center">Dashboard</h1>

  <Row>
    <Col>
      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <Table striped bordered hover responsive className="min-w-full bg-white table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-blue-900 to-blue-300 text-white">
              <th className="py-2 px-4 border-b border-gray-200">#</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Date of Birth</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white hover:bg-blue-100'}>
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.date_of_birth}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Col>
  </Row>
</Container>

  );
};

export default Dashboard;
