import Footer from "../../components/Footer.vue";
import SubNavBar from "@/components/SubNavbar.vue";
import Select from 'primevue/select';

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
      selectedCategory: null,
      selectedSize: null,
      sorting: [
        {name: "Price low to high", value: "pasc"},
        {name: "Price high to low", value: "pdes"}
      ],
      categories: [
        {name: "Shoes", value: "shoes"},
        {name: "Clothing", value: "clothing"},
        {name: "Accessories", value: "accessories"}
      ],
      sizes: [
        {value: "S"},
        {value: "M"},
        {value: "L"},
        {value: "XL"}
      ]
    };
  },
  async created() {
    console.log("Component created");
    await this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await fetch("http://localhost:5000/api/items"); // Fetch from Express API
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        this.items = data;
        console.log(data)
        console.log("Fetched items:", this.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        this.loading = false;
      }
    },

    sortItems() {
      if (this.sortOption.value === "pasc") {
        this.items.sort((a, b) => a.price - b.price);
      } else if (this.sortOption.value === "pdes") {
        this.items.sort((a, b) => b.price - a.price); 
      }
    },
    filterCategory() {
      this.items = this.items.filter((item) => item.category === this.selectedCategory.name)
    },
    filterSize() {
      this.items = this.items.filter((item) => item.size === this.selectedSize.value)
    }
  },
  watch: {
    sortOption() {
      this.sortItems();
    },
    selectedCategory() {
      this.filterCategory();
    },
    selectedSize() {
      this.filterSize();
    },
  },
};
