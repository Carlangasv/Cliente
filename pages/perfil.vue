<template>
  <div class="body">
    <b-container>
      <b-col>
        <!-- Content here -->

        <div class="container">
          <b-icon icon="person-square" variant="danger" font-scale="4"></b-icon>
        </div>

        <div class="container">
          <div class="tittle">PERFIL</div>
          <b-icon icon="pencil" variant="danger" font-scale="2"></b-icon>
        </div>

        <br />

        <b-form action="javascript:void(0)">
          <b-form-group
            @submit.stop.prevent
            label="Identificación"
            label-for="id"
          >
            <b-form-input
              class="form-control"
              v-model="usuario.id"
              :disabled="true"
              id="id"
            />
          </b-form-group>

          <b-form-group label="Nombre" label-for="name">
            <b-form-input
              class="form-control"
              v-model="usuario.nombre"
              placeholder="Ingrese su nombre"
              id="name"
            />
            <b-form-invalid-feedback :state="validar_nombre"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group
            @submit.stop.prevent
            label="Apellido"
            label-for="lastname"
          >
            <b-form-input
              class="form-control"
              v-model="usuario.apellido"
              placeholder="Ingrese su apellido"
              id="lastname"
            />
            <b-form-invalid-feedback :state="validar_apellido"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group @submit.stop.prevent label="Edad" label-for="age">
            <b-form-input
              class="form-control"
              type="number"
              v-model="usuario.edad"
              placeholder="Ingrese su edad"
              id="age"
            />
            <b-form-invalid-feedback :state="validar_edad"
              >Ingrese un valor válido</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group @submit.stop.prevent label="Correo" label-for="email">
            <b-form-input
              class="form-control"
              type="email"
              v-model="usuario.correo"
              id="mail"
              placeholder="Ingrese su correo"
            />
            <b-form-invalid-feedback :state="validar_correo"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

            <b-form-group label="Ciudad">
              <b-form-select
                v-model="usuario.ciudad"
                :options="lista_ciudades"
              ></b-form-select>
            </b-form-group>


          <b-form-group label="Ocupación">
            <b-form-select
              v-model="usuario.ocupacion"
              :options="opciones_ocupaciones"
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Rol">
            <b-form-select
              v-model="usuario.rol"
              :options="lista_roles"
              disabled
            ></b-form-select>
          </b-form-group>

          <b-button @click="actualizar_usuario()" block variant="danger"
            >Actualizar usuario</b-button
          >

          <b-button
            type="submit"
            block
            variant="outline-danger"
            @click="cambiar_clave = !cambiar_clave"
            >Cambiar contraseña</b-button
          >
          <br />

          <b-form-group
            label="Contraseña actual"
            label-for="password"
            v-show="cambiar_clave"
          >
            <b-form-input
              class="form-control"
              v-model="clave.clave_actual"
              placeholder="Ingrese su contraseña actual"
              id="password"
              :disabled="!cambiar_clave"
            />
            <b-form-invalid-feedback :state="validar_actual_clave"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group
            label="Nueva Contraseña"
            label-for="password"
            v-show="cambiar_clave"
          >
            <b-form-input
              class="form-control"
              v-model="clave.clave_nueva"
              placeholder="Ingrese su nueva contraseña"
              id="password"
              :disabled="!cambiar_clave"
            />
            <b-form-invalid-feedback :state="validar_nueva_clave"
              >Campo obligatorio</b-form-invalid-feedback
            >

            <br />

            <b-button @click="editar_clave()" block variant="danger"
              >Cambiar</b-button
            >
          </b-form-group>
        </b-form>
        <br />
      </b-col>
    </b-container>
  </div>
</template>

<script src="../assets/perfil.js" />

<style src="../css/login.css" />
