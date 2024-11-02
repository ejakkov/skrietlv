<template>
    <div class="navbar">
      <div class="navbar-content">
        <span class="brand">SKRIET</span>
        <div class="nav-links">
          <span>Men</span>
          <span>Women</span>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Search" />
          <button>
            <img src="search-icon.svg" alt="Search Icon" />
          </button>
        </div>
        <div class="nav-icons">
          <span>€</span>
          <span>EN</span>
          <span>Support</span>
          <img src="notification-icon.svg" alt="Notifications" />
          <img src="profile-icon.svg" alt="Profile" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #a8d5a1; 
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  
  .navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
  }
  
  .brand {
    font-weight: bold;
    font-size: 1.5em;
  }
  
  .nav-links span,
  .nav-icons span {
    margin-right: 20px;
    cursor: pointer;
  }
  
  .search-bar {
    position: relative;
  }
  
  .search-bar input {
    padding: 5px 10px;
    border-radius: 15px;
    border: 1px solid #ddd;
  }
  
  .search-bar button {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>