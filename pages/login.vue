<template>
  <div class="body">
    <b-container>
      <b-col>
        <!-- Content here -->

        <div class="container_login">
          <b-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Escudo_Universidad_de_Medellin.svg/240px-Escudo_Universidad_de_Medellin.svg.png"
            fluid
            alt="Fluid image"
            width="80px"
          ></b-img>
          <div class="tittle">{{ message }}</div>
        </div>

        <br />

        <b-form action="javascript:void(0)">
          <b-form-group @submit.stop.prevent label="Documento" label-for="id">
            <b-form-input
              class="form-control"
              v-model="usuario.id"
              type="number"
              placeholder="Ingrese su documento de identidad"
              id="id"
            />
            <b-form-invalid-feedback :state="validar_id"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group
            @submit.stop.prevent
            label="Contraseña"
            label-for="password"
          >
            <b-form-input
              class="form-control"
              type="password"
              v-model="usuario.clave"
              placeholder="Ingrese su contraseña"
              id="password"
            />
            <b-form-invalid-feedback :state="validar_clave"
              >Campo obligatorio</b-form-invalid-feedback
            >
          </b-form-group>

          <b-button @click="login()" type="submit" block variant="danger"
            >Ingresar</b-button
          >

          <b-button
            id="show-btn"
            @click="mostrar_modal"
            block
            variant="outline-danger"
            >Solicitar una Cuenta</b-button
          >

          <b-button
            id="show-btn"
            @click="mostrar_modal_clave"
            block
            variant="outline-danger"
            >¿Olvidaste tu Contraseña?</b-button
          >

          <b-modal ref="my-modal" hide-footer title="Solicitar una Cuenta">
            <form ref="form" @submit.stop.prevent="solicitud">
              <b-form-group
                :state="estado_id"
                label="Identificacón"
                label-for="id_modal"
                invalid-feedback="El documento es obligatorio"
              >
                <b-form-input
                  id="id_modal"
                  v-model="usuario.id"
                  :state="estado_id"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                :state="estado_correo"
                label="Correo"
                label-for="correo"
                invalid-feedback="El correo es obligatorio"
              >
                <b-form-input
                  id="correo"
                  v-model="usuario.correo"
                  :state="estado_correo"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="¿Para qué quieres esta cuenta?"
                label-for="description"
              >
                <b-form-textarea
                  class="form-control"
                  v-model="usuario.descripcion"
                  placeholder="Ingrese una descripción"
                  id="descripcion"
                />
              </b-form-group>

              <p>
                Se te enviará un correo electrónico cuando se cree la cuenta.
              </p>
            </form>
            <b-button
              class="mt-3"
              variant="outline-danger"
              block
              @click="solicitar_cuenta()"
              >Solicitar</b-button
            >
          </b-modal>

          <b-modal ref="my-modal-pass" hide-footer title="Recuperar contraseña">
            <form ref="form" @submit.stop.prevent="recuperar">
              <b-form-group
                :state="estado_clave"
                label="Correo"
                label-for="correo"
                invalid-feedback="El correo es obligatorio"
              >
                <b-form-input
                  id="correo"
                  v-model="usuario.correo"
                  :state="estado_clave"
                  required
                ></b-form-input>
              </b-form-group>

              <p>
                Se te enviará un correo electrónico con una nueva contraseña.
              </p>
            </form>
            <b-button
              class="mt-3"
              variant="outline-danger"
              block
              @click="recuperar_clave()"
              >Recuperar</b-button
            >
          </b-modal>
          <div class="text">
            <br />
            {{ mensaje2 }}
          </div>
        </b-form>
        <br />
      </b-col>
    </b-container>
  </div>
</template>

<script src="../assets/login.js" />

<style src="../css/login.css" />
