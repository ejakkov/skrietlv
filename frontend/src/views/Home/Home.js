import SubNavbar from "@/components/SubNavbar.vue";
import Footer from "@/components/Footer.vue";
import Carousel from 'primevue/carousel';
import axios from "axios";
import Button from "primevue/button";


export default {
  components: {
    SubNavbar,
    Footer,
    Carousel,
  },
  data() {
    return {
      products: null, 
      likedItems: this.getLikedItemsFromLocalStorage(), 
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: "768px",
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
  computed: {
    shoes() {
      return this.products ? this.products.filter((product) => product.category === "Shoes") : [];
    },
    accessories() {
      return this.products ? this.products.filter((product) => product.category === "Accessories") : [];
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        this.products = response.data; 
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    getLikedItemsFromLocalStorage() {
      const savedItems = localStorage.getItem("likedItems");
      return savedItems ? JSON.parse(savedItems) : []; 
    },
    
    toggleLike(item) {
      console.log("LIKED clicked for", item._id);
      const itemIndex = this.likedItems.findIndex((likedItem) => likedItem._id === item._id);

      if (itemIndex === -1) {
        this.likedItems.push(item);
      } else {
        this.likedItems.splice(itemIndex, 1);
      }

      localStorage.setItem("likedItems", JSON.stringify(this.likedItems));
    },

    isLiked(itemId) {
      console.log("Checking if liked:", itemId);
      return this.likedItems.some((item) => item._id === itemId); 
    },
  },
  mounted() {
    this.fetchItems(); 
  },
};
