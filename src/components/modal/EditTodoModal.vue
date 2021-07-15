<template>
  <transition>
    <div class="modal">
      <svg
        viewBox="0 0 496.096 496.096"
        @click="closeTodoModal"
        class="btn-svg-close"
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

      <p class="title">할 일 수정하기</p>
      <div class="label">
        <label for="topic">
          <span class="name">할 일</span>
          <input type="text" id="topic" v-model="todoTitle" />
        </label>
      </div>

      <div class="label">
        <label for="description">
          <span class="name">할 일 내용</span>
          <input type="text" id="description" v-model="todoContent" />
        </label>
      </div>

      <div class="label">
        <span class="name">시간</span>
        <div class="cursor-date-form">
          <ul>
            <li>
              <input
                type="text"
                class="cursor-date year"
                disabled
                :value="cursorYear"
              />
            </li>
            <li>년</li>
            <li>
              <input
                type="text"
                class="cursor-date month"
                disabled
                :value="cursorMonth"
              />
            </li>
            <li>월</li>
            <li>
              <input
                type="text"
                class="cursor-date day"
                disabled
                :value="cursorDate"
              />
            </li>
            <li>일</li>
            <li>
              <select id="hour" class="cursor-date" v-model="todoHour">
                <option
                  v-for="(hour, index) in 24"
                  :key="index"
                  :value="hour - 1"
                  >{{ hour - 1 }}</option
                >
              </select>
            </li>
            <li>시</li>
            <li>
              <select id="minute" class="cursor-date" v-model="todoMinute">
                <option
                  v-for="(minute, index) in [
                    '00',
                    '10',
                    '20',
                    '30',
                    '40',
                    '50'
                  ]"
                  :key="index"
                  :value="minute"
                  >{{ minute }}</option
                >
              </select>
            </li>
            <li>분</li>
          </ul>
        </div>
      </div>

      <div class="label">
        <span class="name">알람</span>
        <div class="alarm-list">
          <ul>
            <label for="alarm-0">
              <li>
                <input
                  type="checkbox"
                  class="checkbox"
                  id="alarm-0"
                  v-model="alarm[0]"
                /><span>즉시</span>
              </li>
            </label>
            <label for="alarm-10">
              <li>
                <input
                  type="checkbox"
                  class="checkbox"
                  id="alarm-10"
                  v-model="alarm[1]"
                /><span>10분 전</span>
              </li>
            </label>
            <label for="alarm-20">
              <li>
                <input
                  type="checkbox"
                  class="checkbox"
                  id="alarm-20"
                  v-model="alarm[2]"
                /><span>20분 전</span>
              </li>
            </label>
            <label for="alarm-30">
              <li>
                <input
                  type="checkbox"
                  class="checkbox"
                  id="alarm-30"
                  v-model="alarm[3]"
                /><span>30분 전</span>
              </li>
            </label>
            <label for="alarm-60">
              <li>
                <input
                  type="checkbox"
                  class="checkbox"
                  id="alarm-60"
                  v-model="alarm[4]"
                /><span>1시간 전</span>
              </li>
            </label>
          </ul>
        </div>
      </div>

      <div class="modal-btn">
        <button class="btn-close" @click="closeTodoModal">닫기</button>
        <button class="btn-submit" @click="editTodo">수정</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { editTodo } from "@/apis/todo";
import eventBus from "@/utils/eventBus";

export default {
  created() {
    eventBus.$on("editTodoModal:openModal", editTodoData => {
      this.editTodoData = editTodoData;
      this.fetchTodoData();
    });
  },

  data() {
    return {
      editTodoData: [],
      todoTitle: "",
      todoContent: "",
      todoHour: "",
      todoMinute: "",
      alarm: [false, false, false, false, false]
    };
  },

  methods: {
    closeTodoModal() {
      this.initEditTodoModal();
      eventBus.$emit("editTodoModal:closeModal");
    },

    initEditTodoModal() {
      this.todoTitle = "";
      this.todoContent = "";
      this.todoHour = "";
      this.todoMinute = "";
      this.alarm = [false, false, false, false, false];
    },

    fetchTodoData() {
      const todoData = this.editTodoData;
      const todoTime = todoData.todo_time;
      const date = new Date(todoTime);
      const alarm = todoData.send_schedule.split("|");

      this.todoTitle = todoData.todo_title;
      this.todoContent = todoData.todo_contents;
      this.todoHour = date.getHours();
      this.todoMinute = date.getMinutes();

      this.alarm = [];
      alarm.forEach(element => {
        this.alarm.push(parseInt(element, 10) === 0 ? false : true);
      });
    },

    async editTodo() {
      try {
        const alarmList = [];
        this.alarm.forEach(element => {
          if (element === true) {
            alarmList.push("1");
          } else {
            alarmList.push("0");
          }
        });

        const todoData = {
          todoTitle: this.todoTitle, // 문자로 발송될 문자 제목
          todoContents: this.todoContent, // 문자로 발송될 문자 제목 뒤의 내용
          todoTime: `${this.cursorYear}-${this.cursorMonth}-${this.cursorDate} ${this.todoHour}:${this.todoMinute}:00`, // 사용자가 작성한 TODO LIST가 진행되는 시간
          sendSchedule: alarmList.join("|"), // 사용자가 설정한 알림 설정
          todoId: this.editTodoData.todo_id
        };

        const { data } = await editTodo(todoData);
        if (parseInt(data.code, 10) === 200) {
          eventBus.$emit("editTodoList:update");
        }

        this.closeTodoModal();
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    ...mapGetters(["cursorYear", "cursorMonth", "cursorDate"])
  }
};
</script>

<style scoped lang="scss">
input {
  font-size: 1.8rem;
  font-weight: 500;
  border: 1px solid #eee;
  padding: 10px;
  margin: 5px 0 5px 0;
  width: 100%;
  resize: none;
  outline: none;
  transition: 0.25s;
}

input:focus {
  border: 1px solid #2987ff;
  box-shadow: 0 0 0 4px rgba($color: #2987ff, $alpha: 0.7);
}

.modal-btn {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;

  button {
    width: 50%;
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

.cursor-date-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;

  ul {
    display: flex;
    align-items: center;

    li {
      font-size: 1.8rem;
      font-weight: 500;
      color: #565656;
    }
  }

  .cursor-date {
    width: 45px;
    font-size: 1.8rem;
    font-weight: 100;
    border: 1px solid #eee;
    background: transparent;
    padding: 5px 0;
    margin: 0 5px;
    text-align: center;
    resize: none;
    outline: none;
  }

  .year {
    width: 50px;
  }

  .month,
  .day {
    width: 30px;
  }
}

.alarm-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  .checkbox {
    width: 15px;
    height: 15px;
    margin-right: 8px;
  }

  ul {
    display: grid;
    width: 100%;
    grid-template-columns: auto auto auto;

    li {
      display: flex;
      align-items: center;
      font-size: 1.8rem;
      font-weight: 500;
      color: #565656;
    }
  }
}

.label {
  font-size: 1.5rem;
  margin: 20px 0;

  .name {
    font-size: 1.8rem;
    font-weight: 500;
    color: #565656;
  }
}

.modal {
  position: absolute;
  width: 90%;
  min-height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 10px 40px rgba($color: #000000, $alpha: 0.15);

  .title {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .content {
    font-size: 1.5rem;
    font-weight: 300;
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