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
        <br>
        <div class="row">
          <!-- Category buttons -->
          <div class="filters-group">
            <div class="btn-group filter-options">
              <button v-on:click="buttonActive(cat, $event)" class="btn btn--primary" v-for="cat in categories" v-bind:data-group="cat" :key="cat">
                {{cat}}
              </button>
            </div>
            <br>
            <br>
            <!-- subcategory buttons -->
            <div class="filters-group" v-if="pressed.length > 0">
              <div class="btn-group filter-options">
                <button class="btn btn--primary" v-for="sub in subCat" v-bind:data-group="sub" :key="sub">
                  {{sub}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-container" id="grid">
          <div v-for="image in photos" :key="image.id" class="w-25 p-1 card"
            :data-groups="get_portal(image)"
          >
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
      portals: [],
      photos: [
        { id: 1, src: grayPixel  },
        { id: 2, src: blackPixel },
        { id: 3, src: greenPixel },
      ],
      loaded: false,
      pressed: [],
      subCat: [],
      catPressed: null,
      categories: [
        'Fraternity and Sorority Life',
        'Service', 
        'Sport Clubs',  
        'Student Life',
        'Student Organizations', 
        'USF Health Morsani College of Medicine', 
        'Umbrella',
      ],
      everything: {
        'Fraternity and Sorority Life': {
          subCategories: [
            "Council", 
            "Honor Society",
            "Interfraternity Council",
            "Multicultural Greek Council",
            "National Pan-Hellenic Council",
            "Panhellenic Association",
          ]
        },
        'Service': {
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
        'Sport Clubs' : {
          subCategories: [
            "Administrative",
            "Sport Club", 
          ]
        },
        'Student Life' : {
          subCategories: [
            "Academic",
            "Departmental",
            "Faith-Based",
            "Other",
            "Special Interest",
            "University",
          ]
        },
        'Student Organizations' : {
          subCategories: [
            "Academic & Professional",
            "Campus-Wide",
            "Councils",
            "Graduate",
            "Honor",
            "International",
            "Multicultural",
            "Political",
            "Recreational",
            "Religious",
            "Service- Animal Welfare",
            "Service- Community Development", 
            "Service- Environmental",
            "Service- General",
            "Service- Health Care",
            "Service- Hunger & Homelessness",
            "Service- Senior Citizen Care",
            "Service- Social Justice",
            "Service- Youth & Education",
            "Social Justice",
            "Special Interest",
          ]
        },
        'USF Health Morsani College of Medicine' : {
          subCategories: [
            "Academic/Professional",
            "Cultural",
            "Departmental",
            "Graduate",
            "International",
            "Religious",
            "Service",
            "Special Interest",
            "Student Governance",
          ]
        },
        'Umbrella' : {
          subCategories: [
            "Academic/Professional", 
            "Campus-Wide",
            "Departmental", 
            "University", 
            "University (Community Partners)", 
          ]
        }
      },      
    }
  },
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
        // console.log('umbrella name:', umbrellaName);
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
    buttonActive: function(cat, event) {
      var attribute = event.target.getAttribute("data-group");
      console.log("attribute::", cat);
      console.log ("actual button:: ", attribute); 

      // check if pressed attribute is in pressed array 
      var inArray = false;
      for (var i = 0; i < this.pressed.length; i++) {
        if (this.pressed[i] == attribute) {
          this.pressed.splice(i, 1);
          inArray = true;
          this.subCat = this.everything[this.pressed[(this.pressed.length-1)]].subCategories;
        }
      }
      if (!inArray) {
        this.pressed.push(attribute);
        this.subCat = this.everything[attribute].subCategories;
      }
      inArray = false;
      console.log("pressed array", this.pressed);

      // if buttons pressed, set bool catButtons true
      this.catPressed = event.target.classList.contains('active');
    },
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