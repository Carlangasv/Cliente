import axios from "axios";
import config from "./config/index";

export default {
  beforeMount() {
    this.carga_pagina();
  },
  data() {
    return {
      estado_id: null,
      estado_correo: null,
      estado_clave: null,
      url: "",
      message: "INICIAR SESIÓN",
      mensaje2: "",
      usuario: {
        id: "",
        clave: "",
        correo: "",
        descripcion: "",
        primera_vez: "",
      },
    };
  },

  computed: {
    validar_id() {
      return this.usuario.id.length > 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    },
  },
  methods: {
    carga_pagina() {
      let url = config.url_api;
      this.url = url;
    },
    login() {
      let url = config.url_api + "login";

      if (this.usuario.id.length > 0 && this.usuario.clave.length > 0) {
        axios
          .post(url, this.usuario)
          .then((response) => {
            let data = response.data;
            console.log("Data:", data);
            localStorage.setItem("token", data.info);
            localStorage.setItem("id", this.usuario.id);
            console.log("Primera vez: ", data.primera_vez);
            console.log("Rol: ", data.rol);
            if(data.rol == 1) {
              this.$router.push("/admin");
              return;
            }
            if (!data.primera_vez) {
              this.$router.push("/perfil");
            } else {
              this.$router.push("/home");
            }
          })
          .catch((error) => {
            this.mensaje2 = error.response.data.message;
            console.log(error.response);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },

    mostrar_modal() {
      this.$refs["my-modal"].show();
    },

    mostrar_modal_clave() {
      this.$refs["my-modal-pass"].show();
    },
    ocultar_modal() {
      this.$refs["my-modal"].hide();
    },

    ocultar_modal_clave() {
      this.$refs["my-modal-pass"].hide();
    },

    solicitar_cuenta() {
      if (!this.validar()) {
        return;
      }
      axios
        .post(this.url + "emails/request", this.usuario)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
      this.ocultar_modal();
    },

    recuperar_clave() {
      if (!this.validar_pass()) {
        return;
      }
      this.usuario.clave = this.generar_clave();
      console.log(this.usuario);
      axios
        .put(this.url + "noPass/clave", this.usuario)
        .then((response) => {
          console.log(response);
          axios
            .post(this.url + "emails/recovery", this.usuario)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
      this.ocultar_modal_clave();
    },
    validar() {
      const valid = this.$refs.form.checkValidity();
      this.estado_id = valid;
      this.estado_correo = valid;
      return valid;
    },
    validar_pass() {
      const valid = this.$refs.form.checkValidity();
      this.estado_correo = valid;
      this.estado_clave = valid;
      return valid;
    },
    vaciar_modal() {
      this.usuario.id = "";
      this.estado_id = null;
      this.usuario.correo = "";
      this.estado_correo = null;
      this.estado_clave = null;
      this.estado_id = null;
    },
    generar_clave() {
      let r = Math.random()
        .toString(36)
        .substring(3)
        .toUpperCase();
      console.log(r);
      return r;
    },
  },
};
