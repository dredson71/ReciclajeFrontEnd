<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos del Departamento</v-toolbar-title>
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
      v-model="departamento.codigo"
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
      v-model="departamento.nombre"
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
    props: ['departamentoID'],
    data() {
    return {
      departamento: [],
      dialog: false,
       correct_data: true,

      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters',
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
      .get("/departamento/"+ this.departamentoID)
      .then(function(response){me.departamento=response.data;
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
    const answer = window.confirm('Desea eliminar el departamento seleccionado?')

        if(answer){
            this.deleteItem()
        }else{

        }
    },
    deleteItem(){
      let me = this;
      axios.delete("/departamento/"+me.departamento.codigo)
      .then(function(response){
          window.location.href = '/departamento';

         })
      .catch(function(error){
              this.correct_data = false;
             console.log(error);
         });
    },
    guardar() {
         let me =this;
         axios
         .put("/departamento",{
             codigo:me.departamento.codigo,
             nombre:me.departamento.nombre
         })
         .then(function(response){
            window.location.href = '/departamento';

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
