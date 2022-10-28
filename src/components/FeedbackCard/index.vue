<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="feedback-card-container" @click="handleToggle">
    <div class="feedback-card-header">
      <badge :type="feedback.type" />

      <span class="feedback-card-days">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="feedback-card-title">
      {{ feedback.text }}
    </div>

    <div v-if="!state.isOpen" class="flex justify-end mt-8">
      <Icon name="ChevronDown" size="24" :color="brandColors.graydark" />
    </div>

    <div
      v-else
      :class="{ animate__fadeOut: state.isClosing }"
      class="feedback-card-content"
    >
      <div class="feedback-card-content-collum">
        <div class="feedback-card-content-box">
          <span class="feedback-card-content-title"> Página </span>
          <span class="feedback-card-content-text"> {{ feedback.page }} </span>
        </div>

        <div class="feedback-card-content-box">
          <span class="feedback-card-content-title"> Dispositivo </span>
          <span class="feedback-card-content-text">
            {{ feedback.device }}
          </span>
        </div>
      </div>

      <div class="feedback-card-content-collum">
        <div class="feedback-card-content-box">
          <span class="feedback-card-content-title"> Usuário </span>
          <span class="feedback-card-content-text">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-card-container {
  @apply flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray;
}

.feedback-card-header {
  @apply flex items-center justify-between w-full mb-8;
}
.feedback-card-days {
  @apply font-regular text-brand-graydark;
}
.feedback-card-title {
  @apply text-lg font-medium text-gray-800;
}
.feedback-card-content {
  @apply flex mt-8;
  @layer animate__animated animate__fadeIn animate__faster;
}
.feedback-card-content-collum {
  @apply flex flex-col w-1/2;
}
.feedback-card-content-box {
  @apply flex flex-col;
}
.feedback-card-content-title {
  @apply font-bold text-gray-400 uppercase select-none;
}
.feedback-card-content-text {
  @apply font-medium text-gray-700;
}
</style>

<script>
import Icon from "/src/components/Icon";
import Badge from "./feedback-badge.vue";

import { reactive } from "vue";
import { getDiffTimeBetweenCurrentDate } from "@/utils/data.js";
import { wait } from "@/utils/timeOut";
import palette from "../../../palette";

export default {
  components: {
    Badge,
    Icon,
  },

  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true },
  },
  setup(props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened,
    });
    async function handleToggle() {
      state.isClosing = true;
      await wait(250);
      state.isOpen = !state.isOpen;
      state.isClosing = false;
    }
    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand,
    };
  },
};
</script>
