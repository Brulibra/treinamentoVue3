<template>
  <ModalFactory />
  <router-view />
</template>

<script>
import services from "@/services";
import ModalFactory from "./components/ModalFactory/modal-factory.vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setCurrentUser } from './store/user'

export default {
  components: { ModalFactory },
  setup() {
    const router = useRouter();
    const route = useRoute();
    route.path;

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem("token");
          if (!token) {
            router.push({ name: "Home" });
            return;
          }
          const { data } = await services.users.getMe();
          setCurrentUser(data)
        }
      }
    );
    return {};
  },
};
</script>
