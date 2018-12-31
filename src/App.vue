<template>
  <div class="main">
    <v-toolbar height="125" class="banner">
      <a class="ediLogo" href="https://edibullapp.com/" target="_blank">
        <img
          id="edibulllogo"
          alt="Edibulllogo"
          src="./assets/edibullFINAL 1024.png"
          style="border-radius:50%"
        >
      </a>
      <div class="logo">EdiBull</div>
    </v-toolbar>
    <v-toolbar class="navBar">
      <!-- Should be a mobile toolbar, issues
        <v-menu class="hidden-md-and-up">
        <v-btn slot="activator" icon>
          <v-icon>menu</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="route()">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>-->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Events</v-btn>
        <v-btn flat to="/portals">Portals</v-btn>
        <!-- <v-btn flat to="/">Local Deals</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    route: function() {
      console.log("hello tehre");
    }
  },
  data: () => ({})
};
</script>

<style>
body {
  background-color: rgba(176, 187, 187, 0.63) !important;
}
</style>


<style scoped>
a {
  color: black;
}

.logo {
  padding-left: 40px;
  font-size: 80px;
  font-family: "Arial Black";
}

.banner {
  position: relative;
  width: 100% !important;
  height: 60% !important;
  /* background-color: rgb(42, 83, 49); */
  background-image: linear-gradient(
    to right,
    rgb(42, 83, 49),
    rgb(31, 124, 45)
  );
  color: rgb(247, 250, 207);
}

#edibulllogo {
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  width: 80px;
}

.nav-button {
  font-size: 20px;
}

#nav-bar {
  background-image: linear-gradient(
    to right,
    rgb(156, 173, 108),
    rgb(188, 185, 107)
  );
  display: flex;
}
#nav-bar p {
  padding: 0px 30px;
  letter-spacing: 2px;
  margin: 10px 0 10px 0;
}

.link {
  text-decoration: none;
}

.hover {
  position: relative;
}

.hover:hover {
  background-color: rgb(247, 250, 207);
}

.hover:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  bottom: 0;
  left: 0;
  background-color: rgb(42, 83, 49);
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.25s ease-in-out 0s;
}

.hover:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.column {
  float: left;
}

.left {
  width: 40%;
}

.right {
  width: 60%;
}
.navBar {
  background-image: linear-gradient(
    to right,
    rgb(156, 173, 108),
    rgb(188, 185, 107)
  );
  display: flex;
}
.ediLogo {
  padding-bottom: 20px;
}
</style>