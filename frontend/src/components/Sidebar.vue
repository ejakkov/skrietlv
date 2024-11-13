<template>
    <div class="sidebar">
      <ul>
        <li>Shoes</li>
        <li>Clothing</li>
        <li>Nutrition</li>
        <li>Injury, Relief & Recovery</li>
        <li>More running gear</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  
  <style scoped>
  .sidebar {
    background-color: #f5f5f5;
    padding: 20px;
    width: 100px;
    margin-left: 30px;
    font-family: "Oswald", sans-serif;
    font-weight: 300;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin-bottom: 20px;
    cursor: pointer;
  }
  </style>