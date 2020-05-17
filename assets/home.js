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
    this.mostrar_opciones();
  },
  data() {
    return {
      lista_modulos: [],
      lista_opciones: [],
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
      let url = config.url_api + "permisos/";
      let token = localStorage.getItem("token");
      axios
        .get(url + id, {
          headers: { token },
        })
        .then((response) => {
          console.log("Permisos");
          console.log(response.data.info);
          let array = response.data.info;
          for (let i in array) {
            let temp = {
              Accion: "",
              Url: ""
            };
            temp.Modulo = array[i].Modulo;
            temp.Proyecto = array[i].Proyecto;
            temp.Url = array[i].Url;
            if (temp.Proyecto === "Publicaciones") {
              this.lista_opciones.push(temp)
            } else if (temp.Proyecto === "Convenios y Movilidad") {
              this.lista_modulos.push(temp);
            }
          }
          console.log("lista modulos");
          console.log(this.lista_modulos);
          console.log("lista opciones");
          console.log(this.lista_opciones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ir(item) {
      let url = item.item.Url;
      this.$router.push(url);
    },
  },
};
