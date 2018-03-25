<template>
<div class="container">
  <div class="row">
    <br>
    <div class="col s12 center">
      <i id="cloud-icon" class="fa fa-cloud"></i>
      <h1 id="title-heading-font">Vue Air pollution</h1>
      <p id="title-description-font">check the air pollution in your area</p>
      <button @click="displayData" class="waves-effect waves-light btn red pulse center" id="getlocation">show data</button>
      <p>press the button to present data</p>
    </div>
    <!-- <slide-y-up-transition :duration="600"> -->
    <div class="col s12 m6">
      <div class="collection">
        <!-- <a href="#!" class="collection-item tooltipped" data-position="top" data-tooltip="I am a tooltip"><span v-bind:class="badgecolor.none">{{currentLocation.lat}}</span><strong>User latitude </strong></a>
        <a href="#!" class="collection-item tooltipped" data-position="top" data-tooltip="I am a tooltip"><span v-bind:class="badgecolor.none">{{currentLocation.lng}}</span><strong>User longitude</strong></a> -->
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.time.s}}</span><strong>time from last sensor update</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.none">{{data.city.name}}</span><strong>sensor name</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.aqi">{{data.dominentpol}}</span><strong>Dominent pollution</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.aqi">{{data.aqi}}</span><strong>Air quality index (AQI)</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.co">{{data.iaqi.co.v}}</span><strong>Carbon monoxide (CO)</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.so2">{{data.iaqi.so2.v}}</span><strong>Sulfur dioxide (SO2)</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.no2">{{data.iaqi.no2.v}}</span><strong>Nitrogen dioxide (NO2)</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.o3">{{data.iaqi.o3.v}}</span><strong>Ozone (O3)</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.pm10">{{data.iaqi.pm10.v}}</span><strong>PM10</strong></a>
        <a href="#!" class="collection-item"><span v-bind:class="badgecolor.aqi">{{data.iaqi.pm25.v}}</span><strong>PM2.5</strong></a>
      </div>
    </div>
    <!-- </slide-y-up-transition> -->
    <div class="col s12 m6">
      <div class="card">
        <gmap-map :center="{lat:currentLocation.lat, lng:currentLocation.lng}" :zoom="10" style="width: 100%; height: 430px">
          <gmap-marker :key="index" v-for="(m1, m2, index) in markers" :position="{lat:currentLocation.lat, lng:currentLocation.lng}" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
        </gmap-map>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  SlideYUpTransition
} from 'vue2-transitions';
import axios from "axios";
import swal from 'sweetalert';
import * as VueGoogleMaps from "vue2-google-maps";
import Vue from "vue";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCz-0Jfh7Vm3rJVTNgisSb--93TKhxWWsM",
    v: "3"
    // libraries: 'places', //// If you need to use place input
  }
});

