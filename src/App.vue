<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/list_url">URL List</router-link> |
    <router-link to="/history">History</router-link> |
    <router-link to="/statistics">Statistics</router-link> |
    <router-link to="/dynamics">Dynamics</router-link>
  </nav>
  <router-view/>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 800px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  margin-top: 50px;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 20px;
  background: #ffffff;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
