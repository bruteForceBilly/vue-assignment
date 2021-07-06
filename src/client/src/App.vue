<template>
  <div id="app" class="text-gray-600">
    <div id="nav" class="border-b border-gray-100">
      <router-link to="/">FleetManager</router-link> |
      <router-link to="/vehicle">Vehicle</router-link>
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