export default {
  components: {
    SlideYUpTransition
  },
  data() {
    return {
      show: false,
      fetchedData: [],
      currentLocation: {
        lat: 0,
        lng: 0
      },
      markers: [{
          position: {
            lat: 0,
            lng: 0
          }
        },
        {
          position: {
            lat: 0,
            lng: 0
          }
        }
      ],
      stationCoords: {
        lat: 0,
        lng: 0
      },
      info: {
        time: "displays the time of the last measurement update",
        station: "displays data updates from the nearest measurement station",
        name: "displays the name of the measuring station",
        dominent: "displays the current dominant pollution",
        aqi: "air quality index (AQI) is an overview of air quality at each air monitoring site. The lower the index, the better the air quality is.",
        co2: "Carbon monoxide is taken up by blood much more readily than oxygen is, so relatively small amounts of it in inhaled air can affect our health. Prolonged exposure to carbon monoxide can cause tissue damage. People suffering from cardiovascular disease are particularly at risk.",
        so2: "Sulfur dioxide is an irritant gas that attacks the throat and lungs. Its effect on health is increased by the presence of airborne particles. Prolonged exposure to sulfur dioxide can lead to increases in respiratory illnesses like chronic bronchitis.",
        no2: "Nitrogen dioxide is known to affect the throat and the lungs. In levels encountered in polluted air, people with respiratory problems, particularly infants, children and the elderly, may be affected. People with asthma are often sensitive to nitrogen dioxide.",
        o3: "Ozone occurs in the upper atmosphere, where it serves a useful purpose in protecting us from UV radiation. Ozone can also occur near the ground where we breathe. Ozone is very reactive, affecting the linings of the throat and lungs, restricting the air passages and making breathing difficult. It also increases the risk of respiratory infections. Ozone is of greater concern for the elderly and those with existing lung disease.",
        pm10: "Particle pollution is a mixture of solid particles and liquid droplets. there are two categories of particle size: PM2.5 and PM10. These particles are very small and are measured in micrometres (µm). High levels of PM10 particles in the air can irritate the eyes and throat. People with existing heart or lung conditions (including asthma) can experience an increase in symptoms, including wheezing, chest tightness and difficulty breathing. Common sources of PM10 particles include sea salt, pollen and combustion activities such as motor vehicles and industrial processes. Dust from unsealed roads is a major source of PM10 particles.",
        pm25: "PM2.5 particles are smaller than 2.5 micrometres (0.0025 mm) in diameter. Often described as fine particles, they are up to 30 times smaller than the width of a human hair. PM2.5 particles are small enough to be breathed deep into the lungs. This can cause health effects. Children, people over 65, pregnant women and people with existing heart or lung conditions (including asthma) are more sensitive to the effects of breathing in fine particles. Symptoms may include wheezing, chest tightness and difficulty breathing."
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
    this.geolocation();
    this.FetchApiData();
  },
  methods: {
    geolocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        error => {
          swal("something went wrong and  " + error.message);
        }, {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: 60000
        }
      );
    },
    FetchApiData() {
      const token = "9648d934b001fa967ab0bebf65abb7f010ffb93d";
      let lat = this.currentLocation.lat;
      let lng = this.currentLocation.lng;
      let url =
        "https://api.waqi.info/feed/geo:" +
        lat +
        ";" +
        lng +
        "/?token=" +
        token;
      axios
        .get(url)
        .then((response) => {
          this.fetchedData = response.data;
        })
        .catch((error) => {
          swal(error.message);
        });
    },
    markerCoordinates() {},
    displayData() {
      let token = "9648d934b001fa967ab0bebf65abb7f010ffb93d";
      let lat = this.currentLocation.lat;
      let lng = this.currentLocation.lng;
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
        .then((response) => {
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
            swal({
              icon: "success",
              button: {
                className: "waves-effect waves-light btn light-green"
              },
              closeOnEsc: true,
              title: "AQI " + aqi + " status: " + "Excellent",
              text: "No health implications."
            });
          } else if (aqi >= 51 && aqi <= 100) {
            this.badgecolor.aqi = "badge yellow";
            swal({
              icon: "info",
              button: {
                className: "waves-effect waves-light btn yellow"
              },
              closeOnEsc: true,
              title: "AQI " + aqi + " status: " + "Good",
              text: "Only very few hypersensitive people should reduce outdoor activities."
            });
          } else if (aqi >= 101 && aqi <= 150) {
            this.badgecolor.aqi = "badge orange";
            swal({
              icon: "warning",
              button: {
                className: "waves-effect waves-light btn orange"
              },
              closeOnEsc: true,
              title: "AQI " + aqi + " status: " + "Lightly Polluted",
              text: "Healthy people may experience slight irritations and sensitive individuals will be slightly affected to a larger extent."
            });
          } else if (aqi >= 151 && aqi <= 200) {
            this.badgecolor.aqi = "badge red";
            swal({
              icon: "error",
              button: {
                className: "waves-effect waves-light btn red"
              },
              closeOnEsc: true,
              title: "AQI " + aqi + " status: " + "Moderately Polluted",
              text: "Sensitive individuals will experience more serious conditions. The hearts and respiratory systems of healthy people may be affected."
            });
          } else if (aqi >= 201 && aqi <= 300) {
            this.badgecolor.aqi = "badge purple";
            swal({
              icon: "error",
              button: {
                className: "waves-effect waves-light btn purple"
              },
              closeOnEsc: true,
              title: "AQI " + aqi + " status: " + "Heavily Polluted",
              text: "Healthy people will commonly show symptoms. People with respiratory or heart diseases will be significantly affected and will experience reduced endurance in activities."
            });
          } else {
            this.badgecolor.aqi = "badge red accent-4";
            swal({
              icon: "error",
              button: {
                className: "waves-effect waves-light btn red accent-4"
              },
              closeOnEsc: true,
              title: "AQI " + aqi + " status: " + "Severely Polluted",
              text: "Healthy people will experience reduced endurance in activities and may also show noticeably strong symptoms. Other illnesses may be triggered in healthy people. Elders and the sick should remain indoors and avoid exercise. Healthy individuals should avoid outdoor activities."
            });
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
        })
        .catch(error => {
          swal(error.message);
        });
    }
  }
};
</script>

<style scoped>
#title-heading-font {
  font-family: 'Fugaz One';
  color: #343434;
}

#title-description-font {
  color: #343434;
  font-size: 1.5em;
  font-family: 'Fugaz One';
}


#cloud-icon {
  font-size: 10rem;
  background-color: #343434;
  color: #7986cb;
  padding: 10px;
  border-radius: 10px;
}

.badge {
  color: black;
}
</style>
