<template>
  <div class="headerLogged-nav">
    <div class="w-28 lg:w-26">
      <img src="@/assets/images/logo_white.png" alt="logo" />
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({ name: 'Credencials' })"
          class="headerLogged-menuItem"
        >
          Credencials
        </li>
        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          class="headerLogged-menuItem"
        >
          Feedbacks
        </li>
        <li @click="handleLogout" class="headerLogged-userName">
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { cleanCurrentUser } from "@/store/user";
import useStore from "@/hooks/useStore";

export default {
  setup() {
    const router = useRouter();
    const store = useStore("User");

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return "...";
      }
      return `${store.currentUser.name}  (sair)`;
    });

    function handleLogout() {
      window.localStorage.removeItem("token");
      cleanCurrentUser();
      router.push({ name: "Home" });
    }

    return {
      router,
      logoutLabel,
      handleLogout,
    };
  },
};
</script>
<style scoped>
.headerLogged-nav {
  @apply flex;
  @apply items-center justify-between;
  @apply w-4/5 max-w-6xl py-10;
}
.headerLogged-menuItem {
  @apply px-6 py-2 mr-2;
  @apply font-bold text-white;
  @apply rounded-full;
  @apply cursor-pointer focus:outline-none;
}
.headerLogged-userName {
  @apply px-6 py-2 mr-2;
  @apply font-bold text-brand-main;
  @apply bg-white rounded-full;
  @apply cursor-pointer focus:outline-none;
}
</style>
