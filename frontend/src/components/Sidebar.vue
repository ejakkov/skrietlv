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
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  font-size: 1.3em;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
  height: calc(100vh - 60px); 
  position: sticky; 
  top: 60px; 
  z-index: 1; 
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 30px;
  cursor: pointer;
}
</style>
