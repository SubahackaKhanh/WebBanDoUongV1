<template>
  <div id="app">
    <ComponentsHeader />
    <router-view />
  </div>
</template>

<script>
import ComponentsHeader from './components/ComponentsHeader.vue';

export default {
  components: {
    ComponentsHeader,
  },
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav a {
  margin: 10px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}
</style>
