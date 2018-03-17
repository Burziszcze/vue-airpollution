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
            <sync-loader :loading="loading" :color="color" :size="size"></sync-loader>
          </div>          
          <div class="col s12 m6">
            <h4 class="center">Response data</h4>
            <div class="collection">
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.time.s}}</span><strong>time from last sensor update</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.city.name}}</span><strong>data come from sensor name</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.aqi">{{data.dominentpol}}</span><strong>Dominent pollution</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.aqi">{{data.aqi}}</span><strong>Air quality index (AQI)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.co">{{data.iaqi.co.v}}</span><strong>Carbon monoxide (CO)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.so2">{{data.iaqi.so2.v}}</span><strong>Sulfur dioxide (SO2)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.no2">{{data.iaqi.no2.v}}</span><strong>Nitrogen dioxide (NO2)</strong></a>              
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.o3">{{data.iaqi.o3.v}}</span><strong>Ozone (O3)</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.pm10">{{data.iaqi.pm10.v}}</span><strong>PM10</strong></a>
              <a href="#!" class="collection-item"><span v-bind:class="badgecolor.aqi">{{data.iaqi.pm25.v}}</span><strong>PM25</strong></a>
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
    v: ""
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
      stationCoords: {
        geo: this.data
      },
      badgecolor: {
        none: "badge grey lighten-1",
        aqi: "badge grey lighten-1",
        co: "badge grey lighten-1",
        so2: "badge grey lighten-1",
        no2: "badge grey lighten-1",
        o3: "badge grey lighten-1",
        pm10: "badge grey lighten-1"
      },
      data: {
        time: {
          s: this.data
        },
        city: {
          name: this.name
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
      loading: false
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
        .get(
          // "https://api.waqi.info/feed/geo:51.5647774;-0.35290879999999997/?token=9648d934b001fa967ab0bebf65abb7f010ffb93d"
          url
        )
        // .then(e => {
        //   var preloader = document.getElementsByClassName('preloader');
        //   console.log(preloader);

        //   e.preloader.style.display = 'inline';
        // })
        .then(response => {
          // var preloadershow = document.getElementById('spinner').style.display = 'block';

          // JSON responses are automatically parsed.
          let stationCoords = response.data.data.city.geo;
          let data = response.data.data;
          let aqi = response.data.data.aqi;
          let iaqi = response.data.data.iaqi.v;
          let name = response.data.data.city.name;
          let co = response.data.data.iaqi.co.v;
          let so2 = response.data.data.iaqi.so2.v;
          let no2 = response.data.data.iaqi.no2.v;
          let o3 = response.data.data.iaqi.o3.v;
          let pm10 = response.data.data.iaqi.pm10.v;
          let city = response.data.data.city.geo;

          // bind for data
          this.stationCoords = stationCoords;
          this.name = name;
          this.data = data;
          this.iaqi = iaqi;
          this.aqi = aqi;
          this.co = co;
          this.so2 = so2;
          this.no2 = no2;
          this.o3 = o3;
          this.pm10 = pm10;
          this.city = city;

          // change aqi badge color
          if (aqi >= 0 && aqi <= 50) {
            this.badgecolor.aqi = "badge light-green";
          } else if (aqi >= 51 && aqi <= 100) {
            this.badgecolor.aqi = "badge yellow";
          } else if (aqi >= 101 && aqi <= 150) {
            this.badgecolor.aqi = "badge orange";
          } else if (aqi >= 151 && aqi <= 200) {
            this.badgecolor.aqi = "badge red";
          } else if (aqi >= 201 && aqi <= 300) {
            this.badgecolor.aqi = "badge purple";
          } else {
            this.badgecolor.aqi = "badge maroon";
          }
          // change CO badge color
          if (co >= 0 && co <= 2.9) {
            this.badgecolor.co = "badge light-green";
          } else if (co >= 3 && co <= 5.8) {
            this.badgecolor.co = "badge yellow";
          } else if (co >= 5.9 && co <= 8.9) {
            this.badgecolor.co = "badge orange";
          } else if (co >= 9.0 && co <= 13.4) {
            this.badgecolor.co = "badge red";
          } else if (co >= 13.5 && co <= 20.0) {
            this.badgecolor.co = "badge purple";
          }
          // change SO2 badge color
          if (so2 >= 0 && so2 <= 65) {
            this.badgecolor.so2 = "badge light-green";
          } else if (so2 >= 66 && so2 <= 131) {
            this.badgecolor.so2 = "badge blue";
          } else if (so2 >= 132 && so2 <= 199) {
            this.badgecolor.so2 = "badge yellow";
          } else if (so2 >= 200 && so2 <= 299) {
            this.badgecolor.so2 = "badge red";
          } else {
            this.badgecolor.so2 = "badge purple";
          }
          // change NO2 badge color
          if (no2 >= 0 && no2 <= 39) {
            this.badgecolor.no2 = "badge light-green";
          } else if (no2 >= 40 && no2 <= 78) {
            this.badgecolor.no2 = "badge blue";
          } else if (no2 >= 79 && no2 <= 119) {
            this.badgecolor.no2 = "badge yellow";
          } else if (no2 >= 120 && no2 <= 179) {
            this.badgecolor.no2 = "badge red";
          } else {
            this.badgecolor.no2 = "badge purple";
          }
          // change o3 badge color
          if (o3 >= 0 && o3 <= 26) {
            this.badgecolor.o3 = "badge light-green";
          } else if (o3 >= 27 && o3 <= 52) {
            this.badgecolor.o3 = "badge blue";
          } else if (o3 >= 53 && o3 <= 79) {
            this.badgecolor.o3 = "badge yellow";
          } else if (o3 >= 80 && o3 <= 119) {
            this.badgecolor.o3 = "badge red";
          } else {
            this.badgecolor.o3 = "badge purple";
          }
          // change PM10 badge color
          if (pm10 >= 0 && pm10 <= 26.3) {
            this.badgecolor.pm10 = "badge light-green";
          } else if (pm10 >= 26.4 && pm10 <= 52.7) {
            this.badgecolor.pm10 = "badge blue";
          } else if (pm10 >= 52.8 && pm10 <= 79.9) {
            this.badgecolor.pm10 = "badge yellow";
          } else if (pm10 >= 80 && pm10 <= 119.9) {
            this.badgecolor.pm10 = "badge red";
          } else {
            this.badgecolor.pm10 = "badge purple";
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

