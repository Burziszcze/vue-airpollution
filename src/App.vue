<template>
  <div id="app">
    <main>
      <Navbar/>
      <Content/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Content,
    Footer
  }
};
</script>

<style>
#app {
  /* margin: 0; */
  font-family: "Roboto", sans-serif;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  flex: 1 0 auto;
  background-image: url("assets/images/img_1.png");
  background-size: cover;
}
nav {
  color: #fff;
  font-size: 2.1rem;

}

main {
  flex: 1 0 auto;
}

#weather {
  background-color: #fafafa;
  /*opacity: 0.5;*/
}

/* .map {
  width: 600px;
  height: 400px;
} */

/*show preloader before content load*/

.preloader-background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.preloader {
  display: none;
}

#heart-ico {
  color: #f44336;
}

footer a:hover {
  color: #90caf9;
}

footer a {
  color: white;
}
</style>
