<template>
  <div>
    <p class="date">
      {{ cursorMonth }}월 {{ cursorDate }}일 {{ cursorDay }}요일
    </p>

    <div class="todo-list">
      <div class="todo-item" v-for="(todo, index) in todoList" :key="index">
        <div class="item-header" @click="triggerCheckTodo(index, todo.todo_id)">
          <svg
            viewBox="0 0 474.8 474.801"
            :class="{
              'todo-checkbox': true,
              'todo-complete': isTodoComplete(index)
            }"
          >
            <g>
              <g>
                <path
                  d="M396.283,257.097c-1.14-0.575-2.282-0.862-3.433-0.862c-2.478,0-4.661,0.951-6.563,2.857l-18.274,18.271
			c-1.708,1.715-2.566,3.806-2.566,6.283v72.513c0,12.565-4.463,23.314-13.415,32.264c-8.945,8.945-19.701,13.418-32.264,13.418
			H82.226c-12.564,0-23.319-4.473-32.264-13.418c-8.947-8.949-13.418-19.698-13.418-32.264V118.622
			c0-12.562,4.471-23.316,13.418-32.264c8.945-8.946,19.7-13.418,32.264-13.418H319.77c4.188,0,8.47,0.571,12.847,1.714
			c1.143,0.378,1.999,0.571,2.563,0.571c2.478,0,4.668-0.949,6.57-2.852l13.99-13.99c2.282-2.281,3.142-5.043,2.566-8.276
			c-0.571-3.046-2.286-5.236-5.141-6.567c-10.272-4.752-21.412-7.139-33.403-7.139H82.226c-22.65,0-42.018,8.042-58.102,24.126
			C8.042,76.613,0,95.978,0,118.629v237.543c0,22.647,8.042,42.014,24.125,58.098c16.084,16.088,35.452,24.13,58.102,24.13h237.541
			c22.647,0,42.017-8.042,58.101-24.13c16.085-16.084,24.134-35.45,24.134-58.098v-90.797
			C402.001,261.381,400.088,258.623,396.283,257.097z"
                />
                <path
                  d="M467.95,93.216l-31.409-31.409c-4.568-4.567-9.996-6.851-16.279-6.851c-6.275,0-11.707,2.284-16.271,6.851
			L219.265,246.532l-75.084-75.089c-4.569-4.57-9.995-6.851-16.274-6.851c-6.28,0-11.704,2.281-16.274,6.851l-31.405,31.405
			c-4.568,4.568-6.854,9.994-6.854,16.277c0,6.28,2.286,11.704,6.854,16.274l122.767,122.767c4.569,4.571,9.995,6.851,16.274,6.851
			c6.279,0,11.704-2.279,16.274-6.851l232.404-232.403c4.565-4.567,6.854-9.994,6.854-16.274S472.518,97.783,467.95,93.216z"
                />
              </g>
            </g>
          </svg>
          <span
            :class="{
              'todo-title': true,
              'todo-complete': isTodoComplete(index)
            }"
          >
            {{ todo.todo_title }}
          </span>
          <span class="todo-time">{{ filterTodoTime(todo.todo_time) }}</span>
        </div>
        <div class="underline"></div>
        <div class="item-footer">
          <button @click="selectViewTodo(index)">
            <span class="btn-view">
              <svg viewBox="0 0 24 24">
                <path
                  d="m23.752 10.747c-1.951-4.706-6.564-7.747-11.752-7.747s-9.801 3.041-11.752 7.747c-.33.796-.33 1.709 0 2.506 1.951 4.706 6.564 7.747 11.752 7.747s9.801-3.041 11.752-7.747c.33-.796.33-1.71 0-2.506zm-11.752 5.253c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"
                />
              </svg>
            </span>
          </button>
          <button @click="selectEditTodo(index)">
            <span class="btn-edit">
              <svg viewBox="0 0 511.999 511.999">
                <g>
                  <g>
                    <path
                      d="M506.012,111.514L400.481,5.984c-7.979-7.973-20.888-7.979-28.868-0.014L39.363,337.547
			c-2.676,2.669-4.562,6.032-5.44,9.709L0.562,486.828c-1.648,6.897,0.409,14.168,5.426,19.186
			c3.874,3.874,9.089,5.985,14.441,5.985c1.586,0,3.18-0.191,4.745-0.565l139.573-33.361c3.677-0.878,7.04-2.757,9.709-5.44
			l331.57-332.251C513.991,132.403,513.985,119.48,506.012,111.514z M149.632,439.687L48.03,463.973l24.279-101.602L386.034,49.299
			l76.67,76.67L149.632,439.687z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <rect
                      x="340.418"
                      y="76.048"
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.1875 299.421)"
                      width="40.843"
                      height="150.192"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <rect
                      x="52.658"
                      y="258.373"
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -128.8402 246.5416)"
                      width="361.047"
                      height="40.843"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <rect
                      x="85.448"
                      y="331.51"
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -256.1682 193.8131)"
                      width="40.843"
                      height="149.239"
                    />
                  </g>
                </g>
              </svg>
            </span>
          </button>
          <button @click="deleteTodo(todo.todo_id)">
            <span class="btn-delete">
              <svg viewBox="-40 0 427 427.00131">
                <path
                  d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
                />
                <path
                  d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
                />
                <path
                  d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
                />
                <path
                  d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- TODO 추가 버튼 -->
    <button type="button" @click="triggerAddTodo" class="btn-add-todo">
      <svg viewBox="0 0 426.66667 426.66667">
        <path
          d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"
        />
      </svg>
    </button>

    <div class="view-modal-background" v-show="isShowViewTodoModal === true">
      <view-todo-modal :todoData="selectedTodoItem"></view-todo-modal>
    </div>

    <div class="add-modal-background" v-show="isShowAddTodoModal === true">
      <add-todo-modal></add-todo-modal>
    </div>

    <div class="edit-modal-background" v-show="isShowEditTodoModal === true">
      <edit-todo-modal :editTodoData="selectedTodoItem"></edit-todo-modal>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import eventBus from "@/utils/eventBus";
