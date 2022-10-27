<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span :class="`bg-${classColor}`" class="badge">
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  @apply p-2 text-xs font-black text-white uppercase rounded-full;
}
</style>

<script>
import { computed } from "vue";
export default {
  props: {
    type: { type: String, required: true },
  },
  setup(props) {
    const label = computed(() => {
      if (props.type === "ISSUE") {
        return "problema";
      }
      if (props.type === "IDEA") {
        return "ideia";
      }
      return "outros";
    });

    const classColor = computed(() => {
      if (props.type === "ISSUE") {
        return "brand-danger";
      }
      if (props.type === "IDEA") {
        return "brand-warning";
      }
      return "brand-graydark";
    });

    return {
      label,
      classColor,
    };
  },
};
</script>
