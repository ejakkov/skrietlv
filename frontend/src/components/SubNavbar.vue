<template>
  <div>
    <div class="sub-navbar" :class="{ hidden: !showSubNavbar }">
      <div class="sub-navbar-content">
        <div class="nav-links">
          <span>Men</span>
          <span>Women</span>
        </div>
        <div class="search-bar">
          <button class="menu-icon">
            <i class="pi pi-bars"></i>
          </button>
          <input type="text" placeholder="Search" />
          <button class="search-icon">
            <i class="pi pi-search"></i>
          </button>
        </div>
        <div class="sub-nav-icons">
          <i class="pi pi-heart"></i>
          <i class="pi pi-shopping-cart" @click="goToCart"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubNavbar",
  data() {
    return {
      showSubNavbar: true,
      lastScrollY: window.scrollY,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollY = window.scrollY;
      this.showSubNavbar = currentScrollY < this.lastScrollY || currentScrollY <= 0;
      this.lastScrollY = currentScrollY;
    },
    goToCart() {
      this.$router.push({ name: 'Cart' });
    },
  },
};
</script>


<style scoped>

.sub-navbar.hidden {
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

@import 'primeicons/primeicons.css';

.sub-navbar {
  background-color: #f9f9f9; 
  padding: 10px;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  font-family: "Oswald", sans-serif;
  font-weight: 700;
}

.sub-navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px; 
  width: 100%;
  max-width: 1200px;
}

.nav-links span {
  margin-right: 20px;
  cursor: pointer;
  font-weight: 400;
  color: #333;
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  font-size: 1.2em;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #ebe7f2; 
  border-radius: 25px;
  padding: 5px 15px;
  width: 100%; 
  max-width: 500px;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  width: 100%;
  padding-left: 5px;
  font-size: 1em;
}

.search-bar .menu-icon,
.search-bar .search-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  align-items: center;
}

.search-bar .menu-icon i,
.search-bar .search-icon i {
  font-size: 1.1em;
  align-items: center;
}

.sub-nav-icons {
  display: flex;
  align-items: center;
}

.sub-nav-icons i {
  margin-left: 10px;
  margin-right: 20px;
  font-size: 1.6em;
  cursor: pointer;
  color: #333;
}
</style>