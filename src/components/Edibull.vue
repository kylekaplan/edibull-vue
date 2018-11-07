<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="column left filters-group-wrap">
          <div class="filters-group">
            <div class="btn-group filter-options">
              <button class="btn btn--primary" data-group="Speaker">Speaker</button>
              <button class="btn btn--primary" data-group="Free Food">Free Food</button>
              <button class="btn btn--primary" data-group="Fundraiser">Fundraiser</button>
              <button class="btn btn--primary" data-group="Employment">Employment</button>
              <button class="btn btn--primary" data-group="Volunteer">Volunteer</button>
            </div>
          </div>
          <fieldset class="filters-group">
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
          <div id="look_up">
          <div class="filters-group" id="search_bar">
            <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input" placeholder="Search Events...">
          </div>
          </div>
        </div>
      </div>
    </div>
      <div class="grid-container" id="grid">
        <div class="card" v-for="event in events" :key="event.id"
          :data-groups="get_group(event)"
          :data-date='[event.dates[0].starts_at.substr(0, 10)]'
          :data-title="event.title"
          >
          <a href="">
          <font class="time">{{display_time(event)}}</font>
          <div class="photo">
            <img alt="Event Photo" :src="get_photo(event)" style="height:150px;border-radius:50%;margin:10px">
          </div>
          <div class="info">
            <br>
            <div id="card_info">
              <h5 class="eventTitle">{{event.title}}</h5>
            </div>
            <p class="eventDescript">{{event.freeFoodApproved[0]}}</p>
          </div>
          </a>
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
        this.demo = new Demo(document.getElementById('grid'));
      }, (error) => {
        // pass
      })
  },
  mounted () {
    console.log('mounted');
    // this.demo = new Demo(document.getElementById('grid'));
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
    // get photo for event
    get_photo(event) {
      if (event.thumbnail_url != null) {
          return event.thumbnail_url;
      } else if(event.portal.picture_url != null) {
          return event.portal.picture_url;
      }
      return "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png";
    },
    get_group(event){
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
    display_time(event) {
      const startUtcTime = new Date(event.dates[0].starts_at)
      var startTimeValue = this.getTime(startUtcTime)
      var months = ['Jan.', 'Feb.', 'March', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
      var month = event.dates[0].starts_at.substring(5, 7);

      return  months[month - 1] + " " + event.dates[0].starts_at.substring(8, 10) + " | " + startTimeValue;
    },
    // get time of event
    getTime (utcTime) {
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
      return timeValue
    },
  }
}

</script>

<style>
.highlight{
  background-color: rgb(255, 255, 0, 0.8);
}
</style>


<style scoped>

.highlight{
  background-color: yellow;
}

.eventTitle {
  color: rgb(42, 83, 49);
}

#search_bar {
  margin-top: 10px;
  float: right;
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

.card {
  box-shadow: 0 4px 8px o rgba(0,0,0,0.6);
  transition:0.4s;
  background: rgba(255, 255, 255, 0.712);
  margin: 10px;
  width: 400px;
  overflow: hidden;
  border-radius: 30px;
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
</style>