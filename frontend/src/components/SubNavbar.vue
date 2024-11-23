<template>
  <div>
    <div class="sub-navbar" :class="{ hidden: !showSubNavbar }">
      <div class="sub-navbar-content">
        <div class="nav-links">
          <span 
            @mouseenter="setActiveDropdown('men')" 
            @mouseleave="handleMouseLeave('men', $event)"
            >Men</span>
          <span 
            @mouseenter="setActiveDropdown('women')" 
            @mouseleave="handleMouseLeave('women', $event)"
            >Women</span>
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
          <i class="pi pi-heart" @click="goToLikedItems"></i>
          <i class="pi pi-shopping-cart" @click="goToCart"></i>
        </div>
      </div>

      <!-- Dropdown Men -->
      <div 
        class="dropdown-menu men-dropdown"
        :class="{ 'active': activeDropdown === 'men' }"
        @mouseenter="setActiveDropdown('men')"
        @mouseleave="handleMouseLeave('men', $event)"
      >
        <div class="dropdown-item">T-Shirts</div>
        <div class="dropdown-item">Shirts</div>
        <div class="dropdown-item">Shoes</div>
        <div class="dropdown-item">Accessories</div>
        <div class="dropdown-item">Supplemets</div>
      </div>

      <!-- Dropdown Women -->
      <div 
        class="dropdown-menu women-dropdown"
        :class="{ 'active': activeDropdown === 'women' }"
        @mouseenter="setActiveDropdown('women')"
        @mouseleave="handleMouseLeave('women', $event)"
      >
        <div class="dropdown-item">Dresses</div>
        <div class="dropdown-item">Tops</div>
        <div class="dropdown-item">Shoes</div>
        <div class="dropdown-item">Bags</div>
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
      activeDropdown: "", // tracks which dropdown is active 
      isHovering: false, // keeps track of hover state for button and dropdown
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
      this.$router.push({ name: "Cart" });
    },
    goToLikedItems() {
      this.$router.push({ name: "Likes" });
    },
    setActiveDropdown(dropdown) {
      this.activeDropdown = dropdown;
    },
    handleMouseLeave(dropdown, event) {
      // check if the cursor has left the entire dropdown area 
      const relatedTarget = event.relatedTarget;
      if (relatedTarget && !relatedTarget.closest(`.dropdown-menu.${dropdown}-dropdown`) && !relatedTarget.closest('.nav-links span')) {
        this.activeDropdown = ''; // hide dropdown
      }
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); 
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  position: sticky;
  z-index: 9; 
}

.sub-navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px; 
  width: 100%;
  max-width: 1200px;
}

.nav-links {
  position: relative;
  display: flex;
}

.nav-links span {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  font-weight: 400;
  color: #333;
  font-size: 1.2em;
  font-family: "Oswald", sans-serif;
}

.dropdown-menu {
  position: absolute;
  top: 62px;
  left: 0;
  width: 100%;
  background-color: #f5b7b1;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10;
}

.dropdown-menu.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.nav-links span:hover + .dropdown-menu,
.dropdown-menu:hover {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.dropdown-item {
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  font-size: 1.2em;
  color: #333;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.men-dropdown {
  left: 0;
}

.women-dropdown {
  left: 0;
}

@media (max-width: 768px) {
  .dropdown-menu {
    flex-direction: column;
    align-items: center;
  }

  .dropdown-item {
    padding: 15px;
  }
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