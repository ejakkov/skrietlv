<template>
    <nav class="navbar">
      <div class="logo">Skriet.lv</div>
      <ul class="nav-links" :class="{ active: isOpen }">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/catalog">Catalog</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
      </ul>
      <div class="menu-icon" @click="toggleMenu">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style scoped>

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #1a1a1a;
    color: #f5f5f5; 
  }
  
  .logo {
    font-size: 1.5em;
    font-weight: bold;
    color: #ff6f61; 
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
  }
  
  .nav-links a {
    color: #f5f5f5;
    text-decoration: none;
  }
  
  .nav-links a:hover {
    color: #ff6f61;
  }
  
  .menu-icon {
    display: none;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
  }
  
  .menu-icon span {
    width: 25px;
    height: 3px;
    background-color: white;
    transition: 0.3s;
  }

  </style>