<template>
    <div id="app" :class="themeClass">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue';

  export default {
    components: {
      Navbar
    }
  };
  </script>
  <style>
    body{
      font-family: Calibri;
    }
  </style>