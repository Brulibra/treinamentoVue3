<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="header">
    <div class="header-group">
      <div class="header-login">
        <div class="w-28 lg:w-36">
          <img class="w-full" src="../../assets/images/logo_white.png" alt="logo" />
        </div>
        <div class="flex">
          <button @click="() => emit('create-accout')" class="header-createAccoutButton">
            Crie uma Conta
          </button>
          <button @click="() => emit('login')" class="header-loginButton">Entrar</button>
        </div>
      </div>
      <div class="header-content">
        <h1 class="header-mainText">
          Tenha um feedback <br />
          E faça seus clientes mais <br class="hidden lg:inline-block" />
          felizes!
        </h1>
        <p class="header-text">
          Receba ideias, reclamações e feedbacks com um
          <br class="hidden lg:inline-block" />
          simples widget na página.
        </p>
        <div>
          <button @click="() => emit('create-accout')" class="header-freeAccoutButton">
            Crie uma conta grátis
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup(_, { emit }) {
    return {
      emit,
    };
  },
};
</script>

<style scoped>
.header {
  @apply flex justify-center;
  @apply w-full;
  @apply bg-brand-main;
  height: 700px;
}
.header-group {
  @apply flex flex-col;
  @apply w-4/5 max-w-6xl;
}
.header-login {
  @apply flex items-center justify-between py-10;
}
.header-createAccoutButton {
  @apply px-6 py-2;
  @apply font-bold text-white;
  @apply rounded-full;
  @apply focus:outline-none;
}
.header-loginButton {
  @apply px-6 py-2;
  @apply font-bold text-brand-main;
  @apply bg-white rounded-full;
  @apply focus:outline-none;
}
.header-content {
  @apply flex flex-col mt-28;
}

.header-mainText {
  @apply text-4xl font-black text-white;
}

.header-text {
  @apply text-lg font-medium text-white;
}
.header-freeAccoutButton {
  @apply mt-10 px-6 py-2;
  @apply font-bold  text-brand-main;
  @apply bg-white rounded-full;
  @apply focus:outline-none;
}

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue_balloons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
