<template>
  <div style="height: 300px" class="inline-block border border-gray-100">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-marker :lat-lng="vehicleMarkerPostion">
        <l-icon>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 45.437 45.437"
            class="text-black"
            fill="currentColor"
            style="enable-background: new 0 0 45.437 45.437"
            xml:space="preserve"
          >
            <g>
              <path
                d="M41.403,11.11c-0.371-3.627-0.962-6.451-1.897-7.561c-3.855-4.564-30.859-4.898-33.925,0
		c-0.75,1.2-1.276,4.014-1.629,7.567c-1.139,0.134-2.026,1.093-2.026,2.267v4.443c0,0.988,0.626,1.821,1.5,2.146
		c-0.207,6.998-0.039,14.299,0.271,17.93c0,2.803,1.883,2.338,1.883,2.338h1.765v3.026c0,1.2,1.237,2.171,2.761,2.171
		c1.526,0,2.763-0.971,2.763-2.171V40.24h20.534v3.026c0,1.2,1.236,2.171,2.762,2.171c1.524,0,2.761-0.971,2.761-2.171V40.24h0.58
		c0,0,2.216,0.304,2.358-1.016c0-3.621,0.228-11.646,0.04-19.221c0.929-0.291,1.607-1.147,1.607-2.177v-4.443
		C43.512,12.181,42.582,11.206,41.403,11.11z M12.176,4.2h20.735v3.137H12.176V4.2z M12.472,36.667c-1.628,0-2.947-1.32-2.947-2.948
		c0-1.627,1.319-2.946,2.947-2.946s2.948,1.319,2.948,2.946C15.42,35.347,14.101,36.667,12.472,36.667z M32.8,36.667
		c-1.627,0-2.949-1.32-2.949-2.948c0-1.627,1.321-2.946,2.949-2.946s2.947,1.319,2.947,2.946
		C35.748,35.347,34.428,36.667,32.8,36.667z M36.547,23.767H8.54V9.077h28.007V23.767z"
              />
            </g>
          </svg>
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import { Icon } from 'leaflet'

// Mitigate Leaflet library webpack issue, see docs: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  props: {
    gps: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      zoom: 13,
      center: latLng(this.gps[0], this.gps[1]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      vehicleMarkerPostion: latLng(this.gps[0], this.gps[1]),
      currentZoom: 11.5,
      currentCenter: latLng(this.gps[0], this.gps[1]),
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    }
  },
  watch: {
    gps: function (newVal) {
      this.currentCenter = latLng(newVal[0], newVal[1])
      this.vehicleMarkerPostion = latLng(newVal[0], newVal[1])
    }
  }
}
</script>
