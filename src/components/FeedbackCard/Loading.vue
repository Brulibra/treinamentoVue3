<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ContentLoader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2s"
    />
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.3s"
    />
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animation-duration="2.7s"
    />
  </ContentLoader>
</template>
<script>
import ContentLoader from "@/components/ContentLoader/index.vue";
export default {
  components: { ContentLoader },
};
</script>
