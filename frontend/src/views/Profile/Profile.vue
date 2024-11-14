<template>
    <div>
      <h1>Profile</h1>
      <p>Welcome, {{ user.name }}</p>
      <h2>Your Orders</h2>
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order._id" class="order">
          <p>Order ID: {{ order._id }}</p>
          <p>Total: {{ order.totalAmount }}</p>
          <p>Status: {{ order.status }}</p>
        </div>
      </div>
      <div v-else>
        <p>No orders found.</p>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
    Footer,
    },
    data() {
      return {
        user: {
          name: "Andris Labietis" 
        },
        orders: [

        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .order {
    border: 1px solid #ddd;
    padding: 8px;
    margin: 8px 0;
  }
  </style>