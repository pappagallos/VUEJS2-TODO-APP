<template>
  <div>
    <ul>
      <li :class="{ active: true }">Monthly</li>
      <li>Daily</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/assets/scss/common/_colors.scss";

ul {
  display: flex;
  margin: 0 20px 30px 20px;
  border: 1px solid #ececec;
  border-radius: 50px;
  overflow: hidden;

  li {
    list-style-type: none;
    font-size: 1.6rem;
    width: 50%;
    text-align: center;
    padding: 15px;
  }

  .active {
    background: linear-gradient(240deg, #587ef9, #43acd7, #31ddb5);
    color: #fff;
  }
}
</style>