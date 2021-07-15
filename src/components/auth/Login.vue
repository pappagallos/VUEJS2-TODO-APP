<template>
  <!-- TODO 어플리케이션 로그인 프레임 부분 -->
  <div class="todo-wrapper">
    <div class="container">
      <div class="logo">
        <p class="logo">Todo</p>
      </div>
      <form @submit.prevent="userLogin">
        <input
          type="text"
          id="id"
          v-model="userId"
          placeholder="아이디 혹은 이메일"
          autofocus
          autocomplete="off"
        />
        <p id="id-msg"></p>
        <input
          type="password"
          id="password"
          v-model="userPassword"
          placeholder="비밀번호"
          autocomplete="off"
        />
        <p id="password-msg"></p>
        <button class="btn-login" type="submit">로그인</button>
        <router-link to="/user/join">
          <p class="link">아직 회원가입을 안하셨나요?</p>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { saveUserTraits, saveStoreUserTraits } from "@/utils/userStorage";
import { userLogin } from "@/apis/users";
import { mapGetters } from "vuex";
import message from "@/messages";

export default {
  data() {
    return {
      userId: "",
      userPassword: ""
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    async userLogin() {
      if (this.userId.length === 0 || this.userPassword.length === 0) return;
      try {
        const userData = {
          userId: this.userId,
          userPassword: this.userPassword
        };
        const { data } = await userLogin(userData);

        if (data.result === "success." && parseInt(data.code, 10) === 200) {
          const params = {
            userId: data.user.userId,
            userName: data.user.userName,
            userPhone: data.user.userPhone,
            userToken: data.user.userToken
          };

          saveUserTraits(params);
          saveStoreUserTraits(params);

          if (this.isLogin === true) {
            this.$router.push("/todo");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    checkActiveLoginBtn() {
      const btnObj = document.querySelector(".btn-login");

      if (this.userId.length > 0 && this.userPassword.length > 0) {
        btnObj.style.opacity = 1;
      } else {
        btnObj.style.opacity = 0.5;
      }
    },
    checkMessage(type) {
      const passwordObj = document.querySelector("#password");
      const passwordMsgObj = document.querySelector("#password-msg");
      if (type === "id") {
        const idObj = document.querySelector("#id");
        const idMsgObj = document.querySelector("#id-msg");
        if (this.userId.length === 0) {
          idObj.style.borderBottom = "1px solid #2a87ff";
          idMsgObj.innerText = message.M_0001;
        } else {
          idObj.style.borderBottom = "1px solid #ccc";
          idMsgObj.innerText = "";
        }
      } else if (type === "password") {
        if (this.userPassword.length === 0) {
          passwordObj.style.borderBottom = "1px solid #2a87ff";
          passwordMsgObj.innerText = message.M_0002;
        } else {
          passwordObj.style.borderBottom = "1px solid #ccc";
          passwordMsgObj.innerText = "";
        }
      }
    }
  },
  watch: {
    userId: function() {
      this.checkMessage("id");
      this.checkActiveLoginBtn();
    },
    userPassword: function() {
      this.checkMessage("password");
      this.checkActiveLoginBtn();
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

  .logo {
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;

    p {
      font-family: "Lobster", cursive;
      font-size: 9.5rem;
      color: $todo-color;
    }
  }

  #id-msg,
  #password-msg {
    padding: 0;
    margin: 0;
    font-size: 1.1rem;
    color: $todo-color;
    height: 11px;
  }

  .container {
    box-sizing: border-box;
    width: 80%;

    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 5px;
      margin-top: 10px;
    }

    #password {
      letter-spacing: 1rem;
    }

    .link {
      font-size: 1.3rem;
      text-align: center;
      margin: 20px 0 20px 0;
    }

    .btn-login {
      margin: 0 auto;
      border: none;
      color: #fff;
      font-weight: 500;
      font-size: 1.5rem;
      padding: 15px;
      width: 100%;
      background: linear-gradient(270deg, #587ef9, #43acd7, #31ddb5);
      border-radius: 50px;
      margin-top: 30px;
      opacity: 0.5; // 버튼 비활성화된 것처럼 보이게 투명도 조절
      outline: none;
    }
  }
}
</style>