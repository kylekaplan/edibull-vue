<template>
  <div class="main">
    <div class="banner">
      <a href="https://edibullapp.com/">
      <img id="edibulllogo" alt="Edibulllogo" src="./assets/edibullFINAL 1024.png" style="position:absolute;width:5%;border-radius:50%">
      </a>
      <div id="logo">
          <font>EdiBull</font>
      </div>
    </div>
    <!-- Nav Bar -->
    <div id="nav-bar">
      <!-- vue-router (link to separate page) -->
      <div class="hover">
        <p><router-link to="/">EdiBull</router-link></p>
      </div>
      <div class="hover">
        <p><router-link to="/portals">Portals</router-link></p>
      </div>
    </div>
    <router-view></router-view>
    <div class="row">
      <!-- <Edibull></Edibull> -->
    </div>
  </div>
</template>

<script>
import Edibull from './components/Edibull'
import Portals from './components/Portals'

export default {
  name: 'app',
  components: {
    Edibull, Portals
  }
}
</script>

<style>
body {
  background-color: rgba(176, 187, 187, 0.63);
}

#logo {
  text-align: center;
  font-size: 80px;
  font-family: "Arial Black";
  text-align: center;
}

.banner {
  position: relative;
  width: 100%;
  height: 60%;
  background-color: rgb(42, 83, 49);
  color: rgb(247, 250, 207);
  }

#edibulllogo {
  margin: 20px;
}
#nav-bar {
  background-color: rgb(156, 173, 108);
  display: flex; 
}

#nav-bar p {
    padding: 0px 35px;
    letter-spacing: 2px;
    font-family: Cambria;
}

.hover:hover {
    transition: 0.7s;
    background-color: rgb(106, 129, 64);
}

</style>