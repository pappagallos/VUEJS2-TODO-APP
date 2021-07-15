<template>
  <div>
    <div class="calendar-header">
      <button @click="prevMonth">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 443.52 443.52"
        >
          <g>
            <g>
              <path
                d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8
			c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712
			L143.492,221.863z"
              />
            </g>
          </g>
        </svg>
      </button>
      <p class="month">
        {{ this.handleCalendar.year }}년 {{ this.handleCalendar.month }}월
      </p>
      <button @click="nextMonth">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 443.52 443.52"
        >
          <g>
            <g>
              <path
                d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734
			L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8
			C342.889,227.058,342.889,216.255,336.226,209.591z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>

    <div class="calendar-body">
      <div
        v-for="(day, index) in dayList"
        :key="`day-` + index"
        :class="{ holiday: isHoliday(day), underline: true }"
      >
        <p>{{ day }}</p>
      </div>
      <div
        v-for="(date, index) in calendar.date"
        :key="`date-` + index"
        :class="{ today: isToday(date) }"
        @click="cursorDateInit"
      >
        <p>{{ date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      dayList: ["일", "월", "화", "수", "목", "금", "토"],
      today: {
        year: null, // 년
        month: null, // 월
        date: null, // 일
        day: null // 요일
      },
      monthly: {
        endOfDate: null, // 현재 월의 마지막 일수가 몇 일인지 구해 저장되는 변수
        startOfDay: null // 현재 월의 1일이 시작하는 요일을 구해 저장되는 변수
      },
      cursor: {
        year: null, // 년
        month: null, // 월
        date: null, // 일
        day: null // 요일
      },
      calendar: {
        date: []
      },

      handleCalendar: {
        year: null,
        month: null
      }
    };
  },

  created() {
    this.init();
    store.dispatch("ACT_SET_TODAY", this.today);
    store.dispatch("ACT_SET_MONTHLY", this.monthly);
    store.dispatch("ACT_SET_CURSOR", this.cursor);
    store.dispatch("ACT_SET_CALENDAR", this.calendar);
  },

  computed: {
    cursorDay() {
      return this.cursor.day;
    }
  },

  watch: {
    handleCalendar: {
      handler() {
        this.monthlyInit(this.handleCalendar.year, this.handleCalendar.month);
      },
      deep: true
    }
  },

  methods: {
    init() {
      this.todayInit();
      this.monthlyInit(this.today.year, this.today.month);
    },

    prevMonth() {
      const handleCalendar = this.handleCalendar;
      const prevMonth = handleCalendar.month - 1;
      if (prevMonth <= 0) {
        handleCalendar.year -= 1;
        handleCalendar.month = 12;
      } else {
        handleCalendar.month -= 1;
      }
    },

    nextMonth() {
      const handleCalendar = this.handleCalendar;
      const nextMonth = handleCalendar.month + 1;
      if (nextMonth > 12) {
        handleCalendar.year += 1;
        handleCalendar.month = 1;
      } else {
        handleCalendar.month += 1;
      }
    },

    cursorDateInit() {
      const target = event.target || event.srcElement;
      const handleCalendar = this.handleCalendar;
      const cursor = this.cursor;
      cursor.year = handleCalendar.year;
      cursor.month = handleCalendar.month;
      cursor.date = parseInt(target.innerText, 10);

      store.dispatch("ACT_SET_CURSOR", this.cursor);
    },

    todayInit() {
      const date = new Date();
      const today = this.today;
      const cursor = this.cursor;
      const handleCalendar = this.handleCalendar;

      today.year = date.getFullYear();
      today.month = date.getMonth() + 1; // 구하는 월의 수가 1씩 낮으므로 1을 더해서 저장한다. getMonth로 가져오는 경우 0이 월요일이기 때문이다.
      today.date = date.getDate();
      today.day = date.getDay();

      cursor.year = today.year;
      cursor.month = today.month;
      cursor.date = today.date;
      cursor.day = today.day;

      handleCalendar.year = today.year;
      handleCalendar.month = today.month;
    },

    monthlyInit(year, month) {
      /*
       *    [현재 보고있는 월의 시작 요일을 구하는 부분]
       */
      const monthly = new Date(`${year}-${month}-01 23:59:59`);
      this.monthly.startOfDay = monthly.getDay(); // 0, 일요일 / 1, 월요일 / 2, 화요일 ... / 6, 토요일

      /*
       *    [현재 보고있는 월의 마지막 일수를 구하는 부분]
       *    1, 3, 5, 7, 8, 10, 12월은 반드시 31일로 끝나고 2월은 4년에 한 번 29일로 끝나며 그 외에는 28일로 끝난다.
       *    마지막으로 4, 6, 9, 11월은 반드시 30일로 끝나므로 가르키고 있는 현재 월의 마지막 일수는 스위치문을 이용하여 구한다.
       */
      let endOfDate = null;
      switch (this.cursor.month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12: {
          endOfDate = 31;
          break;
        }
        case 2: {
          if (monthly.year % 4 === 0) {
            endOfDate = 29;
          } else {
            endOfDate = 28;
          }
          break;
        }
        case 4:
        case 6:
        case 9:
        case 11: {
          endOfDate = 30;
          break;
        }
      }
      this.monthly.endOfDate = endOfDate;

      this.calendar.date = [];
      for (let i = 0; i < this.monthly.startOfDay; i++) {
        this.calendar.date.push("");
      }

      for (let i = 0; i < this.monthly.endOfDate; i++) {
        this.calendar.date.push(i + 1);
      }
    },

    daliyInit() {},

    isHoliday(day) {
      if (day === "토" || day === "일") {
        return true;
      } else {
        return false;
      }
    },

    isToday(date) {
      const today = this.today;
      const handleCalendar = this.handleCalendar;

      if (
        today.date === date &&
        today.year === handleCalendar.year &&
        today.month === handleCalendar.month
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/common/_colors.scss";

.calendar-header {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  button {
    background: transparent;
    border: none;
    padding: 10px;
    outline: none;

    svg {
      width: 20px;
      height: 20px;
      fill: #565656;
    }
  }
}

.calendar-body {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  font-size: 1.8rem;
  text-align: center;
  padding: 20px 30px;
  font-weight: 500;
  color: $text-basic-color;

  div {
    padding: 6px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.holiday {
  color: #aaaaaa;
}

.today {
  background-color: $todo-color;
  color: #fff;
  border-radius: 5px;
}

.month {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: $text-basic-color;
}

.underline {
  border-bottom: 1px solid #ececec;
  margin-bottom: 6px;
}
</style>
