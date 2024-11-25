import Footer from "../../components/Footer.vue";
import Profile from "@/views/Profile/Profile.vue";

export default {
  components: {
    Footer
  },
  data() {
    return {
      isLoggedIn: true,
      deliveryMethod: 'pakomats',
      selectedPakomats: '',
      selectedPakomatsAddress: '',
      recipientName: '', 
      recipientSurname: '', 
      recipientPhone: '', 
      recipientCity: '',
      recipientAddress: '',
      recipientPostalCode: '',
      discountCode: '',
      totalPrice: 0, 
      deliveryCost: 3,
      discountAmount: 0,
      userName: '', 
      showErrors: false,
    };
  },
  computed: {
    calculateDeliveryCost() {
      if (this.deliveryMethod === 'majas') {
        return 5;
      }
      if (this.selectedPakomats === 'omniva') {
        return 3.10;
      }
      return 3;
    },
    isFormValid() {
      console.log("isLoggedIn:", this.isLoggedIn);
      console.log("deliveryMethod:", this.deliveryMethod);
      console.log("selectedPakomats:", this.selectedPakomats);
      console.log("selectedPakomatsAddress:", this.selectedPakomatsAddress);
      console.log("recipientName:", this.recipientName);
      console.log("recipientSurname:", this.recipientSurname);
      console.log("recipientPhone:", this.recipientPhone);
      console.log("recipientCity:", this.recipientCity);
      console.log("recipientAddress:", this.recipientAddress);
      console.log("recipientPostalCode:", this.recipientPostalCode);

      if (this.isLoggedIn) {
        if (this.deliveryMethod === 'pakomats' && this.selectedPakomats && this.selectedPakomatsAddress) {
          return true;
        } else if (this.deliveryMethod === 'majas' && this.recipientCity && this.recipientAddress && this.recipientPostalCode) {
          return true;
        }
      } else {
        if (this.deliveryMethod === 'pakomats' && this.selectedPakomats && this.selectedPakomatsAddress && this.recipientName && this.recipientSurname && this.recipientPhone) {
          return true;
        } else if (this.deliveryMethod === 'majas' && this.recipientName && this.recipientSurname && this.recipientPhone && this.recipientCity && this.recipientAddress && this.recipientPostalCode) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {
    try {
      this.totalPrice = this.getTotalPriceFromCookie(); 


      try {
        if (typeof Profile !== 'undefined' && Profile.data && typeof Profile.data() === 'function' && Profile.data().user && Profile.data().user.name) {  
          this.userName = Profile.data().user.name;
          this.recipientName = this.userName.split(' ')[0];
          this.recipientSurname = this.userName.split(' ')[1];
          this.recipientPhone = '+371 99999999';
        } else {
          this.isLoggedIn = false;
        }
      } catch (profileError) {
        console.error("Error accessing Profile.vue:", profileError);
        this.isLoggedIn = false; 
      }

    } catch (error) {
      console.error("Error fetching total price from cookie:", error); 
      this.totalPrice = 0;
    }
  },
  watch: {
    isLoggedIn(newVal) {
      if (!newVal) {
        this.selectedPakomats = '';
        this.selectedPakomatsAddress = '';
        this.recipientName = ''; 
        this.recipientSurname = ''; 
        this.recipientPhone = ''; 
      }
    },
    discountCode(newVal) {
      if (newVal.toLowerCase() === 'test') {
        this.isLoggedIn = false;
      } else if (newVal.toLowerCase() === 'skriet2024') {
        this.applyDiscount();
      }
    }
  },
  methods: {


    getTotalPriceFromCookie() {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('totalPrice=')) {
          const price = parseFloat(cookie.substring('totalPrice='.length));
          return isNaN(price) ? 0 : price; 
        }
      }
      return 0; 
    }
  }
};