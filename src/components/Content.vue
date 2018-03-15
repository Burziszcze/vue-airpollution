<template>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div v-show="preloader" class="preloader center">
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
            <h4 class="center">Response data</h4>
            <p>time from last sensor update: {{data.time.s}}</p>
            <p>{{data.name}}</p>
            <div class="collection api_data">
              <a href="#!" class="collection-item"><span class="badge green">{{data.aqi}}</span><strong>Air quality index</strong></a>
              <a href="#!" class="collection-item"><span class="badge blue">{{data.dominentpol}}</span><strong>Dominent pollution</strong></a>
              <a href="#!" class="collection-item"><span class="badge red">{{data.iaqi.co.v}}</span><strong>Carbon monoxide</strong></a>
              <a href="#!" class="collection-item"><span class="badge red">{{data.iaqi.so2.v}}</span><strong>Sulfur dioxide</strong></a>
              <a href="#!" class="collection-item"><span class="badge red">{{data.iaqi.no2.v}}</span><strong>Nitrogen dioxide</strong></a>              
              <a href="#!" class="collection-item"><span class="badge red">{{data.iaqi.o3.v}}</span><strong>Ozone</strong></a>
              <a href="#!" class="collection-item"><span class="badge red">{{data.iaqi.pm10.v}}</span><strong>PM10</strong></a>
              <a href="#!" class="collection-item"><span class="badge red">{{data.iaqi.pm25.v}}</span><strong>PM25</strong></a>
            </div>
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
      station: null,
      data: {
        name: this.name,
        badgecolor: {
          green: 'green',
          yellow: 'yellow',
          orange: 'orange',
          red: 'red',
          purple: 'purple',
          maroon: 'maroon',
        },
        time: {
          s: this.data
        },
        aqi: this.data,
        dominentpol: this.data,
        iaqi: {
          co: {
            v: this.iaqi
          },
          so2: {
            v: this.iaqi
          },
          no2: {
            v: this.iaqi
          },
          o3: {
            v: this.iaqi
          },
          pm10: {
            v: this.iaqi
          },
          pm25: {
            v: this.iaqi
          }
        }
      },
      preloader: false
    };
  },
  computed: function() {

  },
  mounted: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position.coords;
        // console.log((this.position = position.coords));
      });
    }
  },
  methods: {
    showPosition() {
      var token = process.env.TOKEN;
      var lat = this.position.latitude;
      var lng = this.position.longitude;
      var url =
        "https://api.waqi.info/feed/geo:" +
        lat +
        ";" +
        lng +
        "/?token=" +
        token;
      axios
        .get(url)
        .then(response => {
          // JSON responses are automatically parsed.
          // var aqi = response.data.data.aqi;
          var data = response.data.data;
          var iaqi = response.data.data.iaqi.v;
          this.data = data;
          this.iaqi = iaqi;
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
/* .api_data {
  display: none;
} */
</style>

