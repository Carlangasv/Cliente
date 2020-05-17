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
  data() {
    return {
      message: "GESTIÓN DE PERMISOS",
      inEdition: false,
      url: "",
      token: "",
      showTable: false,
      validacion: "",
      permiso_actual:"",
      permiso: {
        id: "",
        nombre: "",
        descripcion: "",
        rol: null,
        modulo: null,
        accion: "",
        acciones: true,
      },
      acciones_seleccionadas: [],
      lista_acciones: [],
      lista_permisos: [],
      lista_roles: [],
      lista_modulos: [],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_acciones();
    this.mostrar_permisos();
    this.mostrar_roles();
    this.mostrar_modulos();
  },
  computed: {
    validar_nombre() {
      return this.permiso.nombre.length > 0;
    },
    validar_rol() {
      return this.permiso.rol != "" && this.permiso.rol != undefined;
    },
    validar_modulo() {
      return this.permiso.modulo != "" && this.permiso.modulo != undefined;
    },
  },
  methods: {
    guardar_token() {
      if (typeof window !== "undefined") {
        this.url = config.url_api;
        this.token = localStorage.getItem("token");
      }
    },
    
    cargar_pagina() {
      let url = config.url_api + "verify";
      let token = localStorage.getItem("token");
      this.token = token;
      axios
        .post(
          url,
          {
            Modulo: "Gestión de Permisos",
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
    mostrar_permisos() {
      axios
        .get(this.url + "view-options", { headers: { token: this.token } })
        .then((response) => {
          this.lista_permisos = response.data.info;
          for (let i in this.lista_permisos) {
            this.lista_permisos[i].acciones = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mostrar_roles() {
      axios
        .get(this.url + "roles", { headers: { token: this.token } })
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
    mostrar_acciones() {
      axios
        .get(this.url + "actions", { headers: { token: this.token } })
        .then((response) => {
          let array = response.data.info;
          for (let i in array) {
            let temp = { value: "", text: "" };
            temp.value = array[i].id;
            temp.text = array[i].nombre;
            this.lista_acciones.push(temp);
          }
          console.log(this.lista_acciones);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mostrar_modulos() {
      axios
        .get(this.url + "modules", { headers: { token: this.token } })
        .then((response) => {
          let array = response.data.info;
          for (let i in array) {
            let temp = { value: "", text: "" };
            temp.value = array[i].id;
            temp.text = array[i].nombre;
            this.lista_modulos.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    crear_permiso() {
      if (this.permiso.nombre.length > 0 &&  (this.permiso.rol != "" && this.permiso.rol != undefined )
       && (this.permiso.modulo != "" && this.permiso.modulo != undefined ) && this.acciones_seleccionadas.length > 0) {
        for (let i in this.acciones_seleccionadas) {
          let permiso = Object.assign({}, this.permiso);
          permiso.accion = this.acciones_seleccionadas[i];
          console.log(permiso);

          axios
            .post(this.url + "options", permiso, {
              headers: { token: this.token },
            })
            .then((response) => {
              console.log(response);
              this.mostrar_permisos();

            })
            .catch((error) => {
              console.log(error);
            });
        }
        this.permiso= {
          id: "",
          nombre: "",
          descripcion: "",
          rol: null,
          modulo: null,
          accion: "",
          acciones: true,
        };
        this.acciones_seleccionadas = [];
      } else {
        alert("LLene todos los campos correctamente");
      }
    },

    eliminar_permiso({ item }) {
      axios
        .delete(`${this.url}options/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          let posicion = this.lista_permisos.findIndex(
            (permiso) => permiso.id == item.id
          );
          this.lista_permisos.splice(posicion, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cargar_permiso({ item }) {
      this.permiso_actual = item.nombre;
      axios
        .get(`${this.url}options/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var array = response.data.info;

          this.inEdition = true;
          this.permiso.id = array[0].id;
          this.permiso.nombre = array[0].nombre;
          this.permiso.descripcion = array[0].descripcion;
          this.permiso.rol = array[0].rol;
          this.permiso.modulo = array[0].modulo;
          this.permiso.actions = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_permiso() {
      
      
      if (this.permiso.nombre.length > 0 &&  (this.permiso.rol != "" 
      && this.permiso.rol != undefined )
      && (this.permiso.modulo != "" && this.permiso.modulo != undefined ) 
      && this.acciones_seleccionadas.length > 0) {
        
       
        axios
          .put(`${this.url}options/${this.permiso_actual}`, this.permiso,  {headers: { token: this.token },}  )
          .then((response) => {
            console.log(response);
            this.crear_permiso();
            this.mostrar_permisos();
            
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
