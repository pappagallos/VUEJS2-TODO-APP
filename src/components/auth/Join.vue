<template>
  <div class="todo-wrapper">
    <div class="container">
      <p class="title">회원가입</p>
      <form @submit.prevent="userJoin">
        <input type="text" id="name" v-model="userName" placeholder="이름" autocomplete="off" />
        <p id="name-msg"></p>
        <input
          type="text"
          id="id"
          v-model="userId"
          placeholder="사용할 아이디 혹은 이메일"
          autofocus
          autocomplete="off"
          @blur="overlapUser"
        />
        <p id="id-msg"></p>
        <input
          type="password"
          id="password"
          v-model="userPassword"
          placeholder="사용할 비밀번호"
          autocomplete="off"
        />
        <p id="password-msg"></p>
        <input
          type="password"
          id="chk-password"
          v-model="chkUserPassword"
          placeholder="사용할 비밀번호 확인"
          autocomplete="off"
        />
        <p id="chk-password-msg"></p>
        <input type="text" id="phone" v-model="userPhone" placeholder="핸드폰 번호" autocomplete="off" />
        <p id="phone-msg"></p>
        <button class="btn-join" type="submit">회원가입</button>
        <router-link to="/">
          <p class="link">뒤로가기</p>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import message from "@/messages";
import { userJoin, overlapUser } from "@/apis/users";

