<template>
  <div>
    <div id="app">
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
          </a>        </b-navbar-toggle>
      </b-navbar>

      <div>
        <b-navbar toggleable="md" type="dark" variant="danger">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'formUsers' }"
                >Gestión de Usuarios</b-nav-item
              >
              <b-nav-item :to="{ name: 'roles' }" active
                >Gestión de Roles</b-nav-item
              >
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
    <div class="background">
      <b-container>
        <b-col>
          <div class="subTitle">
            <b-icon icon="person-check" font-scale="2"></b-icon>
            <div class="hi">**</div>

            {{ message }}
          </div>

          <br />

          <b-form action="javascript:void(0)" @submit=" crear_rol()">
            <b-form-group @submit.stop.prevent label="Nombre" label-for="nombre">
              <b-form-input
                class="form-control"
                v-model="rol.nombre"
                placeholder="Ingrese un nombre"
                id="nombre"
              />
              <b-form-invalid-feedback :state="validar_nombre"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Descripción" label-for="descripcion">
              <b-form-textarea
                class="form-control"
                v-model="rol.descripcion"
                placeholder="Ingrese una descripción"
                id="descripcion"
              />
            </b-form-group>

            <b-button type="submit" block variant="danger" v-if="!inEdition"
              >Crear Rol</b-button
            >
            <b-button @click="actualizar_rol()" block variant="danger" v-else
              >Actualizar Rol</b-button
            >
          </b-form>
          <br />

          <b-button
            type="submit"
            block
            variant="danger"
            @click="showTable = !showTable"
            >Lista de Roles</b-button
          >
          <br />

          <b-table striped hover :items="lista_roles" v-show="showTable">
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargar_rol(row)"
                class="mr-2"
                variant="danger"
                >Modificar</b-button
              >
              <b-button size="sm" @click="eliminar_rol(row)" class="mr-2"
                >Eliminar</b-button
              >
            </template>
          </b-table>
        </b-col>
      </b-container>
    </div>
  </div>
</template>

<script src="../assets/roles.js" />

<style src="../css/forms.css" />
