<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
    Entre na sua Conta
    </h1>

    <button @click="close" class="text-4xl text-gray-600"> &times; </button>
  </div>
</template>
<script>
import useModal from "@/hooks/useModal";
import { reactive } from "vue";
export default {
  setup() {
    const modal = useModal()
    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: "",
        errorMessage: "",
      },
      password: {
        value: "",
        errorMessage: "",
      },
    });
    return {
      state,
      close: modal.close
    };
  },
};
</script>
