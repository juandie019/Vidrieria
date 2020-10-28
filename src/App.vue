<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" class="mb-4">
      <b-navbar-nav>
           <b-nav-item to="/">
                Home
            </b-nav-item>
             <b-nav-item to="/product_index/">
              <div class="text-left">
                Productos
              </div>
            </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div id="content">
      <b-container>
        <router-view/>
      </b-container>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

</style>
