<template>
  <div>
    <div class="logo">
      <p>Todo</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/assets/scss/common/_colors.scss";

.logo {
  position: relative;
  width: 100%;
  padding-top: 20px;
  text-align: center;
  margin-bottom: 30px;

  p {
    font-family: "Lobster", cursive;
    font-size: 3.5rem;
    color: $todo-color;
  }
}
</style>