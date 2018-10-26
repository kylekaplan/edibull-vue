<template>
  <div>
    <ul id="Filter">
      <font id="filterLabel">Filter</font><br>
      <button class="button" type="submit" data-value="Speaker" v-on:click="myfilter('Speaker')">Speaker</button>
      <button class="button" type="submit" data-value="Employment" v-on:click="myfilter('Employment')">Employment</button>
      <button class="button" type="submit" data-value="Fundraiser" v-on:click="myfilter('Fundraiser')">Fundraiser</button>
      <button class="button" type="submit" data-value="Volunteer" v-on:click="myfilter('Volunteer')">Volunteer</button>
      <button class="button" type="submit" data-value="Free Food" v-on:click="myfilter('Free Food')">Free Food</button>
    </ul>
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
            <button class="btn btn--primary" data-group="animal">Animal</button>
            <button class="btn btn--primary" data-group="city">City</button>
          </div>
        </div>
      </div>
    </div>

  </div>
        <!-- end copy -->
      <div class="grid-container" id="my-shuffle">
       
        <div class="card" v-for="event in events" :key="event.id" :data-groups="get_group(event)" :data-date='[event.dates[0].starts_at.substr(0, 10)]'>
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
      console.log('mount');

      'use strict';

var Shuffle = window.shuffle;

var Demo = function (element) {
  this.element = element;

  // Log out events.
  this.addShuffleEventListeners();

  this.shuffle = new Shuffle(element, {
    itemSelector: '.card',
    sizer: element.querySelector('.photo-grid__sizer'),
  });

  this._activeFilters = [];

  this.addFilterButtons();
  this.addSorting();
  this.addSearchFilter();

  this.mode = 'exclusive';
};

Demo.prototype.toArray = function (arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};

Demo.prototype.toggleMode = function () {
  if (this.mode === 'additive') {
    this.mode = 'exclusive';
  } else {
    this.mode = 'additive';
  }
};

/**
 * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
 * for them like you normally would (with jQuery for example). The extra event
 * data is in the `detail` property.
 */
Demo.prototype.addShuffleEventListeners = function () {
  var handler = function (event) {
    console.log('type: %s', event.type, 'detail:', event.detail);
  };

  this.element.addEventListener(Shuffle.EventType.LAYOUT, handler, false);
  this.element.addEventListener(Shuffle.EventType.REMOVED, handler, false);
};

Demo.prototype.addFilterButtons = function () {
  var options = document.querySelector('.filter-options');

  if (!options) {
    return;
  }

  var filterButtons = this.toArray(
    options.children
  );

  filterButtons.forEach(function (button) {
    button.addEventListener('click', this._handleFilterClick.bind(this), false);
  }, this);
};

Demo.prototype._handleFilterClick = function (evt) {
  var btn = evt.currentTarget;
  var isActive = btn.classList.contains('active');
  var btnGroup = btn.getAttribute('data-group');

  // You don't need _both_ of these modes. This is only for the demo.

  // For this custom 'additive' mode in the demo, clicking on filter buttons
  // doesn't remove any other filters.
  if (this.mode === 'additive') {
    // If this button is already active, remove it from the list of filters.
    if (isActive) {
      this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
    } else {
      this._activeFilters.push(btnGroup);
    }

    btn.classList.toggle('active');

    // Filter elements
    this.shuffle.filter(this._activeFilters);

  // 'exclusive' mode lets only one filter button be active at a time.
  } else {
    this._removeActiveClassFromChildren(btn.parentNode);

    var filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }

    this.shuffle.filter(filterGroup);
  }
};

Demo.prototype._removeActiveClassFromChildren = function (parent) {
  var children = parent.children;
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].classList.remove('active');
  }
};

Demo.prototype.addSorting = function () {
  var menu = document.querySelector('.sort-options');

  if (!menu) {
    return;
  }

  menu.addEventListener('change', this._handleSortChange.bind(this));
};

Demo.prototype._handleSortChange = function (evt) {
  var value = evt.target.value;
  var options = {};

  function sortByDate(element) {
    return element.getAttribute('data-created');
  }

  function sortByTitle(element) {
    return element.getAttribute('data-title').toLowerCase();
  }

  if (value === 'date-created') {
    options = {
      reverse: true,
      by: sortByDate,
    };
  } else if (value === 'title') {
    options = {
      by: sortByTitle,
    };
  }

  this.shuffle.sort(options);
};

// Advanced filtering
Demo.prototype.addSearchFilter = function () {
  var searchInput = document.querySelector('.js-shuffle-search');

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
};

/**
 * Filter the shuffle instance by items with a title that matches the search input.
 * @param {Event} evt Event object.
 */
Demo.prototype._handleSearchKeyup = function (evt) {
  var searchText = evt.target.value.toLowerCase();

  this.shuffle.filter(function (element, shuffle) {

    // If there is a current filter applied, ignore elements that don't match it.
    if (shuffle.group !== Shuffle.ALL_ITEMS) {
      // Get the item's groups.
      var groups = JSON.parse(element.getAttribute('data-groups'));
      var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;

      // Only search elements in the current group
      if (!isElementInCurrentGroup) {
        return false;
      }
    }

    var titleElement = element.querySelector('.picture-item__title');
    var titleText = titleElement.textContent.toLowerCase().trim();

    return titleText.indexOf(searchText) !== -1;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  window.demo = new Demo(document.getElementById('my-shuffle'));
});
      console.log('window', window.demo)

},
  
  methods: {

    myfilter(x) {
      console.log(this.demo);
      // document.window.demo.filter('space');
    },

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
      if(event.speakerApproved.length > 0){
        return "['Speaker']";
      } else if (event.employmentApproved.length > 0) {
        return "['Employment']";
      } else if (event.fundraiseApproved.length > 0) {
        return "['Fundraiser']";
      } else if (event.volunteerApproved.length > 0) {
        return "['Volunteer']";
      } else if (event.freeFoodApproved.length > 0) {
        return "['Free Food']";
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