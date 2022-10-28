<template>
  <CustomHeader @create-accout="handleAccoutCreate" @login="handleLogin" />
  <Contact />
  <div class="footer">
    <p class="footer-content">feedbacker© 2022</p>
  </div>
</template>

<script>
import CustomHeader from "./custom-head.vue";
import Contact from "./home-contact.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useModal from "../../hooks/useModal";

export default {
  components: {
    CustomHeader,
    Contact,
  },
  setup() {
    const router = useRouter();
    const modal = useModal();

    onMounted(() => {
      const token = window.localStorage.getItem("token");
      if (token) {
        router.push({ name: "Feedbacks" });
      }
    });

    function handleLogin() {
      modal.open({
        component: "ModalLogin",
      });
    }
    function handleAccoutCreate() {
      modal.open({
        component: "ModalAccouCreate",
      });
    }

    return {
      handleLogin,
      handleAccoutCreate,
    };
  },
};
</script>

<style scoped>
.footer {
  @apply flex justify-center;
  @apply py-10 bg-brand-gray;
}
.footer-content {
  @apply font-medium text-center text-gray-800;
}
</style>
