<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="column left filters-group-wrap">
          <div class="filters-group">
            <!-- Filter buttons -->
            <div class="btn-group filter-options">
              <button class="btn btn--primary active" id="all" data-group="All">All</button>
              <button class="btn btn--primary" data-group="speaker">Speaker</button>
              <button class="btn btn--primary" data-group="freeFood">Free Food</button>
              <button class="btn btn--primary" data-group="fundraise">Fundraiser</button>
              <button class="btn btn--primary" data-group="employment">Employment</button>
              <button class="btn btn--primary" data-group="volunteer">Volunteer</button>
            </div>
          </div>
          <fieldset class="filters-group">
            <!-- Date and Title filter -->
            <div class="button-group sort-options">
              <label class="button active">
                <input type="radio" name="sort-value" value="dom"> Date
              </label>
              <label class="button">
                <input type="radio" name="sort-value" value="title"> Title
              </label>
            </div>
          </fieldset>
        </div>
        <div class="column right">
          <!-- Search Bar -->
          <div id="look_up">
            <div class="filters-group" id="search_bar">
              <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input" placeholder="Search Events, Organizations, or Descriptions..." />
              <!-- <span class="search_icon"></span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Grid containing all cards -->
      <div class="grid-container" id="grid">
        <!-- wrapper for each card, cycles through events to get info -->
        <div class="card" v-for="event in events" :key="event.occurrenceId"
          :data-groups='get_group(event)'
          :data-date="event.starts_at.substr(0, 10)"
          :data-title="event.title"
          >
          <!-- inner card wrapper -->
          <div class="card_wrap" v-on:click="display_card($event)">
          <!-- "more" class = info to be displayed on click -->
          <font class="time">{{event.date}} | {{event.startTime}}<span class="more"> - {{event.endTime}}</span></font>
          <div class="photo">
            <img alt="Event Photo" class="eventPhoto" :src="event.thumbnail">
          </div>
          <div class="info">
            <br>
            <div id="card_info">
              <span class="preview"><h5 class="eventTitle">{{event.title}}</h5></span>
              <span class="more"><h2 class="eventTitle">{{event.title}}</h2></span>
              <span class="more"><h3>Location: {{event.location}}</h3></span>
              <span class="more"><h3>Hosted by: <a :href="event.link" target="_blank">{{event.host}}</a></h3></span>
            </div>
            <div id="description">
            <p class="eventDescript"><span class="preview">{{event.snip}}</span>
              <span class="more">{{event.description}}</span>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script> 
import axios from 'axios'
import Demo from '../assets/shuffle-demo';
import { createSections, categoryArray } from '../assets/tools/tools'

export default {
    name: 'Edibull',
    data () {
    return {
      events: [],
    }
  },
  created () {
    let categoryStr = ''
    categoryArray.forEach((cat) => {
      categoryStr += `${cat.id}Approved,`
    })
    const url = `https://edibullapp.com/events?category=${categoryStr}&data=${categoryStr}id,title,dates,location,portal.id,portal.name,portal.picture_url,description,thumbnail_url`
    console.log(url)
    axios.get(url)
      .then((response) => { 
        this.events = createSections(response.data.events)
        console.log("this.events", this.events)
      }, (error) => {
        console.log('axios err:', err)
      })
  },
  mounted () {
    this.demo = new Demo(document.getElementById('grid'));
    this.demo.shuffle.options.columnWidth = "42";
    this.demo.shuffle.update();
  },
  
  beforeDestroy () {
    // Dispose of shuffle when it will be removed from the DOM.
    this.demo.shuffle.destroy();
    this.demo.shuffle = null;
  },
  updated() {
    // Fired every second, should always be true
    this.demo.shuffle.resetItems()
  },
  methods: {
    
    // get_photo(event) { // get time of event
    //   if (event.thumbnail_url != null) {
    //       return event.thumbnail_url;
    //   } else if(event.portal.picture_url != null) {
    //       return event.portal.picture_url;
    //   }
    //   return "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png";
    // },

    get_group(e) {
      return "[\""+e.category+"\"]";
    },

    display_card(e) { //display big card on click

      var card = e.target.closest('.card'); //find wrapper

      card.classList.add('active'); //add active to class of card

      //create big card
      var fsmactual = document.createElement("div");
      fsmactual.setAttribute('class', 'fsm_actual');
      var fsminner = document.createElement("div");
      fsminner.setAttribute('class', 'fsm_inner');
      var temp = card.cloneNode(true);

      //create exit button and style it
      var btn = document.createElement("BUTTON");
      btn.setAttribute('class', 'exit');
      btn.appendChild(document.createTextNode("x"));
      btn.style.backgroundColor = "rgb(42, 83, 49)";
      btn.style.color = "white";
      btn.style.borderRadius = "10px";
      btn.style.position = "absolute";
      btn.style.marginTop = "5px";
      btn.style.marginLeft = "15px";
      btn.style.height = "38px";
      btn.style.width = "40px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";

      //style big card
      temp.style.cssText = "";
      temp.style.position="fixed";
      temp.style.top=0;
      temp.style.left=0;

      //add exit button to card clone, then send clone to body 
      temp.insertBefore(btn, temp.childNodes[0]);
      fsminner.appendChild(temp);
      fsmactual.appendChild(fsminner);
      document.body.appendChild(fsmactual);
      btn.addEventListener("click", back_out); //add back_out function to exit button
    },
  }
}
var back_out = function(){ //deletes big card
  var fsmActual = document.getElementsByClassName("fsm_actual");
  fsmActual[0].remove();
}

