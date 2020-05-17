<template>
  <div>
    <div>
      <b-navbar toggleable type="light" variant="faded">
        <b-img
          src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
          fluid
          alt="Fluid image"
          width="200px"
        ></b-img>

        <div class="title">
          ADMINISTRADOR
        </div>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <a href="home">
            <b-icon icon="house-fill" variant="danger" font-scale="2"></b-icon>
          </a>
        </b-navbar-toggle>
      </b-navbar>

      <div>
        <b-navbar toggleable="md" type="dark" variant="danger">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'formUsers' }" 
                >Gestión de Usuarios</b-nav-item
              >
              <b-nav-item :to="{ name: 'roles' }">Gestión de Roles</b-nav-item>
              <b-nav-item :to="{ name: 'modules' }"
                >Gestión de Módulos</b-nav-item
              >
              <b-nav-item :to="{ name: 'permissions' }"
                >Gestión de Permisos</b-nav-item
              >
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  
}
</script>

<style src="../css/forms.css" />
