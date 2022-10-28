<template>
  <div class="feedbacks-menu">
    <HeaderLogged />
  </div>

  <div class="feedbacks-header">
    <h1 class="feedbacks-headerTitle">Feedbacks</h1>
    <p class="feedbacks-headerText">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="feedbacks-main">
    <div class="feedbacks-mainGrid">
      <div>
        <h1 class="feedbacks-filtersTitle">Listagem</h1>
        <Suspense>
          <template #default>
            <Filters
              @select="changeFeedbacksType"
              class="feedbacks-filtersList"
            />
          </template>
          <template #fallback>
            <FiltersLoading class="mt-8" />
          </template>
        </Suspense>
      </div>

      <div class="feedbacks-filtersCard">
        <p
          v-if="state.hasError"
          class="feedbacks-filtersText"
        >
          Aconteceu um erro ao carregar os feedbacks 😯
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoading && !state.isLoadingFeedbacks && !state.hasError"
          class="feedbacks-filtersText"
        >
          Ainda nenhum feedback recebido 📝
        </p>
        <feedback-card-loading
          v-if="state.isLoading || state.isLoadingFeedbacks"
        />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, onUnmounted } from "vue";
import services from "@/services";

import HeaderLogged from "@/components/HeaderLogged/header-logged.vue";
import FeedbackCard from "@/components/FeedbackCard/feedback-card.vue";
import FeedbackCardLoading from "@/components/FeedbackCard/feedbackCard-loading.vue";

import Filters from "./feedbacks-filters.vue";
import FiltersLoading from "./filters-loading.vue";

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading,
  },
  setup() {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      feedbacks: [],
      hasError: false,
      currentFeedbackType: "",
      pagination: {
        limit: 5,
        offset: 0,
        total: 0,
      },
    });

    function handleErrors(error) {
      state.isLoading = false;
      state.isLoadingFeedbacks = false;
      state.isLoadingMoreFeedbacks = false;
      state.hasError = !!error;
    }

    async function handleSroll() {
      const isBottomOfWindow =
        Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
        document.documentElement.scrollHeight;

      if (state.isLoading || state.isLoadingMoreFeedbacks) return;
      if (!isBottomOfWindow) return;
      if (state.feedbacks.length >= state.pagination.total) return;
      
        try {
          state.isLoadingMoreFeedbacks = true;
          const { data } = await services.feedbacks.getAll({
            ...state.pagination,
            type: state.currentFeedbackType,
            offset: (state.pagination.offset + 5)
          });

          if (data.results.length) {
            state.feedbacks.push(...data.results);
          }
          state.isLoadingMoreFeedbacks = false;
          state.pagination = data.pagination;
        } catch (error) {
          state.isLoadingMoreFeedbacks = false;
          handleErrors(error);
        }
    }

    async function changeFeedbacksType(type) {
      try {
        state.isLoadingFeedbacks = true;
        state.pagination.offset = 0;
        state.pagination.limit = 5;
        state.currentFeedbackType = type;

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination,
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoadingFeedbacks = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true;

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoading = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    onMounted(() => {
      fetchFeedbacks();
      window.addEventListener("scroll", handleSroll, false);
    });

    onUnmounted(() => {
      fetchFeedbacks();
      window.removeEventListener("scroll", handleSroll, false);
    });

    return {
      state,
      changeFeedbacksType,
      handleSroll,
    };
  },
};
</script>
<style scoped>
  .feedbacks-menu {
  @apply flex;
  @apply justify-center w-full h-28;
  @apply bg-brand-main;
}
.feedbacks-header {
  @apply flex flex-col;
  @apply items-center justify-center h-64;
  @apply bg-brand-gray;
}
.feedbacks-headerTitle {
  @apply text-4xl font-black text-center text-gray-800;
}
.feedbacks-headerText {
  @apply text-lg text-center text-gray-800 font-regular;
}
.feedbacks-main {
  @apply flex;
  @apply justify-center w-full pb-20;
}
.feedbacks-mainGrid{
  @apply grid grid-cols-4 gap-2;
  @apply w-4/5 max-w-6xl py-10;
}
.feedbacks-filtersTitle{
  @apply text-3xl font-black text-black
}
.feedbacks-filtersList{
  @apply mt-8;
  @layer animate__animated animate__fadeIn animate__faster;
}
.feedbacks-filtersCard{
  @apply col-span-3;
  @apply px-10 pt-20;
}
.feedbacks-filtersText{
  @apply text-lg text-center text-gray-800 font-regular
}
</style>