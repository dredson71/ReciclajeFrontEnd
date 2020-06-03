<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Departamento</v-toolbar-title>
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
         @click="open" color="primary">
            Nuevo
      </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombre" label="Nombres"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn 
          @click.native="close" color="primary">
            Cancelar
      </v-btn>
      <v-btn 
          @click.native="guardar" color="primary">
            Guardar
      </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
    :headers="headers"
    :items="departamento"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.actions="{ item }">
     

      <router-link :to="'/departamento/' + item.codigo ">
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
      departamento: [],
      dialog: false,
      headers: [
        {text: 'ID',value: 'codigo',sortable:false},
        { text: "Nombres", value: "nombre", sortable: false },
        {text: 'Actions',value: 'actions',sortable:false}
      ],
      search: "",
      editedIndex: -1,

      //TODO:Model
      codigo: '',
      nombre:''
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Departamento" : "Actualizar Departamento";
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
      .get("/departamento")
      .then(function(response){me.departamento=response.data;})
      .catch(function(error){console.log(error);});
    },
    editItem(item) {
      //TODO
      this.codigo=item.codigo;
      this.nombre=item.nombre;

      this.editedIndex=1;
      this.dialog=true;
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
    },
    deleteItem(item,id){
      let me = this;
      axios.delete("/departamento/"+item.codigo)
      .then(function(response){
             me.listar();
         })
    },
    guardar() {
     //TODO
     if(this.editedIndex> -1){
         let me =this;
         axios
         .put("/departamento",{
             codigo:me.codigo,
             nombre:me.nombre
         })
         .then(function(response){
             me.close();
             me.listar();
             me.limpiar();
         })
         .catch(function(error){
             console.log(error);
         });
     }
     else {
         let me=this;
         axios
         .post("/departamento",{
             nombre:me.nombre
         })
         .then(function(response){
             me.close();
             me.listar();
             me.limpiar();
         })
         .catch(function(error){
             console.log(error);
         });

     }
    }
  }
};
</script>
