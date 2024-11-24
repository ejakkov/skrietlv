import axios from 'axios';
import Footer from "../../components/Footer.vue";
import SubNavBar from "@/components/SubNavbar.vue";
import Select from 'primevue/select';

import { ref } from 'vue';

export default {
  components: {
    SubNavBar,
    Footer,
    Select,
  },
  data() {
    return {
      items: [],
      sortOption: "asc",
      options:[" a", "b"],
      selectedCity: ref(),
      cities: [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ]
    };
  },
  created() {
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
    },

    sortItems() {
      if (this.sortOption === "asc") {
        this.items.sort((a, b) => a.price - b.price);
      } else if (this.sortOption === "desc") {
        this.items.sort((a, b) => b.price - a.price); 
      }
    },
  },
  watch: {
    sortOption() {
      this.sortItems();
    },
  },
};
