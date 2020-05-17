import axios from "axios";
import config from "./config/index";

import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  beforeMount() {
    this.carga_pagina();
  },
  data() {
    return {
      message: "CREACIÓN DE MÓDULOS",
      inEdition: false,
      showTable: false,
      token: "",
      url: "",
      
      modulos: {
        id: "",
        proyecto:"",
        nombre: "",
        descripcion: "",
        acciones: true,
      },
      lista_modulos: [],
      lista_proyectos: [
        { value: null, text: "Seleccione el proyecto al que pertenece este módulo", disabled: true },
        { value: "Convenios y Movilidad", text: "Convenios y Movilidad" },
        { value: "Publicaciones", text: "Publicaciones" },
      ],

    };
  },
  created() {
    this.guardar_token();
    this.mostrar_modulos();
  },
  computed: {
    validar_nombre() {
      return this.modulos.nombre.length > 0;
    },
    validar_proyecto() {
      return this.modulos.proyecto != "" && this.modulos.proyecto != undefined;
    },
  },
  methods: {
    guardar_token() {
      if (typeof window !== "undefined") {
        this.url = config.url_api;
        this.token = localStorage.getItem("token");
      }
    },
    
 
    carga_pagina() {
      let url = config.url_api + "verify";
      let token = localStorage.getItem("token");
      this.token = token;

      axios
        .post(
          url,
          {
            Modulo: "Gestión de Módulos",
          },
          { headers: { token: token } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("/login");
        });
    },
    mostrar_modulos() {
      axios
        .get(this.url + "modules", {
          headers: { token: this.token },
        })
        .then((response) => {
          this.lista_modulos = response.data.info;
          for (let i in this.lista_modulos) {
            this.lista_modulos[i].acciones = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    crear_modulo() {
      console.log(this.modulos.proyecto);
      if ((this.modulos.nombre.length > 0) && (this.modulos.proyecto != "" && this.modulos.proyecto != undefined)) {
        axios
          .post(this.url + "modules", this.modulos, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_modulos();
            this.modulos = {
              id: "",
              nombre: "",
              descripcion: "",
              acciones: true,
            };
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    eliminar_modulo({ item }) {
      axios
        .delete(`${this.url}modules/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          let posicion = this.lista_modulos.findIndex(
            (modulos) => modulos.id == item.id
          );
          this.lista_modulos.splice(posicion, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cargar_modulo({ item }) {
      axios
        .get(`${this.url}modules/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var array = response.data.info;
          console.log(array);

          this.inEdition = true;
          this.modulos.id = array[0].id;
          this.modulos.nombre = array[0].nombre;
          this.modulos.descripcion = array[0].descripcion;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    actualizar_modulos() {
      if ((this.modulos.nombre.length > 0) && (this.modulos.proyecto != "" && this.modulos.proyecto != undefined)) {
        axios
          .put(`${this.url}modules/${this.modulos.id}`, this.modulos, {
            headers: { token: this.token },
          })
          .then((response) => {
            let posicion = this.lista_modulos.findIndex(
              (modulos) => modulos.id == this.modulos.id
            );
            this.lista_modulos.splice(posicion, 1, this.modulos);
            this.inEdition = false;
            this.modulos = {
              id: "",
              nombre: "",
              descripcion: "",
              acciones: true,
            };
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
  },
};
