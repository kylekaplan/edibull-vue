<template>
  <div>
    <div class="container">
      <div id="search-container">
        <div class="row">
          <div class="col-4@sm col-3@md">
            <div id="look_up">
              <div class="filters-group" id="search_bar">
                <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input" placeholder="Search Portals...">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-12@sm filters-group-wrap">
            <div class="filters-group">
              <p class="filter-label">Filter</p>
              <div class="btn-group filter-options"> -->
                <!-- makeSubmenu(this.value) -->
                <!-- <button v-on:click="buttonActive" class="btn btn--primary" data-group="Fraternity and Sorority Life">Fraternity and Sorority Life</button>
                <button v-on:click="buttonActive" class="btn btn--primary" data-group="Service">Service</button>
                <button v-on:click="buttonActive" class="btn btn--primary" data-group="Sport Clubs">Sport Clubs</button>
                <button v-on:click="buttonActive" class="btn btn--primary" data-group="Student Life">Student Life</button>
                <button v-on:click="buttonActive" class="btn btn--primary" data-group="Student Organizations">Student Organizations</button>
                <button v-on:click="buttonActive" class="btn btn--primary" data-group="USF Health Morsani College of Medicine">Morsani College of Medicine</button>
                <button v-on:click="buttonActive" class="btn btn--primary" data-group="Others">Others</button>
              </div>
            </div>
          </div> -->

          <div class="filters-group">
            <div class="btn-group filter-options">
              <button v-on:click="buttonActive(cat)" class="btn btn--primary" v-for="cat in categories" v-bind:data-group="cat.umbrella" :key="cat.umbrella">
                {{cat.umbrella}}
              </button>
            </div>
          </div>
          <div class="form-group filters-group">
            <div class="btn-group filter-options">
              <select v-on:change="onchange($event)" class="form-control" name="categories" id="categories" v-model="categories">
                <option :value="null" disabled selected>Choose an umbrella</option>
              </select>
            </div>
          </div>
          <!-- <div class="filters-group">
            <div class="btn-group filter-options">
              <button v-on:click="buttonActive" class="btn btn--primary" v-for="option in categories" v-bind:data-group="option.umbrella" v-bind:value="option.id" :key="option.umbrella">
              {{option.subCategories}}</button>
            </div>
          </div> -->

          <!-- <div class="form-group filters-group">
            <div class="btn-group filter-options">
              <select v-on:change="onchange($event)" class="form-control" name="categories" id="categories" v-model="categories">
                <option :value="null" disabled selected>Choose an umbrella</option>
                <option v-for="option in cat_options" :data-group="option.umbrella" :value="option.id" :key="option.umbrella">
                  {{option.umbrella}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <select @change="onchange" class="form-control" name="subcategories" id="subcategories" v-model="subcategories">
              <option :value="null" disabled selected>Choose a subcategory</option>
              <option v-for="option in subcat_options[categories]" v-bind:data-group="option.umbrella" v-bind:value="option.id" :key="option.umbrella">
                {{option.umbrella}}</option>
            </select>
          </div> -->
          <p>{{category}} button was pressed</p>
        </div>
      </div>
      <div class="grid-container" id="grid">
          <div v-for="image in photos" :key="image.id" class="w-25 p-1 card"
            :data-groups="get_portal(image)"
          >
            <!-- 
            "data-date-created="2017-04-30"
            data-title="Lake Walchen" -->
            <div class="aspect aspect--4x3">
              <div class="aspect__inner">
                <p class="portTitles">{{image.name}}</p>
                <img v-if="loaded" class="photo" :src="get_photo(image)" />
                <div v-else class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
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
// import Shuffle from 'shufflejs'
import Demo from '../assets/shuffle-demo';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const grayPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
const blackPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
const greenPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02Vz4HwAE9AJhcLBN6AAAAABJRU5ErkJggg=='
export default {
  name: 'Portals',
  data () {
    return {  
      // testing counter
      isActive: false,
      category: null,
      portals: [],
      photos: [
        { id: 1, src: grayPixel  },
        { id: 2, src: blackPixel },
        { id: 3, src: greenPixel },
      ],
      loaded: false,
      // categories: null,
      // subcategories: null,
      categories: [
        {
          umbrella: 'Fraternity and Sorority Life',
          subCategories: [
            "Council", 
            "Honor Society",
            "Interfraternity Council",
            "Multicultural Greek Council",
            "National Pan-Hellenic Council",
            "Panhellenic Association",
          ]
        },
        {
          umbrella: 'Service',
          subCategories: [
            "Animals (Community Partners)",
            "Culture Awareness (Community Partners)",
            "Disabilities(Community Partners)",
            "Disaster Relief (Community Partners)",
            "Education/Literacy (Community Partners)",
            "Environmental (Community Partners)",
            "Family Services (Community Partners)",
            "General Service (Community Partners)",
            "Health & Wellness (Community Partners)",
            "Hunger & Homelessness Services (Community Partners)",
            "Hunger & Nutrition (Community Partners)",
            "Political Engagement (Community Partners)",
            "Senior Citizen (Community Partners)",
            "Veterans (Community Partners)",
            "Youth Development (Community Partners)",
          ]
        },
        {
          umbrella: 'Student Life',
        },
        {
          umbrella: 'Student Organizations',
        },
        {
          umbrella: 'USF Health Morsani College of Medicine',
        },
        {
          umbrella: 'Umbrella',
        }
      ],
      // cat_options: [
      //   {umbrella: 'Fraternity and Sorority Life', id: 1},
      //   {umbrella: 'Service', id: 2},
      //   {umbrella: 'Student Life', id: 3},
      //   {umbrella: 'Student Organizations', id: 4},
      //   {umbrella: 'USF Health Morsani College of Medicine', id: 5},
      //   {umbrella: 'Umbrella', id: 6},
      // ],
      // subcat_options: { 
      //   1: [{ umbrella: "Council", id: 1 }, 
      //       { umbrella: "Honor Society", id: 2},
      //       { umbrella: "Interfraternity Council", id: 3},
      //       { umbrella: "Multicultural Greek Council", id: 4},
      //       { umbrella: "National Pan-Hellenic Council", id: 5},
      //       { umbrella: "Panhellenic Association", id: 6},
      //   ],
      //   2: [{ umbrella: "Animals (Community Partners)", id: 1 }, 
      //       { umbrella: "Culture Awareness (Community Partners)", id: 2},
      //       { umbrella: "Disabilities(Community Partners)", id: 3},
      //       { umbrella: "Disaster Relief (Community Partners)", id: 4},
      //       { umbrella: "Education/Literacy (Community Partners)", id: 5},
      //       { umbrella: "Environmental (Community Partners)", id: 6},
      //       { umbrella: "Family Services (Community Partners)", id: 7},
      //       { umbrella: "General Service (Community Partners)", id: 8},
      //       { umbrella: "Health & Wellness (Community Partners)", id: 9},
      //       { umbrella: "Hunger & Homelessness Services (Community Partners)", id: 10},
      //       { umbrella: "Hunger & Nutrition (Community Partners)", id: 11},
      //       { umbrella: "Political Engagement (Community Partners)", id: 12},
      //       { umbrella: "Senior Citizen (Community Partners)", id: 13},
      //       { umbrella: "Veterans (Community Partners)", id: 14},
      //       { umbrella: "Youth Development (Community Partners)", id: 15},
      //   ],
      //   3: [{ umbrella: "Administrative", id: 1 }, 
      //       { umbrella: "Sport Club", id: 2},
      //   ],
      //   4: [{ umbrella: "Academic", id: 1 }, 
      //       { umbrella: "Departmental", id: 2},
      //       { umbrella: "Faith-Based", id: 3},
      //       { umbrella: "Other", id: 4},
      //       { umbrella: "Special Interest", id: 5},
      //       { umbrella: "University", id: 6},
      //   ],
      //   5: [{ umbrella: "Academic & Professional", id: 1 }, 
      //       { umbrella: "Campus-Wide", id: 2},
      //       { umbrella: "Councils", id: 3},
      //       { umbrella: "Graduate", id: 4},
      //       { umbrella: "Honor", id: 5},
      //       { umbrella: "International", id: 6},
      //       { umbrella: "Multicultural", id: 7},
      //       { umbrella: "Political", id: 8},
      //       { umbrella: "Recreational", id: 9},
      //       { umbrella: "Religious", id: 10},
      //       { umbrella: "Service- Animal Welfare", id: 11},
      //       { umbrella: "Service- Community Development", id: 12},
      //       { umbrella: "Service- Environmental", id: 13},
      //       { umbrella: "Service- General", id: 14},
      //       { umbrella: "Service- Health Care", id: 15},
      //       { umbrella: "Service- Hunger & Homelessness", id: 16},
      //       { umbrella: "Service- Senior Citizen Care", id: 17},
      //       { umbrella: "Service- Social Justice", id: 18},
      //       { umbrella: "Service- Youth & Education", id: 19},
      //       { umbrella: "Social Justice", id: 20},
      //       { umbrella: "Special Interest", id: 21},
      //   ],
      //   6: [{ umbrella: "Academic/Professional", id: 1 }, 
      //       { umbrella: "Cultural", id: 2},
      //       { umbrella: "Departmental", id: 3},
      //       { umbrella: "Graduate", id: 4},
      //       { umbrella: "International", id: 5},
      //       { umbrella: "Religious", id: 6},
      //       { umbrella: "Service", id: 7},
      //       { umbrella: "Special Interest", id: 8},
      //       { umbrella: "Student Governance", id: 9},
      //   ],
      //   7: [{ umbrella: "Academic/Professional", id: 1 }, 
      //       { umbrella: "Campus-Wide", id: 2},
      //       { umbrella: "Departmental", id: 3},
      //       { umbrella: "University", id: 4},
      //       { umbrella: "University (Community Partners)", id: 5},
      //   ],
      // },
    }
  },
  // [{ umbrella: "Academic & Professional", id: 1 }, 
  //           { umbrella: "Academic", id: 2},
  //           { umbrella: "Academic/Professional", id: 3},
  //           { umbrella: "Administrative", id: 4},
  //           { umbrella: "Animals (Community Partners)", id: 5},
  //           { umbrella: "Council", id: 7},
  //           { umbrella: "Councils", id: 8},
  //           { umbrella: "Cultural", id: 9},
  //           { umbrella: "Culture/Awareness (Community Partners)", id: 10},
  //           { umbrella: "Departmental", id: 11},
  //           { umbrella: "Disabilities (Community Partners)", id: 12},
  //           { umbrella: "Education/Literacy (Community Partners)", id: 13},
  //           { umbrella: "Environmental (Community Partners)", id: 14},
  //           { umbrella: "Faith-Based", id: 15},
  //           { umbrella: "Family Services (Community Partners)", id: 16},
  //           { umbrella: "Gerneral Service (Community Partners)", id: 17},
  //           { umbrella: "Graduate", id: 18},
  //       ], 
  created () {
    axios.get("https://edibullapp.com/portals")
      .then((x) => {
        // this.photos = response.data.portals
        this.photos = x.data.portals
        this.loaded = true
        this.demo = new Demo(document.getElementById('grid'));
        // resolve(x.data.portals)
      }, (err) => {
        console.log('axios err:', err)
    })
  
  },
  mounted () {
    console.log('initialized shuffle')
    // Kick off the network request and update the state once it returns.
    // this._fetchPhotos()
      // .then(this._whenPhotosLoaded.bind(this))
      // .then((x) => {
      //   console.log('photos:', x)
      //   this.photos = x
      //   this.loaded = true
      // })
      // .then(() => {
      //   const element = document.getElementById('my-shuffle')
      //   console.log('element', element)
      //   this.demo = new Demo(element);
      // })
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
      try {
        var umbrellaName = port.umbrella.name;
        if (umbrellaName !== undefined) {
          return  '["' + umbrellaName + '"]'
        } else {
          return '["Others"]'
        }
        return
      } catch (error) {
        return '["No Name"]'
      }
    },
    filterOut: function(items) {
      return items.filter(function(item) {
        return this.umbrella == this.category;
      })
    },
    buttonActive: function(event) {
      var attribute = event.target.getAttribute("data-group");
      this.category = attribute;
      console.log("attribute::", attribute);
      
    },
    onchange: function(e) {
      var btn = e.currentTarget
      // $("#categories").find("option[data-group=Fraternity and Sorority Life]").addClass("active");
      console.log("this.category_options.umbrella", this.categories);
      alert(this.categories);
    }
    /**
     * Fake and API request for a set of images.
     * @return {Promise<Object[]>} A promise which resolves with an array of objects.
     */
    // _fetchPhotos() {
    //   return new Promise((resolve) => {
    //     axios.get("https://edibullapp.com/portals")
    //       .then((x) => {
    //         // this.photos = response.data.portals
    //         this.photos = x.data.portals
    //         this.loaded = true
    //         resolve(x.data.portals)
    //       }, (err) => {
    //         console.log('axios err:', err)
    //     })

    //   });
    // },
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
.portTitle {
  color: rgb(42, 83, 49);
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