import axios from 'axios';
import Footer from "../../components/Footer.vue";
import SubNavBar from "@/components/SubNavbar.vue";

export default {
  components: {
    SubNavBar,
    Footer,
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    console.log('Component created'); // Check if this logs

    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
  }
};