import { getTodoList, deleteTodo, checkTodo } from "@/apis/todo";
import ViewTodoModal from "@/components/modal/ViewTodoModal.vue";
import AddTodoModal from "@/components/modal/AddTodoModal.vue";
import EditTodoModal from "@/components/modal/EditTodoModal.vue";

export default {
  data() {
    return {
      todoList: [],
      selectedTodoItem: [],
      isShowViewTodoModal: false,
      isShowAddTodoModal: false,
      isShowEditTodoModal: false
    };
  },

  created() {
    this.fetchTodoList();

    eventBus.$on("addTodoList", async () => {
      await this.fetchTodoList();
    });

    eventBus.$on("viewTodoModal:closeModal", () => {
      this.isShowViewTodoModal = false;
    });

    eventBus.$on("addTodoModal:closeModal", () => {
      this.isShowAddTodoModal = false;
    });

    eventBus.$on("editTodoModal:closeModal", () => {
      this.isShowEditTodoModal = false;
    });

    eventBus.$on("editTodoList:update", async () => {
      await this.fetchTodoList();
    });
  },

  watch: {
    async cursorDate() {
      try {
        await this.fetchTodoList();
      } catch (error) {
        console.error(error);
      }
    },

    isShowViewTodoModal(e) {
      const body = window.document.body;

      if (e === true) {
        this.isShowViewTodoModal = true;

        const scrollY = window.scrollY;
        const modalObj = window.document.body.querySelector(
          ".view-modal-background"
        );
        modalObj.style.position = "absolute";
        modalObj.style.top = scrollY + "px";

        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    },

    isShowAddTodoModal(e) {
      const body = window.document.body;

      if (e === true) {
        this.isShowAddTodoModal = true;

        const scrollY = window.scrollY;
        const modalObj = window.document.body.querySelector(
          ".add-modal-background"
        );
        modalObj.style.position = "absolute";
        modalObj.style.top = scrollY + "px";

        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    },

    isShowEditTodoModal(e) {
      const body = window.document.body;

      if (e === true) {
        this.isShowEditTodoModal = true;

        const scrollY = window.scrollY;
        const modalObj = window.document.body.querySelector(
          ".edit-modal-background"
        );
        modalObj.style.position = "absolute";
        modalObj.style.top = scrollY + "px";

        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  },

  components: {
    ViewTodoModal,
    AddTodoModal,
    EditTodoModal
  },

  methods: {
    async deleteTodo(todoId) {
      try {
        const todoData = {
          todoId: todoId
        };
        await deleteTodo(todoData);
        await this.fetchTodoList();
      } catch (error) {
        console.error(error);
      }
    },

    triggerViewTodo() {
      this.isShowViewTodoModal = true;
    },

    triggerAddTodo() {
      this.isShowAddTodoModal = true;
    },

    triggerEditTodo() {
      this.isShowEditTodoModal = true;
    },

    async fetchTodoList() {
      try {
        const todoData = {
          userId: this.userId,
          todoDate: `${this.cursorYear}-${this.cursorMonth}-${this.cursorDate}`
        };

        const { data } = await getTodoList(todoData);
        this.todoList = data.data;
      } catch (error) {
        console.error(error);
      }
    },

    filterTodoTime(todoTime) {
      const date = new Date(todoTime);
      const todoData = {
        todoType: ["오전", "오후"],
        todoHours: date.getHours(),
        todoMinutes: date.getMinutes()
      };

      if (todoData.todoHours < 10) {
        todoData.todoHours = `0${todoData.todoHours}`;
      }
      if (todoData.todoMinutes < 10) {
        todoData.todoMinutes = `0${todoData.todoMinutes}`;
      }

      const time =
        todoData.todoHours < 12
          ? `${todoData.todoType[0]} ${todoData.todoHours}시 ${todoData.todoMinutes}분`
          : `${todoData.todoType[1]} ${todoData.todoHours}시 ${todoData.todoMinutes}분`;

      return time;
    },

    async triggerCheckTodo(index, todoId) {
      try {
        let status;
        if (this.todoList[index].todo_status === 0) {
          status = 1;
        } else if (this.todoList[index].todo_status === 1) {
          status = 0;
        }

        const todoData = {
          todoId: todoId,
          todoStatus: status
        };

        await checkTodo(todoData);
        await this.fetchTodoList();
      } catch (error) {
        console.error(error);
      }
    },

    isTodoComplete(index) {
      if (this.todoList[index].todo_status === 0) {
        // todo_status 가 0일 경우에는 아직 진행중인 일로 간주
        return false;
      } else if (this.todoList[index].todo_status === 1) {
        // todo_status 가 1일 경우에는 완료된 할 일으로 간주
        return true;
      }
    },

    selectViewTodo(index) {
      this.selectedTodoItem = this.todoList[index];
      this.triggerViewTodo();
    },

    selectEditTodo(index) {
      this.selectedTodoItem = this.todoList[index];
      this.triggerEditTodo();
      eventBus.$emit("editTodoModal:openModal", this.selectedTodoItem);
    }
  },

  computed: {
    cursorYear() {
      return store.state.cursor.year;
    },

    cursorMonth() {
      return store.state.cursor.month;
    },

    cursorDate() {
      return store.state.cursor.date;
    },

    cursorDay() {
      return store.state.dayList[store.state.cursor.day];
    },

    userId() {
      return store.state.user.id;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/common/_colors.scss";

.date {
  font-size: 2.5rem;
  font-weight: 700;
  color: $text-basic-color;
  margin-bottom: 15px;
}

.todo-item {
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba($color: #000000, $alpha: 0.1);

  .item-header {
    display: grid;
    grid-template-columns: 35px auto auto;
    align-items: center;

    input {
      display: none;
    }

    .todo-complete {
      text-decoration: line-through !important;
      fill: #2987ff !important;
    }

    .todo-title {
      font-size: 2rem;
      font-weight: 500;
      color: #273a52;
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .todo-checkbox {
      width: 25px;
      height: 25px;
      fill: #d6d6d6;
      margin-right: 10px;
    }

    .todo-time {
      font-size: 1.5rem;
      font-weight: 500;
      color: #b1b1b1;
      text-align: right;
    }
  }

  .item-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;

    button {
      border: none;
      background: none;
      margin: 0;
      padding: 0;
    }

    .btn-delete,
    .btn-view,
    .btn-edit {
      svg {
        width: 20px;
        height: 20px;
      }
    }

    .btn-delete {
      svg {
        fill: #c72626;
      }
    }

    .btn-view {
      svg {
        fill: #b1b1b1;
      }
    }

    .btn-edit {
      svg {
        fill: #2987ff;
      }
    }
  }

  .underline {
    margin: 10px 0;
    border-top: 1px solid #eee;
  }
}

.btn-add-todo {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  background: #2987ff;
  outline: none;

  svg {
    fill: #fff;
    width: 3rem;
    height: 3rem;
  }
}

.view-modal-background,
.add-modal-background,
.edit-modal-background {
  position: absolute;
  z-index: 99;
  width: 100%;
  min-height: 100vh;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
}
</style>