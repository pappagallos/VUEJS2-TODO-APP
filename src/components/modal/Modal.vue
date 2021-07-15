<template>
  <transition>
    <div class="modal">
      <svg viewBox="0 0 496.096 496.096" @click="close" class="close">
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
      <p class="title">{{ modalTitle }}</p>
      <p class="content">{{ modalContent }}</p>
    </div>
  </transition>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  methods: {
    close() {
      store.commit("MUT_UPDATE_MODAL_FLAG", false);
    }
  },
  computed: {
    ...mapGetters(["modalTitle", "modalContent"])
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  width: 80%;
  min-height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;

  .title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .content {
    font-size: 1.5rem;
    font-weight: 300;
    color: #565656;
  }

  .close {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 20px;
    height: 20px;
  }
}
</style>