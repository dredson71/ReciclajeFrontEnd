<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Residuos</v-toolbar-title>
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
     

      <router-link :to="'/residuo/' + item.codigo "
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
      residuo: [],
      tipo_contendio:[],
      categoria:[],
      selected_Categoria: null,
      selected_Tipo: null,
      valid: false,
      show2:false,
      dialog: false,
      ruleNombre: [v => !!v || 'Nombre es requerido', v => (v && v.length <=50 ) || 'Nombre debe ser menor a 50 caracteres'],
      ruleDNI: [v => !!v || 'DNI es requerido',  v => (v && v.length == 8)  || 'DNI debe ser de 8 caracteres'],
      ruleApellido: [v => !!v || 'Apellido es requerido', v => (v && v.length <=50 ) || 'Apellido debe ser menor a 50 caracteres'],
      ruleDireccion: [v => !!v || 'Direccion es requerido', v => (v && v.length <=50 ) || 'Direccion debe ser menor a 50 caracteres'],
      ruleCelular: [v => !!v || 'Celular es requerido',  v => (v && v < 1000000000 && v > 99999999) || 'Celular debe ser de 9 caracteres'],
      ruleCorreo: [v => !!v || 'Correo es requerido',v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)  || 'E-mail must be valid', v => (v && v.length <=50 ) || 'Correo debe ser menor a 50 caracteres' ],
      rules: [v => !!v || 'Password es requerido',  v => (v && v.length >= 4) || 'Password debe ser mas de 4 caracteres'],
      headers: [
        { text: "Nombre", value: "nombre", sortable: false },
        { text: "Contenido", value: "contenido", sortable: false },
        { text: "Peso", value: "peso", sortable: false },
        {text: 'Categoria',value: 'categoria.nombre',sortable:false},
        {text: 'Tipo_Contenido',value: 'tipo_Contenido.nombre',sortable:false},
        {text: 'Actions',value: 'actions',sortable:false},
      ],
      search: "",
      editedIndex: -1,
      //TODO:Model
       codigo: '',
      nombre:'',
      apellido:'',
      celular:'',
      dni:'',
      direccion:'',
      email:'',
      password:'',
      distrito_id: 0,
      condominio_id: 0,
      departamento_id: 0,
      sexo_id: 0

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
    this.listar_categoria();
    this.listar_tipo();
  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/producto")
      .then(function(response){me.generador=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_categoria(){
      let me=this;
      axios
      .get("/categoria")
      .then(function(response){me.categoria=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_tipo(){
      let me=this;
      axios
      .get("/tipocontenido")
      .then(function(response){me.tipo_contendio=response.data;})
      .catch(function(error){console.log(error);});
    },
    close() {
      this.dialog = false;
      this.limpiar();
      this.editedIndex = -1;
      this.$refs.form.resetValidation()

    },

    open(){
      this.dialog = true;
    },
    limpiar() {
      this.nombre = "";
      this.picker= new Date().toISOString().substr(0, 10),
      this.apellido="";
      this.celular="";
      this.dni="";
      this.direccion="";
      this.email="";
      this.password="";
      this.selected_Distrito= {  codigo: 0 };
      this.selected_Departamento ={  codigo: 0 };
      this.selected_Condominio= null;
      this.selected_Sexo= null;
    },
    guardar() {
      this.$refs.form.validate()
      if(this.valid){
        console.log(1);
      let me=this;
         axios
         .post("/usuario",{
             nombre:me.nombre,
             apellido: me.apellido,
             dni:me.dni,
             direccion:me.direccion,
             email:me.email,
             password:me.password,
             fecha_Nacimiento:me.picker,
             salt:me.salt,
             telefono:me.celular,
             sexo:{
               codigo: me.selected_Sexo
             },
             condominio: {
             codigo: me.selected_Condominio 
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
