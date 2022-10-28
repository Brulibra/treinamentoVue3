<template>
  <div class="modalLogin-header">
    <h1 class="modalLogin-title">Entre na sua Conta</h1>
    <button @click="close" class="modalLogin-closeButton">&times;</button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="modalLogin-label">
        <span class="modalLogin-inputName">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          class="modalLogin-inputStyle"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          placeholder="your.email@email.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>
      <label class="modalLogin-label">
        <span class="modalLogin-inputName">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          class="modalLogin-inputStyle"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          placeholder="your password"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>
      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading,
        }"
        class="modalLogin-signInButton"
      >
        <icon v-if="state.isLoading" name="Loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import Icon from "../Icon/icons-index.vue";
import useModal from "@/hooks/useModal";
import services from "@/services";

import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "@/utils/validators";

export default {
  components: {
    Icon,
  },
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );
    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField("password", validateEmptyAndLength3);

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem("token", data.token);
          router.push({ name: "Feedbacks" });
          modal.close();
          return;
        }

        if (errors.status === 404) {
          toast.error("E-mail não encontrado");
        }

        if (errors.status === 401) {
          toast.error("E-mail ou Senha inválido");
        }

        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao fazer o login");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("Ocorreu um erro ao fazer o login");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
.modalLogin-header {
  @apply flex justify-between;
}
.modalLogin-title {
  @apply text-4xl font-black text-gray-800;
}
.modalLogin-closeButton {
  @apply text-4xl text-gray-600;
  @apply focus:outline-none;
}
.modalLogin-label {
  @apply block mt-9;
}
.modalLogin-inputName {
  @apply text-lg font-medium text-gray-800;
}
.modalLogin-inputStyle {
  @apply block w-full;
  @apply px-4 py-3 mt-1;
  @apply text-lg;
  @apply bg-gray-100 border-2 border-transparent rounded;
}
.modalLogin-signInButton {
  @apply px-8 py-3 mt-10;
  @apply font-bold text-white;
  @apply rounded-full bg-brand-main;
  @apply focus:outline-none;
  @apply transition-all duration-150;
}
</style>
