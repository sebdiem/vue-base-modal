<template>
  <div id="app">
    <button  @click="show = true">Show modal</button>
    <ModalComponent :show=show @close="show = false">
      <p>Hello World</p>
    </ModalComponent>
    {{ show }}
  </div>
</template>

<script>
import ModalComponent from "./components/BaseModal";

export default {
  name: "App",
  components: {
    ModalComponent,
  },
  data: function() {
    return {
      show: false,
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
