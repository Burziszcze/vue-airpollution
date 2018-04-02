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
import Content from "./components/Content";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
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
  background-size: auto;
}

nav {
  color: #fff;
  font-size: 2.1rem;
}

main {
  flex: 1 0 auto;
}

.swal-icon--info {
  border-color: #ffeb3b;
}

.swal-icon--info:after {
  background-color: #ffeb3b;
  border-color: #ffeb3b;
}

.swal-icon--info:before {
  background-color: #ffeb3b;
  border-color: #ffeb3b;
}
.swal-button {
  color: rgba(0, 0, 0, 0.64);
}

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
#getYear {
  color: white;
}
</style>
