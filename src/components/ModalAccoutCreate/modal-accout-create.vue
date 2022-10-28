<template>
  <div class="modalRegister-header">
    <h1 class="modalRegister-title">Crie uma Conta</h1>
    <button @click="close" class="modalRegister-closeButton">
      &times;
    </button>
  </div>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="modalRegister-label">
        <span class="modalRegister-inputName">Nome</span>
        <input
          v-model="state.name.value"
          type="name"
          class="modalRegister-inputStyle"
          :class="{
            'border-brand-danger': !!state.name.errorMessage,
          }"
          placeholder="your name"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>
      <label class="modalRegister-label">
        <span class="modalRegister-inputName">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          class="modalRegister-inputStyle"
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
      <label class="modalRegister-label">
        <span class="modalRegister-inputName">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          class="modalRegister-inputStyle"
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
        class="modalRegister-signOnButton"
      >
        <icon v-if="state.isLoading" name="Loading" class="animate-spin" />
        <span v-else>Registrar</span>
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

import { validateEmptyAndLength3, validateEmptyAndEmail } from "@/utils/validators";

export default {
  components: {
    Icon,
  },
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      "name",
      validateEmptyAndLength3
    );
    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );
    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
      "password",
      validateEmptyAndLength3
    );

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage,
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function login({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password });
      if (!errors) {
        window.localStorage.setItem("token", data.token);
        router.push({ name: "Feedbacks" });
        modal.close();
      }
      state.isLoading = false;
    }

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value,
          });
          return;
        }


        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao fazer o cadastro");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("Ocorreu um erro ao fazer o cadastro");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
      login,
    };
  },
};
</script>
<style scoped>
  .modalRegister-header {
    @apply flex justify-between;
  }
  .modalRegister-title {
    @apply text-4xl font-black text-gray-800;
  }
  .modalRegister-closeButton {
    @apply text-4xl text-gray-600;
    @apply focus:outline-none;
  }
  .modalRegister-label {
    @apply block mt-9;
  }
  .modalRegister-inputName {
    @apply text-lg font-medium text-gray-800;
  }
  .modalRegister-inputStyle {
    @apply block w-full;
    @apply px-4 py-3 mt-1;
    @apply text-lg;
    @apply bg-gray-100 border-2 border-transparent rounded;
  }
  .modalRegister-signOnButton {
    @apply px-8 py-3 mt-10;
    @apply font-bold text-white;
    @apply rounded-full bg-brand-main;
    @apply focus:outline-none;
    @apply transition-all duration-150;
  }
  </style>