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
            class="text-yellow-300"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="black"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
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
