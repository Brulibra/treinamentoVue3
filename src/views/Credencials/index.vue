<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-black">Instalação e configuração</h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esse aqui é a sua chave de api
      </p>

      <ContentLoader
        v-if="store.Global.isLoadin || state.isLoadin"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasErrors">Erro ao carregar a apiKey</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>

        <div v-if="!state.hasErrors" class="flex ml-20 mr-5">
          <icon
          @click="handleCopy"
            name="copy"
            :color="_brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApikey"
            name="loading"
            :color="_brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <ContentLoader
        v-if="store.Global.isLoadin || state.isLoadin"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-1 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasErrors">Erro ao carregar o script</span>
        <pre v-else>
&lt;script src="http://Brulibra-feedbacker-widget.netlify.app?api_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import palette from "../../../palette";

import { setApiKey } from "@/store/user";
import services from "@/services";
import useStore from "@/hooks/useStore";

import Icon from "@/components/Icon";
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import ContentLoader from "../../components/ContentLoader/index.vue";

export default {
  components: { HeaderLogged, Icon, ContentLoader },

  setup() {
    const store = useStore();
    const toast = useToast();
    const state = reactive({
      hasErrors: false,
      isLoadin: false,
    });

    watch(
      () => store.Global.isLoadin,
      () => {
        if (!store.User.currentUser.apiKey) {
          handleError(true);
        }
      }
    );

    function handleError(error) {
      state.isLoadin = false;
      state.hasErrors = !!error;
    }

    async function handleGenerateApikey() {
      try {
        state.isLoadin = true;
        const { data } = await services.users.generateApiKey();

        setApiKey(data.apiKey);
        state.isLoadin = false;
      } catch (error) {
        handleError(error);
      }
    }

    async function handleCopy() {
      toast.clear();
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey);
        toast.success("Copiado");
      } catch (error) {
        handleError(error);
      }
    }

    return {
      state,
      store,
      _brandColors: palette.brand,
      handleGenerateApikey,
      handleCopy,
    };
  },
};
</script>
