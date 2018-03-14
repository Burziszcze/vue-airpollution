<template>
      <div class="container">
        <div class="row">
          <div class="col s12 center">
            <!-- <div class="preloader center">
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
            </div> -->
            <div class="collection">
              <a href="#!" class="collection-item"><span class="badge light-green">{{position.latitude}}</span><strong>latitude is:</strong></a>
              <a href="#!" class="collection-item"><span class="badge light-green">{{position.longitude}}</span><strong>longitude is:</strong></a>
            </div>
            <button @click="showPosition" class="waves-effect waves-light btn red center" id="getlocation">użyj lokalizacji</button>
          </div>
        </div>
      </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      position: {
        latitude: this.position,
        longitude: this.position
      }
    };
  },
  mounted: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position.coords;
      });
    }
  },
  methods: {
    showposition() {}
  }
};
</script>

<style scoped>
.badge {
  color: black;
}
</style>

