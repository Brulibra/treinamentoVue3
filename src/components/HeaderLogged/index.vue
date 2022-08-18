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
          class="px-6 py-2 mr-2 font-bold bg-white rounded-full text-brand-main cursor-pointer focus:outline-none"
        >
          <!-- {{loggoutLabel}} -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return {
      router,
    //   loggoutLabel
    };
  },
};
</script>
