<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <div class="nav-left"></div>
        <span class="brand" @click="goToHome"> SKRIET </span>
        <div class="nav-icons">
          <span>€</span>
          <span>EN</span>
          <span>Support</span>
          
          <i class="pi pi-bell" @click="toggleDropdown"></i>
          <i class="pi pi-user" @click="goToProfile"></i>
          
          <div class="dropdown" v-if="isDropdownVisible" ref="dropdown">
            <ul>
              <li v-for="(notification, index) in notifications" :key="index">
                {{ notification }}
              </li>
              <li v-if="notifications.length === 0">No new notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isDropdownVisible: false, // track dropdown visibility
      notifications: [
        "New sale on summer collection!",
        "Your order #1234 has been shipped",
        "New message from Support Team",
      ], 
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleClickOutside(event) {
      if (
        this.isDropdownVisible &&
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target) &&
        !event.target.classList.contains("pi-bell")
      ) {
        this.isDropdownVisible = false;
      }
    },
    goToProfile() {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        // User is logged in, redirect to profile
        this.$router.push('/profile');
      } else {
        // User is not logged in, redirect to login
        this.$router.push('/login');
      }
    },
    goToHome() {
      if (window.scrollY === 0) {
        if (this.$route.name === 'Home') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        } else {
          this.$router.push({ name: 'Home' });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import 'primeicons/primeicons.css';

.navbar {
  position: fixed;
  width: 100%;
  background-color: #a8d5a1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); 
  padding: 20px;
  margin-right: 0px;
  display: flex;
  justify-content: center;
  z-index: 1000; 
  font-family: "Oswald", sans-serif;
  font-weight: 700;
}

.navbar-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  position: relative;
}

.nav-left {
  flex: 1; 
}

.brand {
  font-weight: 500;
  font-size: 1.7em;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: left 0.3s ease;
  cursor: default;
  outline: none;
  user-select: none;
}

@media (max-width: 900px) {
  .brand {
    left: 45%;
  }
}

@media (max-width: 700px) {
  .brand {
    left: 40%;
  }
}

@media (max-width: 500px) {
  .brand {
    left: 35%;
  }
}

@media (max-width: 400px) {
  .brand {
    left: 30%;
  }
}

.nav-icons {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.nav-icons span {
  margin-right: 20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 1.1em;
}

.nav-icons i {
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
  font-size: 1.5em;
}

.dropdown {
  position: absolute;
  right: -20px; 
  top: 40px; 
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 999;
  width: 200px;
  border-radius: 5px;
  font-family: "Oswald", sans-serif;
  font-weight: 400;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>
