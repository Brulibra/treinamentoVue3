<template>
  <component :is="name" v-bind="$props" />
</template>
<script>
import Loading from "./loading-icon.vue";
import Copy from "./copy-icon.vue";
import ChevronDown from "./chevron-down.vue";
export default {

  components: { Loading, Copy, ChevronDown },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
