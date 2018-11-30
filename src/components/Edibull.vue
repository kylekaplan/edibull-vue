<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="column left filters-group-wrap">
          <div class="filters-group">
            <!-- Filter buttons -->
            <div class="btn-group filter-options">
              <button class="btn btn--primary active" id="all" data-group="All">All</button>
              <button class="btn btn--primary" data-group="Speaker">Speaker</button>
              <button class="btn btn--primary" data-group="Free Food">Free Food</button>
              <button class="btn btn--primary" data-group="Fundraiser">Fundraiser</button>
              <button class="btn btn--primary" data-group="Employment">Employment</button>
              <button class="btn btn--primary" data-group="Volunteer">Volunteer</button>
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
            <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input" placeholder="Search Events, Organizations, or Descriptions...">
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Grid containing all cards -->
      <div class="grid-container" id="grid">
        <!-- wrapper for each card, cycles through events to get info -->
        <div class="card" v-for="event in events" :key="event.id"
          :data-groups="get_group(event)"
          :data-date='[event.dates[0].starts_at.substr(0, 10)]'
          :data-title="event.title"
          >
          <!-- inner card wrapper -->
          <div class="card_wrap" v-on:click="display_card($event)">
          <!-- "more" class = info to be displayed on click -->
          <font class="time">{{time_preview(event)}}<span class="more"> - {{display_time(event)}}</span></font>
          <div class="photo">
            <img alt="Event Photo" class="eventPhoto" :src="get_photo(event)">
          </div>
          <div class="info">
            <br>
            <div id="card_info">
              <span class="preview"><h5 class="eventTitle">{{event.title}}</h5></span>
              <span class="more"><h2 class="eventTitle">{{event.title}}</h2></span>
              <span class="more"><h3>Location: {{event.location}}</h3></span>
              <span class="more"><h3>Hosted by: <a :href="event.portal.links.web">{{event.portal.name}}</a></h3></span>
            </div>
            <div id="description">
            <p class="eventDescript"><span class="preview">{{event.freeFoodApproved[0]}}</span>
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


export default {
    name: 'Edibull',
    data () {
    return {
      events: [],
    }
  },
  created () {
    axios.get("https://edibullapp.com/events?approved=true")
      .then((response) => {
        this.events = response.data.events;
        console.log('this.events', this.events)
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
    
    get_photo(event) { // get time of event
      if (event.thumbnail_url != null) {
          return event.thumbnail_url;
      } else if(event.portal.picture_url != null) {
          return event.portal.picture_url;
      }
      return "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png";
    },
    get_group(event){ //assign card a group
      if(event.speakerApproved.length > 0){
        return '["Speaker"]';
      } else if (event.employmentApproved.length > 0) {
        return '["Employment"]';
      } else if (event.fundraiseApproved.length > 0) {
        return '["Fundraiser"]';
      } else if (event.volunteerApproved.length > 0) {
        return '["Volunteer"]';
      } else if (event.freeFoodApproved.length > 0) {
        return '["Free Food"]';
      }
    },
    time_preview(event) { //display month, day, and start time
      const startUtcTime = new Date(event.dates[0].starts_at)
      var startTimeValue = this.getTime(startUtcTime)
      var months = ['Jan.', 'Feb.', 'March', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
      var month = event.dates[0].starts_at.substring(5, 7);

      return  months[month - 1] + " " + event.dates[0].starts_at.substring(8, 10) + " | " + startTimeValue;
    },

    display_time(event){ //display month, day, start and end times
      const endUtcTime = new Date(event.dates[0].ends_at)
      var endTimeValue = this.getTime(endUtcTime)
      return endTimeValue;
    },
    
    getTime (utcTime) { // get time of event
      const hours = Number(utcTime.getHours())
      const minutes = Number(utcTime.getMinutes())

      // calculate
      let timeValue
      if (hours > 0 && hours <= 12) {
        timeValue = `${hours}`
      } else if (hours > 12) {
        timeValue = `${hours - 12}`
      } else if (hours === 0) {
        timeValue = '12'
      }

      timeValue += (minutes < 10) ? `:0${minutes}` : `:${minutes}` // get minutes
      timeValue += (hours >= 12) ? 'pm' : 'am' // get AM/PM
      return timeValue;
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
    margin-top: 15px;
    float: right;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    -webkit-transition: width 0.8s ease-in-out;
    transition: width 0.4s ease-in-out; 
}

input[type=search]:focus {
    width: 80%;
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

.fsm_actual .active:hover{
  box-shadow: none;
}

#backout {
  float:right;
  margin: 10px 20px 10px 0px;
}

</style>