<template>
  
  <div id="blank">
    <!-- search bar -->
    <!-- <div class="col-4@sm col-3@md">
      <div class="filters-group">
        <label for="filters-search-input" class="filter-label">Search</label>
        <input class="textfield filter__search js-shuffle-search" type="search" id="filters-search-input">
      </div>
    </div> -->
    <div id="grid" class="grid-container">
      <!-- <div class="card" data-groups='["animal"]' v-for="event in events" :key="event.id">
        <a href="">
        <div class="photo">
        <img alt="Event Photo" :src="get_photo(event)" style="height:150px;border-radius:50%;margin:10px">
        </div>
        <div class="container">
          <h3>{{event.portal.name}} </h3>
        </div>
        </a>
      </div> -->
      <!-- bootstrap implementation -->
      <figure class="col-4@sm card" data-groups='["animal"]' v-for="event in events" :key="event.id" data-date-created="2016-08-12" data-title="Crocodile">
        <div class="aspect aspect--16x9">
          <div class="aspect__inner">
            <img alt="Event Photo" :src="get_photo(event)" style="height:150px;border-radius:50%;margin:10px">
          </div>
        </div>
        <figcaption>Crocodile</figcaption>
      </figure>

      <div class="col-1 my-sizer-element"></div>
    </div>
  </div>
</template>

<script> 
import axios from 'axios'
import Shuffle from 'shufflejs';

export default {
    name: 'Portals',
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
      sizer: '.my-sizer-element'
    });
  },
  
  methods: {
    //get photo for event
    get_photo(event) {
      if(event.portal.picture_url != null) {
          return event.portal.picture_url;
      }
      return "./assets/edibullFINAL 1024.png";
    },
  }
}

</script>

<style scoped>
.col-1 {
  width: 400px; 
}

</style>