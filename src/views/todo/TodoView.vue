<template>
  <div class="todo-wrapper">
    <div class="todo-controller">
      <todo-header></todo-header>
      <select-todo-type></select-todo-type>
      <todo-calendar></todo-calendar>
    </div>
    <div class="todo-list">
      <todo-list></todo-list>
    </div>
  </div>
</template>

<script>
import TodoHeader from "@/components/common/TodoHeader.vue";
import SelectTodoType from "@/components/todo/SelectTodoType.vue";
import TodoCalendar from "@/components/todo/TodoCalendar.vue";
import TodoList from "@/components/todo/TodoList.vue";
import store from "@/store";

export default {
  methods: {
    openAddTodoModal() {
      store.commit("MUT_UPDATE_ADD_TODO_MODAL_FLAG", true);
    }
  },

  components: {
    TodoCalendar,
    SelectTodoType,
    TodoHeader,
    TodoList
  }
};
</script>

<style scoped lang="scss">
.todo-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
}

.todo-controller {
  background-color: #fff;
  padding-bottom: 2rem;
}

.todo-list {
  padding: 20px 30px 100px 30px;
  background-color: #f9f9f9;
}
</style>