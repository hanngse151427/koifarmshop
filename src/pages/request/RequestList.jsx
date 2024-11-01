import React, { useEffect, useState } from 'react';  
import RequestDetail from './RequestDetail'; // Import your RequestDetail component  

const RequestList = () => {  
    const [requests, setRequests] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    
    useEffect(() => {  
        const fetchRequests = async () => {  
            try {  
                const response = await fetch("https://localhost:7049/api/Request/GetRequestByConsignmentType");  
                if (!response.ok) {  
                    throw new Error('Network response was not ok');  
                }  
                const data = await response.json();  
                setRequests(data.$values); // Assuming the response structure matches the provided JSON.  
            } catch (err) {  
                setError(err.message);  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchRequests();  
    }, []);  

    if (loading) return <p>Loading...</p>;  
    if (error) return <p>Error: {error}</p>;  

    return (  
        <div>  
            <h2>Request List</h2>  
            {requests.map((request) => (  
                <RequestDetail key={request.requestId} request={request} />  
            ))}  
        </div>  
    );  
};  

export default RequestList;  