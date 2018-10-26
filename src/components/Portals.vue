<template>
  <div>
    <div class="container">
      <div class="row my-shuffle" id="my-shuffle">
          <div v-for="image in photos" :key="image.id" class="w-25 p-1 photo-item">
            <div class="aspect aspect--4x3">
              <div class="aspect__inner">
                <img :src="image.src" />
                <!-- <PhotoAttribution username={image.username} name={image.name} /> -->
              </div>
            </div>
          </div>
        <div class="w-25 photo-grid__sizer"></div>
      </div>
    </div>
  </div>
</template>

<script> 
import axios from 'axios'
import Shuffle from 'shufflejs'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const grayPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
const blackPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
const greenPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO02Vz4HwAE9AJhcLBN6AAAAABJRU5ErkJggg=='
export default {
  name: 'Portals',
  data () {
    return {  
      events: [],
      photos: [
        { id: 1, src: grayPixel },
        { id: 2, src: blackPixel },
        { id: 3, src: greenPixel },
      ],
    }
  },
  created () {
    axios.get("https://edibullapp.com/events?approved=true")
      .then((response) => {
        this.events = response.data.events;
        console.log('this.events', this.events)
      }, (err) => {
        console.log('axios err:', err)
      })
  },
  mounted () {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(document.getElementById('my-shuffle'), {
      itemSelector: '.photo-item',
      sizer: '.photo-grid__sizer',
    });
    console.log('initialized shuffle')
    // Kick off the network request and update the state once it returns.
    this._fetchPhotos()
      .then(this._whenPhotosLoaded.bind(this))
      .then((photos) => {
        this.photos = photos
      });
  },
  beforeDestroy () {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  },
  updated() {
    // Fired every second, should always be true
    console.log('updated')
    console.log('this.shuffle', this.shuffle)
    this.shuffle.resetItems()
    // console.log('updated')
  },
  methods: {
    //get photo for event
    get_photo(event) {
      if(event.portal.picture_url != null) {
          return event.portal.picture_url;
      }
      return "./assets/edibullFINAL 1024.png";
    },
    /**
     * Fake and API request for a set of images.
     * @return {Promise<Object[]>} A promise which resolves with an array of objects.
     */
    _fetchPhotos() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 4, username: '@stickermule', name: 'Sticker Mule', src: 'https://images.unsplash.com/photo-1484244233201-29892afe6a2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=14d236624576109b51e85bd5d7ebfbfc' },
            { id: 5, username: '@prostoroman', name: 'Roman Logov', src: 'https://images.unsplash.com/photo-1465414829459-d228b58caf6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=7a7080fc0699869b1921cb1e7047c5b3' },
            { id: 6, username: '@richienolan', name: 'Richard Nolan', src: 'https://images.unsplash.com/photo-1478033394151-c931d5a4bdd6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=3c74d594a86e26c5a319f4e17b36146e' },
            { id: 7, username: '@wexor', name: 'Wexor Tmg', src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=11ff283143c782980861a442a957da8e' },
            { id: 8, username: '@dnevozhai', name: 'Denys Nevozhai', src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=ea06c0f0700ec469fdcb32e0d4c2928e' },
            { id: 9, username: '@aronvandepol', name: 'Aron Van de Pol', src: 'https://images.unsplash.com/photo-1469719847081-4757697d117a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&s=9a568bc48e42d3bb60c97c0eb3dc20ac' },
          ]);
        }, 300);
      });
    },
    /**
     * Resolve a promise when all the photos in an array have loaded.
     * @param {Object[]} photos Photos to load.
     * @return {Promise.<Object[]>} Loaded images.
     */
    _whenPhotosLoaded(photos) {
      return Promise.all(photos.map(photo => new Promise((resolve) => {
        const image = document.createElement('img');
        image.src = photo.src;
        if (image.naturalWidth > 0 || image.complete) {
          resolve(photo);
        } else {
          image.onload = () => {
            resolve(photo);
          };
        }
      })));
    },
  },
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>