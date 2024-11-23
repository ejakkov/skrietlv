import SubNavBar from "@/components/SubNavbar.vue";
import Footer from "@/components/Footer.vue";
export default {
    components: {
      SubNavBar,
      Footer,
    },
    name: "LikedItems",
    data() {
        return {
        likedItems: [], 
        loading: true,
        };
    },
    methods: {
        fetchLikedItems() {
            const savedItems = localStorage.getItem("likedItems");
            this.likedItems = savedItems ? JSON.parse(savedItems) : [];
            this.loading = false;
        },
        unlikeItem(itemId) {
            this.likedItems = this.likedItems.filter((item) => item._id !== itemId);
            localStorage.setItem("likedItems", JSON.stringify(this.likedItems));
        },
    },
    mounted() {
        this.fetchLikedItems(); 
    },
};