export default {
  data() {
    return {
      userId: "",
      userPassword: "",
      chkUserPassword: "",
      userName: "",
      userPhone: "",
      chkConflictUserId: false
    };
  },
  methods: {
    async userJoin() {
      const userData = {
        userId: this.userId,
        userPassword: this.userPassword,
        userName: this.userName,
        userPhone: this.userPhone,
        status: 1,
        createdAt: new Date()
      };

      // 폼 유효성 검증
      if (
        this.userId.length === 0 ||
        this.userPassword.length === 0 ||
        this.chkUserPassword.length === 0 ||
        this.userName.length === 0 ||
        this.userPhone.length === 0
      ) {
        alert("회원가입을 위해 정보를 모두 입력해주세요.");
        return;
      }

      // 중복된 아이디가 있는지 검증
      if (this.chkConflictUserId === false && this.userId.length > 0) {
        alert("입력하신 아이디가 이미 존재하는 아이디 입니다.");
        return;
      }

      try {
        const { data } = await userJoin(userData);

        if (data.result === "success." && parseInt(data.code, 10) === 200) {
          alert("회원가입이 완료되었어요. 가입하신 계정으로 로그인해주세요.");
          this.$router.push("/");
        } else {
          alert("회원가입에 실패했어요.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    filter() {
      // data의 phone에 대한 내용을 가져온 뒤,
      let phone = this.userPhone;

      // 배열함수를 이용해서 특정 인덱스의 배열을 제거하고 다시 조인하기 위해서 배열로 전환해준 뒤,
      phone = phone.split("");

      // 사용자가 - 를 입력했는지 감지하기 위해 -가 있는 부분의 인덱스를 구한 뒤,
      const index = phone.indexOf("-");
      console.log(index);

      // index 가 -1 이면 사용자가 - 를 입력하지 않았다는 것이고 -1 이상의 값이 들어오게 되면 입력 했다는 것이므로,
      if (index !== -1) {
        // - 가 감지된 index 에서 1개를 제거하는데, 이 의미는 index로 감지된 그 자신을 제거하겠다는 의미이며,
        phone.splice(index, 1);
        // 제거하고 나서 배열을 모두 합쳐준 뒤 합치고 나서 생긴 , 들을 정규식으로 전부 제거해주고,
        phone = phone.join().replace(/,/gi, "");

        // 다시 data의 phone에 필터링 해준 값으로 초기화해준다.
        this.userPhone = phone;
      }
    },
    chkActiveJoinBtn() {
      const btnObj = document.querySelector(".btn-join");
      if (
        this.userId.length === 0 ||
        this.userPassword.length === 0 ||
        this.chkUserPassword.length === 0 ||
        this.userName.length === 0 ||
        this.userPhone.length === 0
      ) {
        btnObj.style.opacity = 0.5;
        return;
      } else {
        btnObj.style.opacity = 1;
        return;
      }
    },
    checkMessage(type) {
      if (type === "id") {
        const idObj = document.querySelector("#id");
        const idMsgObj = document.querySelector("#id-msg");
        if (this.userId.length === 0) {
          idObj.style.borderBottom = "1px solid #5093e9";
          idMsgObj.innerText = message.M_0001;
        } else {
          idObj.style.borderBottom = "1px solid #ccc";
          idMsgObj.innerText = "";
        }
      } else if (type === "password") {
        const passwordObj = document.querySelector("#password");
        const passwordMsgObj = document.querySelector("#password-msg");
        if (this.userPassword.length === 0) {
          passwordObj.style.borderBottom = "1px solid #5093e9";
          passwordMsgObj.innerText = message.M_0002;
        } else {
          passwordObj.style.borderBottom = "1px solid #ccc";
          passwordMsgObj.innerText = "";
        }
      } else if (type === "chkPassword") {
        const chkPasswordObj = document.querySelector("#chk-password");
        const chkPasswordMsgObj = document.querySelector("#chk-password-msg");
        if (this.userPassword.length === 0) {
          chkPasswordObj.style.borderBottom = "1px solid #5093e9";
          chkPasswordMsgObj.innerText = message.M_0003;
        } else {
          if (this.userPassword !== this.chkUserPassword) {
            chkPasswordObj.style.borderBottom = "1px solid #5093e9";
            chkPasswordMsgObj.innerText = message.M_0004;
          } else {
            chkPasswordObj.style.borderBottom = "1px solid #ccc";
            chkPasswordMsgObj.innerText = "";
          }
        }
      } else if (type === "name") {
        const nameObj = document.querySelector("#name");
        const nameMsgObj = document.querySelector("#name-msg");

        if (this.userName.length === 0) {
          nameObj.style.borderBottom = "1px solid #5093e9";
          nameMsgObj.innerText = message.M_0005;
        } else {
          nameObj.style.borderBottom = "1px solid #ccc";
          nameMsgObj.innerText = "";
        }
      } else if (type === "phone") {
        const phoneObj = document.querySelector("#phone");
        const phoneMsgObj = document.querySelector("#phone-msg");

        if (this.userPhone.length === 0) {
          phoneObj.style.borderBottom = "1px solid #5093e9";
          phoneMsgObj.innerText = message.M_0006;
        } else {
          phoneObj.style.borderBottom = "1px solid #ccc";
          phoneMsgObj.innerText = "";
        }
      }
    },
    async overlapUser() {
      if (this.userId.length === 0) return;

      try {
        const { data } = await overlapUser(this.userId);

        if (data.result === "success." && parseInt(data.code, 10) === 200) {
          this.chkConflictUserId = true;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            this.chkConflictUserId = false;

            const idObj = document.querySelector("#id");
            const idMsgObj = document.querySelector("#id-msg");

            idObj.style.borderBottom = "1px solid #5093e9";
            idMsgObj.innerText = message.M_0007;
          }
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request.data);
          console.log(error.request.status);
          console.log(error.request.headers);
        } else {
          console.log(error);
        }
      }
    }
  },
  watch: {
    userId: function() {
      this.checkMessage("id");
      this.chkActiveJoinBtn();
    },
    userPassword: function() {
      this.checkMessage("password");
      this.chkActiveJoinBtn();
    },
    chkUserPassword: function() {
      this.checkMessage("chkPassword");
      this.chkActiveJoinBtn();
    },
    userName: function() {
      this.checkMessage("name");
      this.chkActiveJoinBtn();
    },
    userPhone: function() {
      this.checkMessage("phone");
      this.chkActiveJoinBtn();
      this.filter();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_import.scss";

.todo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;

  svg {
    width: 5rem;
    height: auto;
    fill: $todo-color;
  }

  p {
    font-size: 2.5rem;
    font-weight: 700;
    color: $todo-color;
  }
}
.title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
}
#id-msg,
#password-msg,
#name-msg,
#chk-password-msg,
#phone-msg {
  padding: 0;
  margin: 0;
  font-size: 1.1rem;
  color: #5093e9;
  height: 1.1rem;
}

.container {
  box-sizing: border-box;
  width: 80%;

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }

  #password,
  #chk-password {
    letter-spacing: 1rem;
  }

  .link {
    font-size: 1.3rem;
    text-align: center;
    margin: 2rem 0 2rem 0;
  }

  .btn-join {
    margin: 0 auto;
    border: none;
    color: #fff;
    font-weight: 500;
    font-size: 1.5rem;
    padding: 1.5rem;
    width: 100%;
    background: linear-gradient(270deg, #587ef9, #43acd7, #31ddb5);
    border-radius: 5rem;
    margin-top: 3rem;
    opacity: 0.5; // 버튼 비활성화된 것처럼 보이게 투명도 조절
    outline: none;
  }
}
</style>