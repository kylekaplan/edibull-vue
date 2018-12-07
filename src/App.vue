<template>
  <div class="main">
   <div class="banner">
    <div class="row">
      <div class="column left">
          <a href="https://edibullapp.com/" target="_blank">
            <img id="edibulllogo" alt="Edibulllogo" src="./assets/edibullFINAL 1024.png" style="border-radius:50%">
          </a>
      </div>
      <div class="column right">
        <div id="logo">
          <font>EdiBull</font>
        </div>
      </div>
    </div>  
    </div>
     <!-- Nav Bar -->
    <div id="nav-bar">
      <!-- vue-router (link to separate page) -->
      <div class="hover">
        <p class="nav-button"><router-link to="/" class="link">Events</router-link></p>
      </div>
      <div class="hover">
        <p class="nav-button"><router-link to="/portals" class="link">Portals</router-link></p>
      </div>
      <div class="hover">
        <p class="nav-button"><router-link to="/" class="link">Local Deals</router-link></p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',

}
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

#logo {
  text-align: left;
  font-size: 80px;
  font-family: "Arial Black";
}

.banner {
  position: relative;
  width: 100%;
  height: 60%;
  /* background-color: rgb(42, 83, 49); */
  background-image: linear-gradient(to right, rgb(42, 83, 49), rgb(31, 124, 45));
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
  background-image: linear-gradient(to right, rgb(156, 173, 108), rgb(188, 185, 107));
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
</style>