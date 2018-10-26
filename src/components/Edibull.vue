<template>
  <div>
    <ul id="Filter">
      <font id="subhead">Filter</font><br>
      <button class="button" type="submit" data-value="Speaker">Speaker</button>
      <button class="button" type="submit" data-value="Employment">Employment</button>
      <button class="button" type="submit" data-value="Fundraiser">Fundraiser</button>
      <button class="button" type="submit" data-value="Volunteer">Volunteer</button>
      <button class="button" type="submit" data-value="Free Food">Free Food</button>
    </ul>

      <div class="grid-container" id="my-shuffle">
        <div class="card" v-for="event in events" :key="event.id" :data-groups='[get_group(event)]' :data-date='[event.dates[0].starts_at.substr(0, 10)]'>
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
          <div class="w-25 photo-grid__sizer"></div>
        </div>
      </div>
  </div>
</template>

<script> 
import axios from 'axios'
import Shuffle from 'shufflejs'

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

    var Demo=function (element){
      this.groups = Array.from(document.querySelectorAll('.js-groups button'));

      // The elements are in the DOM, initialize a shuffle instance.
      this.shuffle = new Shuffle(document.getElementById("my-shuffle"), {
        itemSelector: '.card',
        sizer: '.photo-grid__sizer',
      });

      this.filters = {
      groups: []
      };
    this._bindEventListeners();
    };

    /* Bind event listeners for when the filters change.*/
    Demo.prototype._bindEventListeners = function () {
      this._onGroupsChange = this._handleGroupsChange.bind(this);

      this.groups.forEach(function (button) {
        button.addEventListener('click', this._onGroupsChange);
      }, this);
    };

    // Get the values of each `active` button.
    //  @return {Array.<string>}
    Demo.prototype._getCurrentGroupsFilters = function () {
      return this.colors.filter(function (button) {
        return button.classList.contains('active');
      }).map(function (button) {
        return button.getAttribute('data-value');
      });
    };

    //  A color button was clicked. Update filters and display.
    //  @param {Event} evt Click event object
    Demo.prototype._handleGroupsChange = function (evt) {
      var button = evt.currentTarget;

      // Treat these buttons like radio buttons where only 1 can be selected.
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      } else {
        this.colors.forEach(function (btn) {
          btn.classList.remove('active');
        });

        button.classList.add('active');
      }

      this.filters.groups = this._getCurrentGroupsFilters();
      this.filter();
    };

    /* Filter shuffle based on the current state of filters. */
    Demo.prototype.filter = function () {
      if (this.hasActiveFilters()) {
        this.shuffle.filter(this.itemPassesFilters.bind(this));
      } else {
        this.shuffle.filter(Shuffle.ALL_ITEMS);
      }
    };

    //  If any of the arrays in the `filters` property have a length of more than zero,
    //  that means there is an active filter.
    //  @return {boolean}
    Demo.prototype.hasActiveFilters = function () {
      return Object.keys(this.filters).some(function (key) {
        return this.filters[key].length > 0;
      }, this);
    };

    //  Determine whether an element passes the current filters.
    //  @param {Element} element Element to test.
    //  @return {boolean} Whether it satisfies all current filters.
    Demo.prototype.itemPassesFilters = function (element) {
      var groups = this.filters.groups;
      var group = element.getAttribute('data-groups');

      // If there are active color filters and this color is not in that array.
      if (groups.length > 0 && !groups.includes(group)) {
        return false;
      }

      return true;
    };

    document.addEventListener('DOMContentLoaded', function () {
      window.demo = new Demo(document.querySelector('.js-shuffle'));
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
      return "http://localhost:8080/img/edibullFINAL%201024.8420ac53.png";
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