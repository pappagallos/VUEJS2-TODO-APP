<template>
  <transition>
    <div class="modal">
      <svg
        viewBox="0 0 496.096 496.096"
        class="btn-svg-close"
        @click="closeTodoModal"
      >
        <g>
          <g>
            <path
              d="M259.41,247.998L493.754,13.654c3.123-3.124,3.123-8.188,0-11.312c-3.124-3.123-8.188-3.123-11.312,0L248.098,236.686
			L13.754,2.342C10.576-0.727,5.512-0.639,2.442,2.539c-2.994,3.1-2.994,8.015,0,11.115l234.344,234.344L2.442,482.342
			c-3.178,3.07-3.266,8.134-0.196,11.312s8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248.098,259.31
			l234.344,234.344c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.41,247.998z"
            />
          </g>
        </g>
      </svg>

      <div class="modal-contents">
        <p class="todo-topic">{{ todoData.todo_title }}</p>
        <p class="todo-detail">{{ todoData.todo_contents }}</p>
        <p class="todo-time">{{ filterTodoTime(todoData.todo_time) }}</p>
      </div>

      <div class="modal-btn">
        <button class="btn-close" @click="closeTodoModal">닫기</button>
      </div>
    </div>
  </transition>
</template>

<script>
import eventBus from "@/utils/eventBus";

export default {
  props: ["todoData"],

  created() {
    this.filterTodoTime();
  },

  methods: {
    closeTodoModal() {
      eventBus.$emit("viewTodoModal:closeModal");
    },

    filterTodoTime() {
      const time = this.todoData.todo_time;
      const date = new Date(time);

      return `${date.getFullYear()}년 ${date.getMonth() +
        1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    }
  }
};
</script>

<style scoped lang="scss">
.modal-btn {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;

  button {
    width: 100%;
    border: none;
    padding: 17px 0;
    font-size: 1.8rem;
    font-weight: 500;
    outline: none;
  }

  .btn-close {
    background-color: #c3c3c3;
    color: #fff;
  }

  .btn-submit {
    background-color: #2a87ff;
    color: #fff;
  }
}

.modal {
  position: absolute;
  width: 90%;
  min-height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 10px 40px rgba($color: #000000, $alpha: 0.15);

  .todo-topic {
    font-size: 2.4rem;
    font-weight: 600;
    margin-top: -4px;
    max-width: 86%;
  }

  .todo-time {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 60px;
    color: #565656;
  }

  .todo-detail {
    font-size: 2rem;
    font-weight: 400;
    margin-top: 10px;
    color: #565656;
  }

  .btn-svg-close {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 20px;
    height: 20px;
  }
}
</style>