<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos de la Asociación</v-toolbar-title>
         <v-spacer></v-spacer>
 
      <v-btn icon>
        <v-icon 
        @click="validar"
        >edit</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon
         @click="validarDelete"
         >delete</v-icon>
      </v-btn>

      </v-toolbar>
      <v-divider ></v-divider>
      <v-form v-model="valid">
    <v-row class="first_row">
        <v-col 
        lg="2"
        >
        <p>ID</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="asociacion.codigo"
      :disabled="true"
      label="Codigo"
      required
      solo
    ></v-text-field>    
        </v-col>
    </v-row>
    <v-row >
        <v-col 
        lg="2"
        >
        <p>Nombre</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="asociacion.nombre"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Name"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>
      </v-form>
</v-container>



    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
    props: ['asociacionID'],
    data() {
    return {
      asociacion: [],
      dialog: false,
       correct_data: true,

      nameRules: [
        v => !!v || 'Nombre es requirido',
        v => (v && v.length <= 50) || 'El nombre debe ser menor a 50 caracteres',
      ],
      form_Disable: false,
      //TODO:Model
      codigo: '',
      nombre:'',
      valid: true,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Asociación" : "Actualizar Asociación";
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
      .get("/asociacion/"+ this.asociacionID)
      .then(function(response){me.asociacion=response.data;
      })
      .catch(function(error){console.log(error);});

    },
    validar(){
        const answer = window.confirm('Desea actualizar los datos ingresados?')

        if(answer && this.valid){
            this.guardar()
        }else{

        }
    },
    limpiar() {
      this.codigo = "";
      this.nombre = "";
    },
    validarDelete(){
    const answer = window.confirm('Desea eliminar la asociación seleccionada?')

        if(answer){
            this.deleteItem()
        }else{

        }
    },
    deleteItem(){
      let me = this;
      axios.delete("/asociacion/"+me.asociacion.codigo)
      .then(function(response){
          window.location.href = '/asociacion';

         })
      .catch(function(error){
              this.correct_data = false;
             console.log(error);
         });
    },
    guardar() {
         let me =this;
         axios
         .put("/asociacion",{
             codigo:me.asociacion.codigo,
             nombre:me.asociacion.nombre
         })
         .then(function(response){
            window.location.href = '/asociacion';

         })
         .catch(function(error){
             console.log(error);
         });
     
    }
  }
};
</script>
<style>
  @import '../assets/details_view.css';
</style>