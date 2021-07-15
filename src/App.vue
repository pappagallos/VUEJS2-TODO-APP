<template>
  <div>
    <div class="background" v-show="modalFlag">
      <modal></modal>
    </div>
    <div class="background" v-show="isShowAddTodoModal">
      <add-todo-modal></add-todo-modal>
    </div>
    <router-view to="/"></router-view>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AddTodoModal from "@/components/modal/AddTodoModal.vue";
import store from "@/store";

export default {
  computed: {
    modalFlag: {
      get() {
        return store.state.modal.flag;
      },
      set(value) {
        store.commit("MUT_UPDATE_MODAL_FLAG", value);
      }
    },
    isShowAddTodoModal: {
      get() {
        return store.state.modal.isShowAddTodoModal;
      },
      set(value) {
        store.commit("MUT_UPDATE_ADD_TODO_MODAL_FLAG", value);
      }
    }
  },
  components: {
    Modal,
    AddTodoModal
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/_import.scss";

.background {
  position: absolute;
  z-index: 99;
  width: 100%;
  min-height: 100vh;
  backdrop-filter: blur(20px);
}
</style>