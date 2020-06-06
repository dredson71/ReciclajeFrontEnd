<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Solicitudes de Generador</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>

      </v-toolbar>
      <v-data-table
    :headers="headers"
    :items="solicitud_generador"
    class="elevation-1"
    :search="search"

    
  >


    <template v-slot:no-data>
      <v-btn color="primary" >Reset</v-btn>
    </template>
  </v-data-table>


    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      solicitud_generador: [],
      headers: [
        { text: "Fecha", value: "fechaSolicitud", sortable: false },
        { text: "Generador", value: "usuario.nombre", sortable: false },
        { text: 'Apellido', value: 'usuario.apellido', sortable: false },
        {text: 'DNI',value: 'usuario.dni',sortable:false},
        {text: 'Distrito',value: 'usuario.condominio.distrito.nombre',sortable:false},
        {text: 'Condominio',value: 'usuario.condominio.nombre',sortable:false},
      ],
      search: "",
    };
  },
  computed: {
       formTitle() {
      return "Nuevo Generador";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    //TODO
    this.listar();
  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/solicitud/generador")
      .then(function(response){me.solicitud_generador=response.data;})
      .catch(function(error){console.log(error);});
    }
  }
};
</script>
<style>
  @import '../assets/style.css';
</style>
