import axios from "axios";
import config from "./config/index";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
var md5 = require('md5');
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  beforeMount() {
    this.cargar_pagina();
  },
  data() {
    return {
      show: false,
      cambiar_clave: false,
      clave: {
        clave_nueva: "",
        clave_actual: "",
      },
      enEdicion: false,

      token: "",
      url: "",
      usuario: {
        id: "",
        nombre: "",
        apellido: "",
        edad: 0,
        correo: "",
        clave: "",
        ciudad: "",
        ocupacion: null,
        rol: 0,
        acciones: true,
        primera_vez:true,
      },
      lista_usuarios: [],
      opciones_ocupaciones: [
        { value: null, text: "Seleccione una ocupacion", disabled: true },
        { value: "Estudiante", text: "Estudiante" },
        { value: "Ingeniero", text: "Ingeniero" },
        { value: "otro", text: "otro" },
      ],
      lista_ciudades: [{ value: null, text: "Seleccione una ciudad", disabled: true }],
      lista_roles: [{ value: null, text: "Seleccione un rol", disabled: true }],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_roles();
    this.cargar_usuarios(this.usuario);
    this.mostrar_usuarios();
    this.mostrar_ciudades();
  },
  computed: {


    validar_nombre() {
      return this.usuario.nombre.length > 0;
    },

    validar_apellido() {
      return this.usuario.apellido.length > 0;
    },

    validar_edad() {
      return this.usuario.edad > 0;
    },

    validar_correo() {
      return this.usuario.correo.length > 0;
    },

    validar_actual_clave() {
      return this.clave.clave_actual.length > 0;
    },
    validar_nueva_clave() {
      return this.clave.clave_nueva.length > 0;
    },


  },

  methods: {
    guardar_token() {
      if (typeof window !== "undefined") {
        this.usuario.id = localStorage.getItem("id");

        this.url = config.url_api;
        this.token = localStorage.getItem("token");

      }
    },

    cargar_pagina() {
      let url = config.url_api + "verify";
      let token = localStorage.getItem("token");
      this.token = token;

      axios
        .get(url, { headers: { token: token } })
        .then((response) => { })
        .catch((error) => {
          console.log(error);
          this.$router.push("/login");
        });
    },

    mostrar_roles() {
      axios
        .get(this.url + "roles", {
          headers: { token: this.token },
        })
        .then((response) => {
          let array = response.data.info;
          for (let i in array) {
            let temp = { value: "", text: "" };
            temp.value = array[i].id;
            temp.text = array[i].nombre;
            this.lista_roles.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mostrar_ciudades() {
      axios
        .get(this.url + "citys", {
          headers: { token: this.token },
        })
        .then((response) => {
          let datos = response.data.info;
          for (let i in datos) {
            let temp = { value: "", text: "" };
            temp.value = datos[i].nombre;
            temp.text = datos[i].nombre;
            this.lista_ciudades.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mostrar_usuarios() {
      axios
        .get(this.url + "view-users", {
          headers: { token: this.token },
        })
        .then((response) => {
          console.log(response.data.info);
          this.lista_usuarios = response.data.info;
          for (let i in this.lista_usuarios) {
            this.lista_usuarios[i].acciones = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_usuarios(item) {
      console.log(item);
      axios
        .get(`${this.url}users/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var array = response.data.info;

          this.usuario.id = array[0].id;
          this.usuario.nombre = array[0].nombre;
          this.usuario.apellido = array[0].apellidos;
          this.usuario.edad = array[0].edad;
          this.usuario.correo = array[0].correo;
          this.usuario.ciudad = array[0].ciudad;
          this.usuario.rol = array[0].rol;
          this.usuario.ocupacion = array[0].ocupacion;
          this.usuario.clave = array[0].clave;
          this.usuario.acciones = true; 
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_usuario() {

      if ((this.usuario.nombre.length > 0) && (this.usuario.apellido.length > 0) && 
      (this.usuario.correo.length > 0) && (this.usuario.edad.length > 0)) {
        axios
          .put(
            `${this.url}users/${this.usuario.id}`,
            this.usuario,
            {
              headers: { token: this.token },
            }
          )
          .then((response) => {
            console.log(response);
            this.inEdition = false;
            alert("Usuario actualizado correctamente")
            this.$router.push("/home")
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },

    editar_clave() {
      
      if ((this.clave.clave_actual.length > 0) && (this.clave.clave_nueva.length > 0)) {
        if (this.usuario.clave == md5(this.clave.clave_actual)) {
          axios
            .put(`${this.url}users/editPassword/${this.usuario.id}`, this.clave, {
              headers: { token: this.token },
            })
            .then((response) => {
              console.log(response);
              this.enEdicion = false;
              this.clave = {
                clave_nueva: "",
                clave_actual: "",
              };
              this.$router.push("/home")
            })          
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("La contraseña actual ingresada no es correcta");
        }
      }else{
        alert("LLene todos los campos correctamente");
      }
    },
  },
};