</script>

<style>
.highlight{
  background-color: rgb(255, 255, 0, 0.8);
}
</style>

<style scoped>
.eventPhoto {
  height:150px;
  border-radius:50%; 
  margin:10px;
}

/*hides content in more*/
.more { 
  display: none;
  overflow: hidden;
}

.eventTitle {
  color: rgb(42, 83, 49);
}

.column {
    float: left;
    width: 50%;
}

.btn-group {
  margin-top: 10px;
}

.sort-options {
  margin-top: 10px;
}

.grid-container {
  margin-left: 40px;
  margin-right: 40px;
}

.textfield {
  padding: 5px;
}

input[type=search] {
    width: 130px;
    margin-top: 10px;
    float: right;
    box-sizing: border-box;
    border: 2px solid rgb(42, 83, 49);
    border-radius: 4px;
    font-size: 16px;
    -webkit-transition: width 0.8s ease-in-out;
    transition-property: width, border-radius;
    transition-duration: 0.7s ease-in-out;
    outline: none;
}

input[type=search]:focus {
  width: 80%;
  border-radius: 20px;
  background-image: url('../assets/searchicon.png');
  background-position: right;
  background-repeat: no-repeat;
}

.card {
  box-shadow: 0 4px 8px o rgba(0,0,0,0.6);
  background: rgba(255, 255, 255, 0.712);
  margin: 10px;
  width: 400px;
  overflow: hidden;
  border-radius: 30px;
  cursor: pointer;
}

.card:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
  background: rgba(255, 255, 255, 0.918);
}

.info{
  padding: 2px 16px;
  text-align: center;
  margin-top: 30px;
  color: black;
}

.photo {
  float: left;
}

.time {
  font-size: 15px;
  float: right;
  margin-top: 20px;
  margin-right: 30px;
  margin-left: 40px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;

}

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

.fsm_actual {
  position: fixed;
  top: 0;
  left: 0;
}

.fsm_actual .active{
  transition: all 2s ease-in-out;  
  height: 98%;
  width: 98%;
  z-index: 100;
  margin-top: 10px;
  background-color: white;
  font-size: 25px;
  overflow: auto;

}

.fsm_actual .active .eventPhoto {
  height: 300px;
  margin: 50px 20px 25px 25px;
  border-radius: 10px;
}

.fsm_actual .active .preview {
  display: none;
  overflow: hidden;
}

.fsm_actual .active .more {
  display: inline;
}

.fsm_actual .active #description {
  float: right;
  margin-right: 20px;
  max-width: 900px;
}

.fsm_actual .active:hover{
  box-shadow: none;
}

#backout {
  float:right;
  margin: 10px 20px 10px 0px;
}

</style>