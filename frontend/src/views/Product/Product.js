import axios from 'axios';

export default {
  data() {
    return {
      product: null
    };
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/${this.$route.params.id}`);
      this.product = response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  },
  methods: {
    addToCart() {
      console.log(`${this.product.name} added to cart`);
    },
    descriptionToggle(){
        var toggle = document.getElementById("description-toggle");
        var collapse = document.getElementById("description-collapse");
        if(collapse.getAttribute("data-open")){
            console.log(collapse.getAttribute("data-open"));
            collapse.setAttribute("data-open", 0);
            collapse.classList.add('noheight');
        }else{
            console.log(collapse.getAttribute("data-open"));
            collapse.setAttribute("data-open", 1);
            collapse.classList.remove('noheight');
        }
    }
  }
};