<template>
      <div class="container">
        <div class="row">
          <div class="col m12">
            <h4 class="center">your geoposition coordinates</h4>
            <div class="collection">
              <a href="#!" class="collection-item"><span class="badge light-green">{{position.latitude}}</span><strong>latitude is:</strong></a>
              <a href="#!" class="collection-item"><span class="badge light-green">{{position.longitude}}</span><strong>longitude is:</strong></a>
            </div>
          </div>
          <div class="col s12 center">
            <button @click="showPosition" class="waves-effect waves-light btn red center" id="getlocation">show data</button>
            <p>press the button to present data</p>           
          </div>          
          <div class="col s12 m6">
            <h4 class="center">Response data</h4>
            <div class="collection">
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.green">{{data.time.s}}</span><strong>time from last sensor update</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.green">{{data.attributions.name}}</span><strong>data come from sensor name</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.dominentpol}}</span><strong>Dominent pollution</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.aqi}}</span><strong>Air quality index (AQI)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.iaqi.co.v}}</span><strong>Carbon monoxide (CO)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.iaqi.so2.v}}</span><strong>Sulfur dioxide (SO2)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.iaqi.no2.v}}</span><strong>Nitrogen dioxide (NO2)</strong></a>              
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.iaqi.o3.v}}</span><strong>Ozone (O3)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.iaqi.pm10.v}}</span><strong>PM10</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.iaqi.pm25.v}}</span><strong>PM25</strong></a>
            </div>
          </div>
          <div class="col s12 m6">
            <h4 class="center">Map</h4>
              <gmap-map :center="center" :zoom="7" style="width: 100%; height: 430px">
                <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"
                ></gmap-marker>
              </gmap-map>
          </div>
        </div>
      </div>
</template>
<script>
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";
import Vue from "vue";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCz-0Jfh7Vm3rJVTNgisSb--93TKhxWWsM",
    v: "3.26"
    // libraries: 'places', //// If you need to use place input
  }
});

export default {
  data() {
    return {
      center: {
        lat: 51.56,
        lng: -0.35
      },
      markers: [
        {
          position: {
            lat: 51.5647698,
            lng: -0.3528734
          }
        },
        {
          position: {
            lat: 51.552476,
            lng: -0.258089
          }
        }
      ],
      position: {
        latitude: this.position,
        longitude: this.position
      },
      station: null,
      badgecolor: {
        none: "badge grey lighten-1",
        green: "badge green",
        yellow: "badge yellow",
        orange: "badge orange",
        red: "badge red",
        purple: "badge purple",
        maroon: "badge maroon"
      },
      data: {
        time: {
          s: this.data
        },
        attributions: {
          name: this.data
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
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position.coords;
        // var lat = position.coords.latitude;
        // var lng = position.coords.longitude
        // console.log("latitude is: ${lat} and longitude is ${lng}");
      });
    }
  },
  methods: {
    showPosition() {
      const token = "9648d934b001fa967ab0bebf65abb7f010ffb93d";
      let lat = this.position.latitude;
      let lng = this.position.longitude;
      let url =
        "https://api.waqi.info/feed/geo:" +
        lat +
        ";" +
        lng +
        "/?token=" +
        token;
      axios
        .get(url)
        // .then(e => {
        //   var preloader = document.getElementsByClassName('preloader');
        //   console.log(preloader);

        //   e.preloader.style.display = 'inline';
        // })
        .then(response => {
          // var preloadershow = document.getElementById('spinner').style.display = 'block';

          // JSON responses are automatically parsed.
          var data = response.data.data;
          var aqi = response.data.data.aqi;
          var iaqi = response.data.data.iaqi.v;
          var name = response.data.data.attributions[1];
          // bind for data
          this.name = name;
          this.data = data;
          this.iaqi = iaqi;
          this.aqi = aqi;
          // change badge color
          if (aqi >= 0 && aqi <= 50) {
            this.badgecolor.none = "badge light-green";
          } else if (aqi >= 51 && aqi <= 100) {
            this.badgecolor.none = "badge yellow";
          } else if (aqi >= 101 && aqi <= 150) {
            this.badgecolor.none = "badge orange";
          } else if (aqi >= 151 && aqi <= 200) {
            this.badgecolor.none = "badge red";
          } else if (aqi >= 201 && aqi <= 300) {
            this.badgecolor.none = "badge purple";
          } else {
            this.badgecolor.none = "badge maroon";
          }

          // var preloaderhide = document.getElementById('spinner').style.display = 'none';
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
.maroon {
  background-color: #a52a2a;
}
/* .api_data {
  display: none;
} */
</style>

