<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/list_url">URL List</router-link> |
    <router-link to="/history">History</router-link> |
    <router-link to="/distribution">Distribution</router-link> |
    <router-link to="/dynamics">Time-series</router-link>
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
  min-width: 1200px;
  margin: 0 auto 0;
  padding: 70px 20px 10px 20px;

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
  color: #007bff;
}
</style>
