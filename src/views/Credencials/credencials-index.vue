<template>
  <div class="credencials-menu">
    <HeaderLogged />
  </div>

  <div class="credencials-header">
    <h1 class="credencials-headerTitle">Credenciais</h1>
    <p class="mt-10 credencials-headerText">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="credencials-main">
    <div class="credencials-mainContent">
      <h1 class="credencials-mainTitle">Instalação e configuração</h1>
      <p class="mt-10 credencials-mainText">Esse aqui é a sua chave de api</p>

      <ContentLoader
        v-if="store.Global.isLoadin || state.isLoadin"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div v-else class="credencials-mainApikey">
        <span v-if="state.hasErrors">Erro ao carregar a apiKey</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>

        <div v-if="!state.hasErrors" class="credencials-icons">
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

      <p class="mt-5 credencials-mainText">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <ContentLoader
        v-if="store.Global.isLoadin || state.isLoadin"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div v-else class="credencials-mainScript">
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
import HeaderLogged from "@/components/HeaderLogged/header-logged.vue";
import ContentLoader from "../../components/ContentLoader/content-loader.vue";

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
<style scoped>
.credencials-menu {
  @apply flex;
  @apply justify-center w-full h-28;
  @apply bg-brand-main;
}
.credencials-header {
  @apply flex flex-col;
  @apply items-center justify-center h-64;
  @apply bg-brand-gray;
}
.credencials-headerTitle {
  @apply text-4xl font-black text-center text-gray-800;
}
.credencials-headerText {
  @apply text-lg text-center text-gray-800 font-regular;
}
.credencials-main {
  @apply flex;
  @apply justify-center w-full h-full;
}
.credencials-mainContent {
  @apply flex flex-col;
  @apply w-4/5 max-w-6xl py-10;
}
.credencials-mainTitle {
  @apply text-3xl font-black text-black;
}
.credencials-mainText {
  @apply text-lg text-gray-800 font-regular;
}
.credencials-mainApikey {
  @apply flex;
  @apply justify-between items-center py-3 pl-5 mt-2 w-full lg:w-1/2;
  @apply rounded bg-brand-gray;
}
.credencials-icons {
  @apply flex ml-20 mr-5;
}
.credencials-mainScript {
  @apply py-1 pl-5 pr-20 mt-2 w-full lg:w-2/3;
  @apply rounded bg-brand-gray;
  @apply overflow-x-scroll;
}
</style>
