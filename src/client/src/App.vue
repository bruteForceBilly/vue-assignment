<template>
  <div id="app" class="text-gray-600">
    <div id="nav" class="p-6 border-b border-gray-100">
      <router-link to="/">FleetManager</router-link>
      <router-link to="/vehicle">Vehicle</router-link>
      <router-link to="/activity-log">Activity Log</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

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
