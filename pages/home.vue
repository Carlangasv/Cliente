<!-- Aquí se van a mostrar las opciones según los permisos del usuario -->

<template>
  <div>
    <b-navbar toggleable type="light" variant="faded">
      <b-img
        src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
        fluid
        alt="Fluid image"
        width="200px"
      ></b-img>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <a href="perfil">
          <b-icon icon="person-fill" variant="danger" font-scale="2"></b-icon>
        </a>
      </b-navbar-toggle>
    </b-navbar>
    <div class="p-3 mb-2 bg-danger text-white"></div>

    <div id="wrapper">
      <div id="content">
        <b-button type="submit" @click="showTable = !showTable"
          >Publicaciones</b-button
        >
        <ul>
          <li
            v-for="(modulo, index) in lista_opciones"
            :key="index"
            v-show="showTable"
          >
            <a :href="modulo.Url">{{ modulo.Modulo }}</a>
          </li>
        </ul>
      </div>
       <div id="content">
        <b-button type="submit" @click="showTable2 = !showTable2"
          >Convenios y movilidad</b-button
        >
        <ul>
          <li
            v-for="(modulo, index) in lista_modulos"
            :key="index"
            v-show="showTable2"
          >
            <a :href="modulo.Url">{{ modulo.Modulo }}</a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script src="../assets/home.js" />

<style src="../css/home.css" />
