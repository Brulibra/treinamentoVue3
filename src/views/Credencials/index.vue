<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>
  <!-- <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <div v-if="!state.isLate.late">
      {{ lateInvoice }}
    </div>
    <div v-else>
      {{ openInvouce }}
  </div>
    </div> -->
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text center text-gray-800">Credenciais</h1>
    <p class="text-large text-center text-gray-800 font-regular">
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
        <span class="">{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-5">
          <icon
            name="copy"
            :color="_brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
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
        <pre>
      &lt;script src="http://Brulibra-feedbacker-widget.netfly.app?apiKey{{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;
      </pre
        >
      </div>
    </div>
  </div>
</template>
<script>
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import Icon from "@/components/Icons";
import useStore from "@/hooks/useStore";
import palette from "../../../palette";
import ContentLoader from "../../components/ContentLoader/index.vue";
// import { reactive } from "vue";
export default {
  components: { HeaderLogged, Icon, ContentLoader },

  setup() {
    const store = useStore();

    // const lateInvoice = "Este é um boleto atrasado";
    // const openInvouce = "Este é um boleto em aberto";
    // const state = reactive({
    //   isLate: false,
    //   isOpen: false,
    //   late: {
    //     lateInvoice,
    //   },
    //   open: {
    //     openInvouce,
    //   },
    // });
    return {
      store,
      _brandColors: palette.brand,
      // state,
      // lateInvoice,
      // openInvouce,
    };
  },
};
</script>
