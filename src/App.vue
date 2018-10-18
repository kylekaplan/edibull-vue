<template>
  <div class="main">
   <div class="banner">
     <a href="https://edibullapp.com/">
     <img id="edibulllogo" alt="Edibulllogo" src="./assets/edibullFINAL 1024.png" style="position:absolute;width:5%;border-radius:50%">
     </a>
     <div id="logo">
     <font>Edibull</font>
     </div>
     </div>
     <div class="row">
          <Edibull></Edibull>
      </div>
  </div>
</template>

<script>
import Edibull from './components/Edibull'

export default {
  name: 'app',
  components: {
    Edibull
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
</style>