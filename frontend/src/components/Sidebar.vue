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
    width: 200px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin-bottom: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  </style>