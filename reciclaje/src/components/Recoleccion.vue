<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Recoleccion</v-toolbar-title>
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
    :items="bolsas"
    class="elevation-1"
    :search="search"

    
  >
   <template v-slot:item.creadoFecha="{ item }">
           <span>{{new Date(item.creadoFecha).toLocaleString()}}</span>
         </template>

         <template v-slot:item.reciclador.nombre="{ item }">
           <span>{{function_name(item.reciclador)}}</span>
         </template>

 

    <template v-slot:item.actions="{ item }">
     

      <router-link :to="'/recoleccion/' + item.codigo "
      >
       <v-btn icon >
              <v-icon>info</v-icon>
            </v-btn>
      </router-link>

  
    </template>
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
      bolsas: [],
      headers: [
        { text: "Fecha Creacion", value: "creadoFecha", sortable: false },
        { text: "Generador", value: "usuario.nombre", sortable: false },
        { text: 'Reciclador', value: 'reciclador.nombre', sortable: false },
        {text: 'Distrito',value: 'usuario.condominio.distrito.nombre',sortable:false},
        {text: 'Condominio',value: 'usuario.condominio.nombre',sortable:false},
        {text: 'Puntuacion',value: 'puntuacion',sortable:false},
        {text: 'Actions',value: 'actions',sortable:false},
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
      .get("/bolsa/totales")
      .then(function(response){me.bolsas=response.data;})
      .catch(function(error){console.log(error);});
    },
    function_name(dep){
        if(dep != null)
        return dep.nombre;
        else
        return "No asignado";
    }
  }
};
</script>
<style>
  @import '../assets/style.css';
</style>
