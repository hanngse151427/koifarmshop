import React from 'react';  

const RequestDetail = ({ request }) => {  
    return (  
        <div className="product-details">  
            <h3>Thông tin sản phẩm</h3>  
            <p><strong>Request ID:</strong> {request.requestId}</p>  
            <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>  
            <p><strong>Request Status:</strong> {request.requestStatus}</p>  
            <p><strong>Consignment Type:</strong> {request.consignmentType}</p>  
            <p><strong>User:</strong> {request.userName} (ID: {request.userId})</p>  
            <p><strong>Status:</strong> {request.status}</p>  

            <h4>Chi tiết sản phẩm:</h4>  
            {request.requestDetails.$values.map((detail, index) => (  
                <div key={index} className="fish-detail">  
                    <p><strong>Fish ID:</strong> {detail.fish.fishId}</p>  
                    <p><strong>Origin:</strong> {detail.fish.origin}</p>  
                    <p><strong>Gender:</strong> {detail.fish.gender}</p>  
                    <p><strong>Age:</strong> {detail.fish.age} years</p>  
                    <p><strong>Size:</strong> {detail.fish.size}</p>  
                    <p><strong>Breed:</strong> {detail.fish.breed}</p>  
                    <p><strong>Description:</strong> {detail.fish.description}</p>  
                    <img src={detail.fish.image} alt="Fish" style={{ width: '100px' }} />  
                    <p><strong>Price:</strong> {detail.fish.price} VND</p>  
                    <p><strong>Availability:</strong> {detail.fish.status ? 'Available' : 'Not Available'}</p>  
                </div>  
            ))}  
        </div>  
    );  
};  

export default RequestDetail;