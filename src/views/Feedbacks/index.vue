<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-col-4 gap-2">
      <div>
        <h1 class="text-3xl font-black">Listagem</h1>
        <suspense>
          <template #default>
            <Filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <FiltersLoading class="mt-8" />
          </template>
        </suspense>
      </div>
      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks 😯
        </p>
        <p
          v-if="state.feedbacks.length && !state.isLoading"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback recebido 📝
        </p>
        <FeedbackCardLoading v-if="state.isLoading" />
        <FeedbackCard
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import Filters from "./Filters.vue";
import FiltersLoading from "./FiltersLoading.vue";
import FeedbackCard from "@/components/FeedbackCard";
import FeedbackCardLoading from "@/components/FeedbackCard/Loading";
import services from "@/services";

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
      hasError: false,
      feedbacks: [],
    });

    function handleErrors(error) {
      state.isLoading = false
      state.isLoadingFeedbacks = false
      state.isLoadingMoreFeedback = false
      state.hasError = !!error
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true;

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
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
    });

    return {
      state,
    };
  },
};
</script>
