<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1></h1>
</template>
<script>
import { computed } from "vue";
export default {
  props: {
    maxWidth: {
      default: 100,
      type: Number,
    },
    minWidth: {
      default: 100,
      type: Number,
    },
    animationDuration: {
      default: "1.6s",
      type: String,
    },
    height: {
      default: "1rem",
      type: String,
    },
    width: {
      default: "1rem",
      type: String,
    },
  },
  setup(props) {
    const computedWidth = computed(() => {
      const value = Math.random() * (props.width - props.minWidth);
      return props.width ?? `${Math.floor(value + props.minWidth)}`;
    });

    return {
      computedWidth,
    };
  },
};
</script>
