import React, { useState } from "react";
import "./Userprofile.css";
import users from "../../assets/data/user";
import orders from "../../assets/data/orders";

const UserProfile = () => {
  const defaultUser = users[0];
  const [form, setForm] = useState({
    firstName: defaultUser.firstName || "",
    lastName: defaultUser.lastName || "",
    phoneNumber: defaultUser.phoneNumber || "",
    email: defaultUser.email || "",
    avatar: defaultUser.avatar || null,
  });

  const [activeTab, setActiveTab] = useState("profile");

  const [sidebarInfo, setSidebarInfo] = useState({
    firstName: defaultUser.firstName || "",
    lastName: defaultUser.lastName || "",
    avatar: defaultUser.avatar || null,
    phoneNumber: defaultUser.phoneNumber || "",
    email: defaultUser.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSidebarInfo({
      firstName: form.firstName,
      lastName: form.lastName,
      avatar: form.avatar,
      phoneNumber: form.phoneNumber,
      email: form.email,
    });

    alert("Profile saved successfully!");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-info">
          <img
            src={sidebarInfo.avatar}
            alt="User Avatar"
            className="profile-avatar"
          />
          <h3>
            {sidebarInfo.firstName} {sidebarInfo.lastName}
          </h3>
        </div>
        <nav>
          <ul>
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => handleTabChange("profile")}
            >
              Thông tin cá nhân
            </li>
            <li
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => handleTabChange("orders")}
            >
              Xem đơn hàng
            </li>
            <li
              className={activeTab === "edit" ? "active" : ""}
              onClick={() => handleTabChange("edit")}
            >
              Chỉnh sửa thông tin cá nhân
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-form">
            <h1>Thông tin cá nhân</h1>
            <div className="profile-details">
              <p>
                <strong>Họ và Tên:</strong> {sidebarInfo.firstName}{" "}
                {sidebarInfo.lastName}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{" "}
                {sidebarInfo.phoneNumber || "Chưa có thông tin"}
              </p>
              <p>
                <strong>Email:</strong> {sidebarInfo.email || "Chưa có thông tin"}
              </p>
              <p>
                <strong>Avatar:</strong>{" "}
                <img
                  src={sidebarInfo.avatar}
                  alt="Avatar"
                  className="profile-avatar-small"
                />
              </p>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-content">
            <h2>Đơn hàng</h2>
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <h3>Đơn hàng #{index + 1}</h3>
                <p><strong>User ID:</strong> {order.userId}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {order.status}</p>

                <h4>Sản phẩm:</h4>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="order-item-image"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}


        {activeTab === "edit" && (
          <div className="profile-form">
            <h1>Chỉnh sửa thông tin cá nhân</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Họ
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Tên
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone Number
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </label>

              <label>
                E-mail
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Avatar
                <input type="file" onChange={handleFileUpload} />
              </label>

              <div className="form-actions">
                <button type="submit">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
