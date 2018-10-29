<template>
  <div>
    <!-- <ul id="Filter">
      <font id="filterLabel">Filter</font><br>
      <button class="button" type="submit" data-value="Speaker" v-on:click="myfilter('Speaker')">Speaker</button>
      <button class="button" type="submit" data-value="Employment" v-on:click="myfilter('Employment')">Employment</button>
      <button class="button" type="submit" data-value="Fundraiser" v-on:click="myfilter('Fundraiser')">Fundraiser</button>
      <button class="button" type="submit" data-value="Volunteer" v-on:click="myfilter('Volunteer')">Volunteer</button>
      <button class="button" type="submit" data-value="Free Food" v-on:click="myfilter('Free Food')">Free Food</button>
    </ul> -->
 <!-- start copy -->
        <div class="container">

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
            <button class="btn btn--primary" data-group="Speaker">Speaker</button>
            <button class="btn btn--primary" data-group="Free Food">Free Food</button>
            <button class="btn btn--primary" data-group="Fundraiser">Fundraiser</button>
            <button class="btn btn--primary" data-group="Employment">Employment</button>
            <button class="btn btn--primary" data-group="Volunteer">Volunteer</button>
          </div>
        </div>
        <fieldset class="filters-group">
          <legend class="filter-label">Sort</legend>
          <div class="btn-group sort-options">
            <label class="btn active">
              <input type="radio" name="sort-value" value="dom"> Default
            </label>
            <label class="btn">
              <input type="radio" name="sort-value" value="title"> Title
            </label>
            <label class="btn">
              <input type="radio" name="sort-value" value="date-created"> Date Created
            </label>
          </div>
        </fieldset>
      </div>
    </div>

  </div>
        <!-- end copy -->
      <div class="grid-container" id="grid">
       
        <div class="card" v-for="event in events" :key="event.id"
          :data-groups="get_group(event)"
          :data-date='[event.dates[0].starts_at.substr(0, 10)]'
          :data-title="event.title"
          >
          <a href="">
          <font id="time">{{display_time(event)}}</font>
          <div class="photo">
            <img alt="Event Photo" :src="get_photo(event)" style="height:150px;border-radius:50%;margin:10px">
          </div>
          <div class="info">
            <br>
            <h4 id="eventTitle">{{event.title}}</h4>
            <p>{{event.freeFoodApproved[0]}}</p>
          </div>
          </a>
          <div class="w-25 my-sizer-element"></div>
        </div>
      </div>
  </div>
</template>

<script> 
import axios from 'axios'
// import Shuffle from 'shufflejs'
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
        // pass
      })
  },
  mounted () {
    console.log('mounted');
    this.demo = new Demo(document.getElementById('grid'));
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

      return event.dates[0].starts_at.substring(5, 7) + "/" + event.dates[0].starts_at.substring(8, 10) + "/" + event.dates[0].starts_at.substring(2, 4) + " " + startTimeValue;
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

<style scoped>

#filterLabel {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-left: 5px;
}

.grid-container {
  display: grid;
  grid-template-columns: 425px 425px 425px;
  grid-row: 300px;
  grid-gap: 10px;
  margin: 15px;
}

.grid-container > div {
  box-shadow: 0 4px 8px o rgba(0,0,0,0.6);
  transition:0.4s;
  background: rgba(255, 255, 255, 0.712);
  margin: 10px;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 30px;
}

.card:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.6);
  -ms-transform: scale(1.2); /* IE 9 */
  -webkit-transform: scale(1.2); /* Safari 3-8 */
  transform: scale(1.2); 
  width:100%;
  height: 100%;
}

.info{
  padding: 2px 16px;
  text-align: center;
  margin-top: 30px;
}

.photo {
  float: left;
}

#time {
  font-size: 15px;
  float: right;
  margin-top: 20px;
  margin-right: 30px;
  margin-left: 40px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.button {
  background-color: rgba(255, 255, 255, 0.726);
  color:  rgb(42, 83, 49);
  border: 2px solid  rgb(42, 83, 49);
  padding: 10px 16px;
  margin-right: 5px;
  text-align: center;
  transition-duration: 0.4s;
}

.button:hover {
  background-color: rgb(42, 83, 49);
  color: white;
}

</style>