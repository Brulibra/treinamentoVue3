<template>
  <div class="contact-container">
    <div class="contact-content">
      <h1 class="contact-title">Alguma dúvida</h1>
      <p class="contact-text">
        Quer saber melhor como funciona e quais são os preços?
      </p>
      <div class="mt-10">
        <a href="mailto:" class="contact-emailLink">Nos mande um email</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.contact-container {
  @apply flex justify-center w-full;
}
.contact-content {
  @apply flex flex-col items-center;
  @apply w-4/5 max-w-6xl m-16;
}
.contact-title {
  @apply text-4xl font-black text-center text-gray-800;
}
.contact-text {
  @apply text-lg text-center text-gray-800 font-regular;
}
.contact-emailLink {
  @apply px-6 py-2 mt-10;
  @apply font-bold text-white bg-brand-main;
  @apply rounded-full;
  @apply focus:outline-none;
}
</style>
