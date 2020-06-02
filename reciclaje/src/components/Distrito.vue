<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Distrito</v-toolbar-title>
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


        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" @click="open" color="primary" dark class="mb-2">Nuevo</v-btn>
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
            
          <v-select
          v-model="selected_Department"
          :items="departamento"
          item-text="nombre"
          item-value="codigo"
          label="Select"
          v-on:change="setValue()"
          persistent-hint
          return-object
          
          single-line
        ></v-select>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </v-toolbar>
      <v-data-table
    :headers="headers"
    :items="distrito"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>

      <v-icon
        small
        @click="deleteItem(item,item.codigo)"
      >
        delete
      </v-icon>
    </template>

    <template v-slot:item.departamento.nombre="{ item }">
      <td>{{item.departamento.nombre}}</td>
    </template>



    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
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
      distrito: [],
      selected_Department: {  codigo: 0 },
      departamento:[],
      dialog: false,
      headers: [
        { text: "Nombres", value: "nombre", sortable: false },
        {text: 'Departamento',value: 'departamento.nombre',sortable:false},
        {text: 'Actions',value: 'actions',sortable:false},

      ],
      search: "",
      editedIndex: -1,

      //TODO:Model
      codigo: '',
      nombre:'',
      departamento_id: 0

    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Distrito" : "Actualizar Distrito";
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
    this.listar_departamento();

  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/distrito")
      .then(function(response){me.distrito=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_departamento(){
      let me=this;
      axios
      .get("/departamento")
      .then(function(response){me.departamento=response.data;})
      .catch(function(error){console.log(error);});
    },
    setValue(){
    this.departamento_id = this.selected_Department.codigo
    },
    editItem(item) {
      //TODO
      this.codigo=item.codigo;
      this.nombre=item.nombre;
      this.departamento_id = item.departamento.codigo;

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
      this.departamento_id = 0;
    },
    deleteItem(item,id){
      let me = this;
      axios.delete("/distrito/"+item.codigo)
      .then(function(response){
             me.listar();
         })
    },
    guardar() {
     //TODO
     if(this.editedIndex> -1){
         let me =this;
         axios
         .put("/distrito",{
            codigo:me.codigo,
            nombre:me.nombre,
              departamento: {
             codigo: me.departamento_id 
            }
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
         .post("/distrito",{
             nombre:me.nombre,
              departamento: {
             codigo: me.departamento_id 
            }
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
<style>
  @import '../assets/style.css';
</style>
