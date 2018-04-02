<template>
<footer class="page-footer black darken-4">
  <div class="footer-copyright center black darken-4">
    <div class="container">
      <div class="row">
        <div class="col m6 s12">
          Data comes from API <a href="http://aqicn.org/api/pl/">aqicn.org</a>
        </div>
        <div class="col m6 s12">
          App made with <i class="fa fa-heart" id="heart-ico" aria-hidden="true"></i> by <a href="https://burziszcze.github.io/new-portfolio">Paweł Jarosz</a> © <span id="getYear">{{ new Date().getFullYear() }}</span>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      msg: "This is footer component"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
