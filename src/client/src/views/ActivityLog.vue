<template>
  <div class="bg-gray-50">
    <div class="p-20 mx-auto w-full lg:w-3/4 h-screen">
      <div>
        <h1 class="text-2xl font-black leading-loose mb-4">Activity Log</h1>

        <div class="flex justify-end text-sm">
          <button
            v-for="btn in filterButtons"
            :key="btn.id"
            @click="btn.isActive = !btn.isActive"
            class="rounded-full px-3 py-1 mx-2"
            :class="btn.isActive ? 'bg-gray-200' : 'bg-gray-100'"
          >
            {{ btn.label }}
          </button>
        </div>

        <table class="table-fixed border-collapse border w-full mt-4 bg-white">
          <thead>
            <tr class="text-center">
              <th class="border px-3 py-3 w-2/12">Type</th>
              <th class="border px-3 py-3 w-4/12">Date</th>
              <th class="border px-3 py-3 w-3/6">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, i) in entries()" :key="i + entry.date">
              <td class="border px-2 py-4">{{ entry.type }}</td>
              <td class="border px-2 py-4">{{ entry.date }}</td>
              <td class="border px-2 py-4">{{ entry.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ActivityLog',
  data() {
    return {
      filterButtons: [
        {
          id: 1,
          label: 'Errors',
          value: 'errors',
          isActive: false
        },
        {
          id: 2,
          label: 'Incidents',
          value: 'incidents',
          isActive: false
        },
        {
          id: 3,
          label: 'Warnings',
          value: 'warnings',
          isActive: false
        },
        {
          id: 4,
          label: 'Successes',
          value: 'successes',
          isActive: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters('activityLog', [
      'errors',
      'incidents',
      'successes',
      'warnings'
    ]),

    activeFilters() {
      return [...new Set(this.filterButtons.filter((btn) => btn.isActive))]
        .map((btn) => btn.value)
        .reduce((acc, cv) => {
          acc.push(this.getLogEntries(cv))
          return acc
        }, [])
        .flat()
    },
    logEntries() {
      return this.$store.state.activityLog.entries
    }
  },
  methods: {
    entries() {
      return this.activeFilters.length ? this.activeFilters : this.logEntries
    },
    getLogEntries(val) {
      let filters = {
        all: this.logEntries,
        errors: this.errors,
        incidents: this.incidents,
        successes: this.successes,
        warnings: this.warnings
      }
      return filters[val]
    }
  }
}
</script>
