<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Reciclador</v-toolbar-title>
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
        <v-spacer></v-spacer>
        <v-btn 
          color="primary">
            Nuevo
      </v-btn>

        


      </v-toolbar>
      <v-data-table
    :headers="headers"
    :items="generador"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.actions="{ item }">
     

      <router-link :to="'/reciclador/' + item.codigo "
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
      generador: [],
      dialog: false,
      headers: [
        { text: "CodFormalizado", value: "codFormalizado", sortable: false },
        { text: "Nombres", value: "nombre", sortable: false },
        { text: "Apellidos", value: "apellido", sortable: false },
        {text: 'DNI',value: 'dni',sortable:false},
        {text: 'Condominio',value: 'condominio.distrito.nombre',sortable:false},
        {text: 'Asociacion',value: 'asociacion.nombre',sortable:false},
        {text: 'Actions',value: 'actions',sortable:false},
      ],
      search: "",
      editedIndex: -1,

      //TODO:Model

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
      .get("/reciclador")
      .then(function(response){me.generador=response.data;})
      .catch(function(error){console.log(error);});
    },
    close() {
      this.dialog = false;
      this.limpiar();
      this.editedIndex = -1;
    },

    open(){
      this.dialog = true;
    },
    limpiar() {
      this.codigo = "";
      this.nombre = "";
      this.distrito_id = 0;
      this.condominio_id = 0;
    },
    guardar() {
     //TODO
        /* let me=this;
         axios
         .post("/generador",{
             nombre:me.nombre,
              departamento: {
             codigo: me.selected_Department.codigo 
            }
         })
         .then(function(response){
             me.close();
             me.listar();
             me.limpiar();
         })
         .catch(function(error){
             console.log(error);
         });*/
    }
  }
};
</script>
<style>
  @import '../assets/style.css';
</style>
