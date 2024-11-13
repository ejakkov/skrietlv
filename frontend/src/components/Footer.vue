<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>About Us</h2>
          <p>
            SKRIET is a platform dedicated to providing top-quality products and support for our valued customers.
          </p>
        </div>
  
        <div class="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
  
        <div class="footer-section social">
          <h2>Follow Us</h2>
          <div class="social-icons">
            <a href="#"><i class="pi pi-facebook"></i></a>
            <a href="#"><i class="pi pi-twitter"></i></a>
            <a href="#"><i class="pi pi-instagram"></i></a>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom">
        &copy; 2024 SKRIET. All rights reserved.
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer"
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #a8d5a1;
    color: #000000;
    padding: 20px 0;
    text-align: center;
    font-family: "Oswald", sans-serif;
    font-weight: 600;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px;
  }
  
  .footer-section {
    max-width: 300px;
    margin: 10px;
  }
  
  .footer-section h2 {
    width: 300px;
    margin-bottom: 15px;
    font-size: 1.2em;
  }
  
  .footer-section p {
    width: 300px;
    font-size: 0.9em;
    line-height: 1.5;
    color: #111010;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin: 5px 0;
  }
  
  .footer-section ul li a {
    color: #111010;
    text-decoration: none;
    font-size: 0.9em;
  }
  
  .footer-section ul li a:hover {
    text-decoration: underline;
  }
  
  .social-icons a {
    color: #111010;
    margin: 0 10px;
    font-size: 1.5em;
    text-decoration: none;
  }
  
  .footer-bottom {
    background-color: #ebe7f2;
    color: #aaa;
    padding: 10px 0;
    font-size: 0.9em;
    justify-content: center;
  }
  </style>
  