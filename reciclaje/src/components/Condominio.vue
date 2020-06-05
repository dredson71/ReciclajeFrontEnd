<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Condominio</v-toolbar-title>
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
                    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="direccion" label="Dirección"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="urbanizacion" label="Urbanización"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombreContacto" label="Nombre del Contacto"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="numeroContacto" label="Número del Contacto"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-select
                        v-model="selected_Departamento"
                        :items="departamento"
                        item-text= "nombre"
                        item-value="codigo"
                        label="Departamento"
                        persistent-hint
                        return-object
                        @change=listar_distrito(selected_Departamento.nombre)
          
                        single-line
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-select
                        v-model="selected_Distrito"
                        :items="distrito"
                        item-text="nombre"
                        item-value="codigo"
                        label="Distrito"
                        persistent-hint
                        return-object
          
                        single-line
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-select
                        v-model="selected_Reciclador"
                        :items="reciclador"
                        item-text= "nombre"
                        item-value="codigo"
                        label="Reciclador"
                        persistent-hint
                        return-object
          
                        single-line
                    ></v-select>
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
    :items="condominio"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.actions="{ item }">
     

      <router-link :to="'/condominio/' + item.codigo "
      >
       <v-btn icon >
              <v-icon>info</v-icon>
            </v-btn>
      </router-link>

  
    </template>

    <template v-slot:item.distrito.nombre="{ item }">
      <td>{{item.distrito.nombre}}</td>
    </template>

    <template v-slot:item.reciclador.nombreCompleto="{ item }">
      <td>{{item.reciclador.nombre + " " + item.reciclador.apellido}}</td>
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
      condominio: [],
      selected_Distrito: {  codigo: 0 },
      selected_Departamento: {  codigo: 0 },
      selected_Reciclador: {  codigo: 0 },
      departamento:[],
      distrito:[],
      reciclador:[],
      dialog: false,
      headers: [
        {text: "Nombre", value: "nombre", sortable: false },
        {text: 'Dirección',value: 'direccion',sortable:false},
        {text: 'Urbanización',value: 'urbanizacion',sortable:false},
        {text: "Distrito", value: "distrito.nombre", sortable: false },
        {text: 'Departamento',value: 'distrito.departamento.nombre',sortable:false},
        {text: "Nombre del Contacto", value: "nombreContacto", sortable: false },
        {text: 'Número del Contacto',value: 'numeroContacto',sortable:false},
        {text: "Reciclador", value: "reciclador.nombreCompleto", sortable: false },
        {text: 'Actions',value: 'actions',sortable:false},
      ],
      search: "",
      editedIndex: -1,

      //TODO:Model
      codigo: '',
      nombre:'',
      direccion:'',
      urbanizacion:'',
      nombreContacto:'',
      numeroContacto:'',
      distrito_id: 0,
      departamento_id: 0,
      reciclador_id: 0

    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Condominio" : "Actualizar Condominio";
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
    this.listar_reciclador();
  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/condominio")
      .then(function(response){me.condominio=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_departamento(){
      let me=this;
      axios
      .get("/departamento")
      .then(function(response){me.departamento=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_distrito(dep){
      let me=this;
      axios
      .get("/distrito/" + dep)
      .then(function(response){me.distrito=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_reciclador(){
      let me=this;
      axios
      .get("/reciclador")
      .then(function(response){me.reciclador=response.data;})
      .catch(function(error){console.log(error);});
    },
    editItem(item) {
      //TODO
      this.codigo=item.codigo;
      this.nombre=item.nombre;
      this.direccion=item.direccion;
      this.urbanizacion=item.urbanizacion;
      this.distrito_id=item.distrito.codigo;
      this.departamento_id = item.distrito.departamento.codigo;
      this.nombreContacto=item.nombreContacto;
      this.numeroContacto=item.numeroContacto;
      this.reciclador_id=item.reciclador.codigo;

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
      this.direccion = "";
      this.urbanizacion = "";
      this.distrito_id = 0;
      this.departamento_id = 0;
      this.nombreContacto = "";
      this.numeroContacto = "";
      this.reciclador_id = 0;
      this.selected_Reciclador = {  codigo: 0 };
      this.selected_Departamento = {  codigo: 0 };
      this.selected_Distrito = {  codigo: 0 }
    },
    deleteItem(item,id){
      let me = this;
      axios.delete("/condominio/"+item.codigo)
      .then(function(response){
             me.listar();
         })
    },
    guardar() {
     //TODO
     if(this.editedIndex> -1){
         let me =this;
         axios
         .put("/condominio",{
            codigo:me.codigo,
            nombre:me.nombre,
            direccion:me.direccion,
            nombreContacto:me.nombreContacto,
            numeroContacto:me.numeroContacto,
            urbanizacion:me.urbanizacion,
            reciclador:{
                codigo: me.reciclador_id
            },
            distrito: {
                codigo: me.distrito_id
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
         .post("/condominio",{
            nombre:me.nombre,
            direccion:me.direccion,
            nombreContacto:me.nombreContacto,
            numeroContacto:me.numeroContacto,
            urbanizacion:me.urbanizacion,
            reciclador:{
                codigo: me.selected_Reciclador.codigo
            },
            distrito: {
                codigo: me.selected_Distrito.codigo 
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
