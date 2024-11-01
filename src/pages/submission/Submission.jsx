// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Submission.css";

function Submission() {
  const [origin, setOrigin] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [breed, setBreed] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  const [fishImage, setfishImage] = useState(null);
  const [certificateUrls, setCertificateUrls] = useState([]);
  const [genderSelect, setGenderSelect] = useState("");
  const [method, setMethod] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFishFileChange = (e) => {
    setFishImage(e.target.files[0]); // Chỉ cho phép một hình ảnh cá
  };

  const handleCertificateFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCertificateUrls(files); // Lưu tất cả hình ảnh chứng nhận vào mảng
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append(
      "fishRequest",
      JSON.stringify({
        origin,
        gender,
        age,
        price,
        size,
        breed,
        description,
        genderSelect,
        method,
      })
    );

    if (fishImage) {
      Array.from(fishImage).forEach((file) => {
        formData.append("fishImage", file);
      });
    }

    if (certificateUrls.length > 0) {
      certificateUrls.forEach((file) => {
        formData.append("certificateUrls", file);
      });
    }

    try {
      const response = await axios.post(
        "https://localhost:7049/api/Request/CreateSaleRequest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Consignment successful!");
      // Reset form
      setOrigin("");
      setGender("");
      setAge("");
      setPrice("");
      setSize("");
      setBreed("");
      setDescription("");
      setGenderSelect("");
      setMethod("");
      setFishImage(null);
      setCertificateUrls([]);
    } catch (err) {
      setError("An error occurred during the consignment process.");
    }
  };

  return (
    <div className="submission-page">
      <div className="form-container">
        <h2 className="wanna">“I” want to consign for sale</h2>
        <form>
          <div className="form-group">
            <label htmlFor="fishType">Koi Fish Information</label>
          </div>
          <div className="form-group">
            <label htmlFor="origin">Origin:</label>
            <input type="text" id="origin" placeholder="Size" required />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size:</label>
            <input type="text" id="size" placeholder="Size" required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" placeholder="Age" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of your Koi fish:</label>
            <textarea
              id="description"
              placeholder="Enter description..."
              rows="4"
              maxLength="200"
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (VND):</label>
            <input
              type="number"
              id="price"
              placeholder="Price you want to consign in VND"
              required
              min="0" // Ensures no negative values
              step="1000" // Sets increments to 1,000 VND, adjust as necessary
            />
          </div>
          <div className="form-group">
            <label htmlFor="genderSelect">Gender:</label>
            <select id="genderSelect" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="method">Phương thức:</label>
            <select id="method" required>
              <option value="">Chọn phương thức</option>
              <option value="method1">Phương thức 1</option>
              <option value="method2">Phương thức 2</option>
            </select>
          </div>
          <div className="upload-buttons">
            <button type="button" className="upload-button">
              Thêm hình ảnh
            </button>
            <button type="button" className="upload-button">
              Thêm video
            </button>
          </div>
          <p className="note">
            (Bạn vui lòng đến trang trại của công ty chúng tôi để ký gửi, hoặc
            chọn option đến kiểm tra tại nhà với mức phí khác nhau.)
          </p>
          <p className="warning">
            Lưu ý: - Chỉ ký nhận ký gửi cá trên 1 tháng tuổi.
            <br /> - Chỉ nhận ký gửi ở khu vực TP.HCM.
            <br /> - Phí và tiền sẽ được hiện hiện sau khi cá đã được mua.
          </p>
          <button type="submit" className="submit-button">
            Xác nhận gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Submission;
