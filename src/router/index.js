import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    // 사용자가 접근하는 URL에 따라서 라우팅을 달리 해주기 위해서 라우팅 URL을 정의하는 부분
    path: "/",
    // 코드 스플리팅 문법, 페이지를 라우터에 그리기 위해 미리 가져오는 것이 아닌 사용자가 호출할 때마다 가져오기 위해 코드 스플리팅을 사용하는 부분
    component: () => import("@/views/auth/LoginView.vue"),
    name: "Login",
  },
  {
    path: "/user/join",
    component: () => import("@/views/auth/JoinView.vue"),
    name: "Join",
  },
  {
    path: "/todo",
    component: () => import("@/views/todo/TodoView.vue"),
    name: "TodoMain",
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth === true) {
    const { isLogin } = store.getters;
    if(isLogin === false) {
      alert("먼저 로그인을 해주세요.");
      next("/");
    }
  }
  next();
});

export default router;
