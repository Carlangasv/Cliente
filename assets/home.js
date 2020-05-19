//Aquí se van a gestionar los permisos
import axios from "axios";
import config from "./config/index";

import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  beforeMount() {
    this.cargar_pagina();
  },
  mounted() {
    this.mostrar_opciones(), this.cargar_acciones();
  },
  data() {
    return {
      lista_modulos: [],
      lista_opciones: [],
      lista_mov_acc: [],
      list_prop_acc: [],
      showTable: false,
      showTable2: false,
    };
  },
  computed: {},
  methods: {
    validar_condicion(bool) {
      if (bool == false) {
        this.validacion = false;
        return false;
      } else {
        this.validacion = true;
        return true;
      }
    },

    cargar_pagina() {
      let url = config.url_api + "verify";
      let token = localStorage.getItem("token");
      axios
        .get(url, { headers: { token } })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },

    mostrar_opciones() {
      let id = localStorage.getItem("id");
      let url = config.url_api + "permisos2/";
      let token = localStorage.getItem("token");
      let arrayPermisos = []
      axios
        .get(url + id, {
          headers: { token },
        })
        .then((response) => {
          console.log("Permisos");
          let array = response.data.info;
          for (let i in array) {
            let temp = {
              Accion: "",
              Url: "",
            };
            temp.Modulo = array[i].Modulo;
            temp.Proyecto = array[i].Proyecto;
            temp.Url = array[i].Url == ""  || array[i].Url == null ? 
            "https://proyecto-seguridad-udem.herokuapp.com/404" : array[i].Url +"/?token="+token
            if (temp.Proyecto === "Publicaciones") {
              this.lista_opciones.push(temp);
            } else if (temp.Proyecto === "Convenios y Movilidad") {
              this.lista_modulos.push(temp);
            }
          }
          console.log("Todos movilidad");
          console.log(this.lista_modulos);
          console.log("lista opciones");
          console.log(this.lista_opciones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cargar_acciones() {
      let id = localStorage.getItem("id");
      let url = config.url_api + "permisos2/";
      let token = localStorage.getItem("token");
      axios
        .get(url + id, {
          headers: { token },
        })
        .then((response) => {
          console.log("Permisos");
          console.log(response.data);
          let array = response.data.info;
          for (let i in array) {
            let temp = { Accion: "", Modulo: "", Opcion: "", Proyecto: "" };
            temp.Accion = array[i].Acción;
            temp.Modulo = array[i].Modulo;
            temp.Opcion = array[i].Opción;
            temp.Proyecto = array[i].Proyecto;
            if (temp.Proyecto === "Publicaciones") {
              this.list_prop_acc.push(temp);
            } else if (temp.Proyecto === "Convenios y Movilidad") {
              this.lista_mov_acc.push(temp);
            }
            }
            console.log("Permisos publicaciones");
            console.log(this.list_prop_acc);
            console.log("Permisos movilidad");
            console.log(this.lista_mov_acc);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
