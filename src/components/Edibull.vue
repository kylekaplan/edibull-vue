<template>
  <div>
    <ul id="Filter">
      <font id="subhead">Filter</font><br>
      <button class="button" type="submit" value="Speaker">Speaker</button>
      <button class="button" type="submit" value="Employment">Employment</button>
      <button class="button" type="submit" value="Fundraiser">Fundraiser</button>
      <button class="button" type="submit" value="Volunteer">Volunteer</button>
      <button class="button" type="submit" value="Free Food">Free Food</button>
    </ul>

      <div class="grid-container" id="grid">
        <div class="card" v-for="event in events" :key="event.id" :data-groups='[get_group(event)]'>
          <a href="">
          <font id="time">{{display_time(event)}}</font>
          <div class="photo">
            <img alt="Event Photo" :src="get_photo(event)" style="height:150px;border-radius:50%;margin:10px">
          </div>
          <div class="info">
            <h3>{{event.title}} </h3>
            <p>{{event.freeFoodApproved[0]}}</p><br>
          </div>
          </a>
        </div>
      </div>
  </div>
</template>

<script> 
import axios from 'axios'
import Shufflejs from 'shufflejs'

export default {
    name: 'Edibull',
    data () {
    return {
      events: [],
    }
  },

  mounted () {
    axios.get("https://edibullapp.com/events?approved=true")
      .then((response) => {
        this.events = response.data.events;
        console.log('this.events', this.events)
      }, (error) => {
        // pass
      })    

    const shuffleInstance = new Shuffle(document.getElementById('grid'), {
      itemSelector: '.card',
     // sizer: '.js-shuffle-sizer'
    });
  },
  
  methods: {

    //get photo for event
    get_photo(event) {
      if (event.thumbnail_url != null) {
          return event.thumbnail_url;
      } else if(event.portal.picture_url != null) {
          return event.portal.picture_url;
      }
      return "./assets/edibullFINAL 1024.png";
    },

    get_group(event){
      if(event.speakerApproved.lenght > 0){
        return "Speaker";
      } else if (event.employmentApproved.length > 0) {
        return "Employment";
      } else if (event.fundraiseApproved.length > 0) {
        return "Fundraiser";
      } else if (event.volunteerApproved.length > 0) {
        return "Volunteer";
      } else if (event.freeFoodApproved.length > 0) {
        return "Free Food";
      }
    },

    display_time(event){
      const startUtcTime = new Date(event.dates[0].starts_at)
      var startTimeValue = this.getTime(startUtcTime)

      const endUtcTime = new Date(event.dates[0].ends_at)
      var endTimeValue = this.getTime(endUtcTime)

      return startTimeValue + " - " + endTimeValue;
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
      timeValue += (hours >= 12) ? ' pm' : ' am' // get AM/PM
      return timeValue
    },
  }
}

</script>

<style scope>

#subhead {
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
  background: rgba(255, 255, 255, 0.63);
  margin: 10px;
  width: 100%;
  height: 200px;
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
  font-family: Verdana, Geneva, Tahoma, sans-serif;
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

a {
  text-decoration: none;
}

</style>