import React, { useState, useEffect } from "react";
import photo from "../../../public/photo.svg";  
import hoso from "../../assets/ho-so.svg";  
import cart from "../../assets/cart.svg";  
import shop from "../../assets/shop.svg";  
import support from "../../assets/phone.svg";  
import searchIcon from "../../assets/search.svg";  
import listIcon from "../../assets/list.svg";  
import admin from "../../assets/10582607-1.svg";  

const RouteMain = [  
  {  
    path: "/login",  
    name: "Đăng nhập",  
    icon: hoso,  
  },  
  {  
    path: "/register",  
    name: "Đăng ký",  
    icon: hoso,  
  },  
  {  
    path: "/support",  
    name: "Hỗ trợ khách hàng",  
    icon: support,  
  },  
  {  
    path: "/product",  
    name: "Cá Koi",  
    icon: admin,  
  },  
  {  
    path: "/dashboard",  
    name: "Quản lý",  
    icon: shop,  
  },  
  {  
    path: "/cart",  
    name: "Giỏ hàng",  
    icon: cart,  
  },  
];  

const SubRouter = [  
  {  
    path: "list",  
    name: "DANH MỤC",  
  },  
  {  
    path: "/",  
    name: "HOME",  
  },  
  {  
    path: "deals-hot",  
    name: "HOT DEALS",  
  },  
  {  
    path: "new-koi",  
    name: "HÀNG MỚI VỀ",  
  },  
  {  
    path: "best-sell",  
    name: "BÁN CHẠY",  
  },  
  {  
    path: "consignment",  
    name: "KÝ GỬI",  
  },  
];  

const Header = () => {  
  const userName = localStorage.getItem("userName"); 
  const [cartItemCount, setCartItemCount] = useState(0); 

  // Hàm để tính số lượng sản phẩm trong giỏ hàng
  const updateCartItemCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalCount); 
  };

  useEffect(() => {
    updateCartItemCount(); // Cập nhật số lượng khi component mount
    const handleStorageChange = () => updateCartItemCount(); // Cập nhật khi có thay đổi
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); 

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cartItems.find(item => item.fishId === product.fishId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartItemCount(); // Cập nhật số lượng ngay lập tức
  };

  return (  
    <header className="shadow-md w-full">  
      <div className="bg-[#26445B] text-white mx-auto px-4 py-4 flex items-center justify-around">  
        <div className="flex-shrink-0">  
          <img src={photo} alt="Logo" className="h-24" />  
        </div>  

        <div className="mx-4 relative">  
          <input  
            type="text"  
            className="px-32 py-1 pl-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-lg"  
            placeholder="Search products..."  
          />  
          <img  
            src={searchIcon}  
            alt="Search"  
            className="absolute right-3 top-1.5 h-8 w-8 text-gray-500"  
          />  
        </div>  

        {userName ? ( // Kiểm tra nếu có userName  
          <div className="flex items-center space-x-3 text-lg">  
            <span className="text-white">{userName}</span>  
            <button  
              className="text-white hover:text-gray-200"  
              onClick={() => {  
                localStorage.removeItem('userName'); // Xóa userName khỏi localStorage khi đăng xuất  
                window.location.reload(); // Tải lại trang để cập nhật giao diện  
              }}  
            >  
              Đăng xuất  
            </button>  
          </div>  
        ) : (  
          RouteMain.map((route) => (  
            <div key={route.path}>  
              <a  
                href={route.path}  
                className="text-white hover:text-gray-200 flex items-center space-x-3 text-lg"  
              >  
                <img src={route.icon} alt={route.name} className="h-8 w-8" />  
                <span>{route.name}</span>  
                {route.path === "/cart" && cartItemCount > 0 && ( // Kiểm tra nếu là giỏ hàng và có sản phẩm
                  <span className="bg-red-500 text-white rounded-full px-2 text-xs ml-2">
                    {cartItemCount}
                  </span>
                )}
              </a>  
            </div>  
          ))  
        )}  
      </div>  
      <div className="bg-[#D9D9D9] text-white mx-auto px-4">  
        <nav className="flex items-center justify-start">  
          {SubRouter.map((route) => (  
            <React.Fragment key={route.path}>  
              <div>  
                <a  
                  href={route.path}  
                  className="flex items-center space-x-3 px-3 text-[#014A77]"  
                >  
                  {route.path === "list" && (  
                    <img src={listIcon} alt={route.name} className="h-8 w-8" />  
                  )}  
                  <span>{route.name}</span>  
                </a>  
              </div>  
              {route.path === "list" && (  
                <span className="text-[#014A77]"> | </span>  
              )}  
            </React.Fragment>  
          ))}  
        </nav>  
      </div>  
    </header>  
  );  
};  

export default Header;