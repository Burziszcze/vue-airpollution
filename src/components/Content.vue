<template>
      <div class="container">
        <div class="row">
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
            <h4 class="center">your geoposition coordinates</h4>
            <div class="collection">
              <a href="#!" class="collection-item"><span class="badge light-green">{{position.latitude}}</span><strong>latitude is:</strong></a>
              <a href="#!" class="collection-item"><span class="badge light-green">{{position.longitude}}</span><strong>longitude is:</strong></a>
            </div>
            <button @click="showPosition" class="waves-effect waves-light btn red center" id="getlocation">użyj lokalizacji</button>
            <p>{{posts}}</p>
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
      },
      userAqi: null,
      station: null,
      posts: null,
      preloader: false
    };
  },
  mounted: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position.coords;
      });
    }
  },
  // getData: function() {
  //   // var lat = position.latitude;
  //   // var lng = position.longitude;
  //   var token = "9648d934b001fa967ab0bebf65abb7f010ffb93d";
  //   var url =
  //     "https://api.waqi.info/feed/geo:" + lat + ";" + lng + "/?token=" + token;
  //   console.log(url);
  //   axios
  //     .get("http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/285")
  //     .then(response => {
  //       // JSON responses are automatically parsed.
  //       this.station = response.data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  methods: {
    showPosition() {
      axios
        // .get("http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/285")
        .get("http://jsonplaceholder.typicode.com/posts/10")

        .then(response => {
          // JSON responses are automatically parsed.
          this.preloader = true;
          this.posts = response.data.title;
          // console.log((this.station = response.data.body));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.badge {
  color: black;
}
</style>

