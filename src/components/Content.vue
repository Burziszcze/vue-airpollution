<template>
      <div class="container">
      <div class="section main">
        <div class="row">
          <div class="col s12 center">
            <div id="weather">
              <p id="out"></p>
            </div>
          </div>
          <div class="col s12">
            <div class="preloader center">
              <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div>
                  <div class="gap-patch">
                    <div class="circle"></div>
                  </div>
                  <div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 center">
            <button @click="showLocation" class="waves-effect waves-light btn red center" id="getlocation">użyj lokalizacji</button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
            <div class="col s12 center">
                 <div class="card">
                     <h2>{{currentLocation.currentLocationLat}}</h2>
                 </div>
            </div>
        </div>
      </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      currentLocation: {
        currentLocationLat: this.currentLocationLat,
        currentLocationLon: this.currentLocationLon
      }
    };
  },
  methods: {
    showLocation: function() {
      if ("geolocation" in navigator) {
        var gl = navigator.geolocation;
        gl.getCurrentPosition(
          function(position) {
            this.currentLocation = position.coords;
            this.currentLocationLon = position.coords.longitude;
            this.currentLocationLat = position.coords.latitude;
            console.log(this.currentLocation);
          }.bind(this)
        ) // bind to `this` so it's the current component.
      }
    },
  },
  //   data() {
  //     return {
  //       currentLocation: {
  //         currentLocationLat: null,
  //         currentLocationLon: null,
  //         currentLocation: null
  //       }
  //     };
  //   },
  //   ready() {
  //     if ("geolocation" in navigator) {
  //       var gl = navigator.geolocation;
  //       gl.getCurrentPosition(
  //         function(position) {
  //           this.currentLocation = position.coords;
  //           this.currentLocationLon = position.coords.longitude;
  //           this.currentLocationLat = position.coords.latitude;
  //           console.log(this.currentLocation);
  //         }.bind(this)
  //       ); // bind to `this` so it's the current component.
  //     }
  //   }
};
</script>
<style scoped>
.card {
  width: 700px;
  height: 200px;
}
</style>

