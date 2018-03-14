<template>
  <nav class="navbar grey darken-4" role="navigation">
    <a href="#" class="brand-logo center">{{title}}</a>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      msg: "This is navbar component",
      title: "Vue air pollution app"
    };
  }
};
</script>
<style scoped>

</style>

