<template>
  <div>
    <div class="container">
      <div id="search-container">
        <div class="row">
          <div class="col-4@sm col-3@md">
            <div class="filters-group">
              <label for="filters-search-input" class="filter-label">Search</label>
              <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12@sm filters-group-wrap">
            <div class="filters-group">
              <p class="filter-label">Filter</p>
              <div class="btn-group filter-options">
                <p>Umbrella</p>
                <button class="btn btn--primary" data-group="Fraternity and Sorority Life">Fraternity & Sorority Life</button>
                <button class="btn btn--primary" data-group="Service">Service</button>
                <button class="btn btn--primary" data-group="Sport Clubs">Sport Clubs</button>
                <button class="btn btn--primary" data-group="Student Life">Student Life</button>
                <button class="btn btn--primary" data-group="Morsani College of Medicine">Morsani College of Medicine</button>
                <button class="btn btn--primary" data-group="Umbrella">Umbrella</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-shuffle grid-container" id="my-shuffle">
          <!-- :data-groups="get_portal(image)" below does not work-->
          <div v-for="image in photos" :key="image.id" class="w-25 p-1 card"
            :data-groups="get_portal(image)"
            data-date-created="2017-04-30"
            data-title="Lake Walchen"
          >
            <div class="aspect aspect--4x3">
              <div class="aspect__inner">
                <p>{{image.name}}</p>
                <img v-if="loaded" class="photo" :src="get_photo(image)" />
                <div v-else class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <!-- <PhotoAttribution username={image.username} name={image.name} /> -->
                <!-- <div id="category">
                  <p>{{image.category.name}}</p>
                </div> -->
              </div>
            </div>
          </div>
        <div class="w-25 my-sizer-element"></div>
      </div>
    </div>
  </div>
</template>

<script> 
import axios from 'axios'
import Shuffle from 'shufflejs'
import Demo from '../assets/shuffle-demo.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const grayPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
const blackPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
const greenPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02Vz4HwAE9AJhcLBN6AAAAABJRU5ErkJggg=='
export default {
  name: 'Portals',
  data () {
    return {  
      portals: [],
      photos: [
        { id: 1, src: grayPixel  },
        { id: 2, src: blackPixel },
        { id: 3, src: greenPixel },
      ],
      loaded: false,
    }
  },
  created () {
  
  },
  mounted () {
    console.log('initialized shuffle')
    // Kick off the network request and update the state once it returns.
    this._fetchPhotos()
      // .then(this._whenPhotosLoaded.bind(this))
      // .then((x) => {
      //   console.log('photos:', x)
      //   this.photos = x
      //   this.loaded = true
      // })
      .then(() => {
        const element = document.getElementById('my-shuffle')
        console.log('element', element)
        this.demo = new Demo(element);
      })
  },
  beforeDestroy () {
    // Dispose of shuffle when it will be removed from the DOM.
    this.demo.shuffle.destroy();
    this.demo.shuffle = null;
  },
  updated() {
    // Fired every second, should always be true
    console.log('updated')
    console.log('this.demo', this.demo)
    this.demo.shuffle.resetItems()
    // console.log('updated')
  },
  methods: {
    //get photo for portal
    get_photo(port) {
      if (port.picture_url === "https://edibullapp.com/no-image.jpg") {
        return "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png";
      }
      if(port.picture_url != null) {
        return port.picture_url;
      }
      
      return "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png";
    },
    get_portal(port){
      console.log("get portal", port)
      // if(port.umbrella.name == "Fraternity and Sorority Life"){
      //   return '["Fraternity and Sorority Life"]';
      // } else if (port.umbrella.name == "Service") {
      //   return '["Service"]';
      // } else if (port.umbrella.name == "Sport Clubs") {
      //   return '["Sport Clubs"]';
      // } else if (port.umbrella.name == "Student Life") {
      //   return '["Student Life"]';
      // } else if (port.umbrella.name == "USF Health Morsani College of Medicine") {
      //   return '["Morsani College of Medicine"]';
      // } else if (port.umbrella.name == "Umbrella") {
      //   return '["Umbrella"]';
      // }

      // just testing out port.name, which works
      if (port.name.length > 0) {
        return '["Fraternities and Sorority Life"]';
      }
    },
    /**
     * Fake and API request for a set of images.
     * @return {Promise<Object[]>} A promise which resolves with an array of objects.
     */
    _fetchPhotos() {
      return new Promise((resolve) => {
        axios.get("https://edibullapp.com/portals")
          .then((x) => {
            // this.photos = response.data.portals
            this.photos = x.data.portals
            this.loaded = true
            resolve(x.data.portals)
          }, (err) => {
            console.log('axios err:', err)
        })

      });
    },
    /**
     * Resolve a promise when all the portals in an array have loaded.
     * @param {Object[]} photos Photos to load.
     * @return {Promise.<Object[]>} Loaded images.
     */
    // _whenPhotosLoaded(photos) {
    //   return Promise.all(photos.map(portal => new Promise((resolve) => {
    //     const image = document.createElement('img');
    //     image.src = this.get_photo(portal);
    //     portal.src = image.src
    //     console.log('image.src:', image.src);
    //     if (image.naturalWidth > 0 || image.complete) {
    //       resolve(portal);
    //     } else {
    //       image.onload = () => {
    //         resolve(portal);
    //       };
    //       image.onerror = () => {
    //         console.log('error loading image')
    //         portal.src = "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png"
    //         resolve(portal)
    //       };
    //     }
    //   })));
    // },
  },
}
</script>

<style scoped>
#search-container {
  margin-top: 10px;
}
.grid-container {
  display: grid;
  grid-row: 300px;
  grid-gap: 10px;
  margin: 10px;
}
/* filter buttons */
.btn {
  background-color: rgba(255, 255, 255, 0.726);
  color:  rgb(42, 83, 49);
  border: 2px solid  rgb(42, 83, 49);
  padding: 10px 16px;
  margin-right: 5px;
  text-align: center;
  transition-duration: 0.4s;
}
.btn:hover {
  background-color: rgb(42, 83, 49);
  color: white;
}
.filter-options .active {
  background-color: rgb(42, 83, 49);
  color: white;
}
.button {
  margin-right: 15px;
}
.card {
  box-shadow: 0 4px 8px o rgba(0,0,0,0.6);
  transition:0.4s;
  background: rgba(255, 255, 255, 0.712);
  width: 300px;
  overflow: hidden;
  border-radius: 30px;
  text-align: center;
  height: 220px;
}
.card:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
  -ms-transform: scale(1.2); /* IE 9 */
  -webkit-transform: scale(1.2); /* Safari 3-8 */
  transform: scale(1.2); 
}
.photo {
  width: 50%;
  height: 50%;
  border-radius: 10px;
  margin:10px
}
/* loading css */
.lds-grid {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-grid div {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 6px;
  left: 6px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 6px;
  left: 26px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 6px;
  left: 45px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 26px;
  left: 6px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 26px;
  left: 26px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 26px;
  left: 45px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 45px;
  left: 6px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 45px;
  left: 26px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 45px;
  left: 45px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>