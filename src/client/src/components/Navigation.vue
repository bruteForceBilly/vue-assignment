<template>
  <div id="nav" class="p-6 border-b border-gray-100">
    <router-link to="/">FleetManager</router-link>
    <router-link to="/vehicle">Vehicle</router-link>
    <router-link to="/activity-log"
      >Activity Log
      <span class="text-xs align-top font-thin">{{ activityLogCount }} </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    activityLogCount() {
      return this.$store.state.activityLog.entries.length
    }
  }
}
</script>

<style>
#nav a:first-child {
  font-weight: 600;
  margin: 0 2rem 0 0;
}

#nav a {
  font-weight: 500;
  margin: 0 0.5rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
