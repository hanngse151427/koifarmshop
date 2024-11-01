import React, { useEffect, useState } from 'react';  
import axios from 'axios';  

const GetPendingSaleRequest = () => {  
    const [requests, setRequests] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const fetchRequests = async () => {  
            try {  
                const response = await axios.get('https://localhost:7049/api/Request/GetAcceptedSaleRequests');  
                if (response.data) {  
                    setRequests(response.data.$values || []);   
                }  
            } catch (err) {  
                setError(err);  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchRequests();  
    }, []);  

    const handleAccept = async (requestId) => {  
        try {  
            await axios.post(`https://localhost:7049/api/Request/Accept/${requestId}`);  
            setRequests(prev => prev.map(req => req.requestId === requestId ? { ...req, requestStatus: 'Accepted' } : req));  
        } catch (err) {  
            console.error('Error accepting request:', err);  
        }  
    };  

    const handleReject = async (requestId) => {  
        try {  
            await axios.post(`https://localhost:7049/api/Request/Reject/${requestId}`);  
            setRequests(prev => prev.map(req => req.requestId === requestId ? { ...req, requestStatus: 'Rejected' } : req));  
        } catch (err) {  
            console.error('Error rejecting request:', err);  
        }  
    };  

    if (loading) return <div>Loading...</div>;  
    if (error) return <div>Error: {error.message}</div>;  

    return (  
        <div>  
            <h1>Pending Sale Requests</h1>  
            {requests.length === 0 ? (  
                <div>No pending sale requests found.</div>  
            ) : (  
                <ul>  
                    {requests.map(request => (  
                        <li key={request.requestId}>  
                            <h2>{request.userName}'s Request</h2>  
                            <p>Date: {new Date(request.requestDate).toLocaleString()}</p>  
                            <p>Status: {request.requestStatus}</p>  
                            <h3>Details:</h3>  
                            <ul>  
                                {request.requestDetails.$values.map(detail => (  
                                    <li key={detail.fish.fishId}>  
                                        <h4>Fish: {detail.fish.breed}</h4>  
                                        <p>Quantity: {detail.quantity}</p>  
                                        <p>Price: {detail.fish.price.toLocaleString()} VND</p>  
                                        <p>Origin: {detail.fish.origin}</p>  
                                        <p>Age: {detail.fish.age} years</p>  
                                        <img src={detail.fish.image} alt={detail.fish.breed} style={{ width: '200px' }} />  
                                        <p>Description: {detail.fish.description}</p>  
                                        {detail.fish.certificates && detail.fish.certificates.$values.length > 0 && (  
                                            <div>  
                                                <h5>Certificates:</h5>  
                                                <ul>  
                                                    {detail.fish.certificates.$values.map(cert => (  
                                                        <li key={cert.certificateId}>  
                                                            <a href={cert.certificateUrl}>Certificate URL</a>  
                                                        </li>  
                                                    ))}  
                                                </ul>  
                                            </div>  
                                        )}  
                                    </li>  
                                ))}  
                            </ul>  
                            {request.requestStatus === 'Pending' && ( // Hiển thị nút chỉ khi chưa xử lý  
                                <>  
                                    <button onClick={() => handleAccept(request.requestId)}>Đồng ý</button>  
                                    <button onClick={() => handleReject(request.requestId)}>Từ chối</button>  
                                </>  
                            )}  
                        </li>  
                    ))}  
                </ul>  
            )}  
        </div>  
    );  
};  

export default GetPendingSaleRequest;