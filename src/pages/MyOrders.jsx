import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './myOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('📦 My Orders Response:', response.data);
                setOrders(response.data.orders || []);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="orders-loading">Loading your orders...</div>;

    return (
        <div className="my-orders-container">
            <h1 className="orders-title">My Orders</h1>
            {orders.length === 0 ? (
                <div className="no-orders">
                    <p>You haven't placed any orders yet.</p>
                    <button onClick={() => navigate('/products')}>Start Shopping</button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.order_id} className="order-card" onClick={() => navigate(`/order-confirmation/${order.order_id}`)}>
                            <div className="order-header">
                                <span className="order-number">Order #{order.order_number}</span>
                                <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
                            </div>
                            <div className="order-summary">
                                <span>Placed on: {new Date(order.created_at).toLocaleDateString()}</span>
                                <span>Total: ₹{order.total_amount}</span>
                            </div>
                            <div className="order-actions">
                                <button className="btn-track">Track Order</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
