<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span
    :class="classColor.bg"
    class="p-2 text-xs font-black text-white uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>

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
        const bg = {bg: "brand-danger"}
        return bg;
      }
      if (props.type === "IDEA") {
        const bg = {bg: "brand-warning"}
        return bg
      }
      const bg = {bg: "brand-graydark"}
        return bg
    });

    return {
      label,
      classColor,
    };
  },
};
</script>
