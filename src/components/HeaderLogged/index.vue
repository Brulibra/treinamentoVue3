<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-26">
      <img src="@/assets/images/logo_white.png" alt="logo" />
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({ name: 'Credencials' })"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
        >
          Credencials
        </li>
        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>
        <li
          @click="handleLogout"
          class="px-6 py-2 mr-2 font-bold bg-white rounded-full text-brand-main cursor-pointer focus:outline-none"
        >
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
      return `${store.currentUser.name} (sair)`;
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
