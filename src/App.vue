<template>
  <div class="main">
   <div class="banner">
    <div class="row">
      <div class="column left">
          <a href="https://edibullapp.com/">
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
        <p><router-link to="/">EdiBull</router-link></p>
      </div>
      <div class="hover">
        <p><router-link to="/portals">Portals</router-link></p>
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
#logo {
  text-align: left;
  font-size: 80px;
  font-family: "Arial Black";
}
.banner {
  position: relative;
  width: 100%;
  height: 60%;
  background-color: rgb(42, 83, 49);
  color: rgb(247, 250, 207);
  }
#edibulllogo {
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
  width: 80px;
}
#nav-bar {
  background-color: rgb(156, 173, 108);
  display: flex; 
}
#nav-bar p {
    padding: 0px 35px;
    letter-spacing: 2px;
}
.hover:hover {
    transition: 0.7s;
    background-color: rgb(106, 129, 64);
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