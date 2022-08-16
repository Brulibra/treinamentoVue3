<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <CustomHeader @create-accout="handleAccoutCreate" @login="handleLogin" />
  <Contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="front-medium text-center text-gray-800">feedbacker© 2022</p>
  </div>
</template>

<script>
import CustomHeader from "./CustomHead.vue";
import Contact from "./Contact.vue";
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
