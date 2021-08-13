<template>
  <div class="last">
    <footer class="footer">
      <span class="todo-count"></span>
    </footer>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  props: {
    todo: {
      type: Object,
      default: () => {},
    },
  },
  //   computed: {
  //     ...mapState(["todos"]),
  //   },
};
</script>

<style scoped>
.last {
  width: 650px;
  margin: 0 auto;
}
.footer {
  color: #777;
  padding: 10px 0;
  height: 20px;
  text-align: center;

  width: 100%;
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
}
</style>
