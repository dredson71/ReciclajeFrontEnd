<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos del Distrito</v-toolbar-title>
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
      v-model="distrito.codigo"
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
      v-model="distrito.nombre"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Name"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>
     <v-row >
        <v-col 
        lg="2"
        >
        <p>Departamento</p>
        </v-col>
     
        <v-col>
         <v-select
          v-model="departamento_id"
          :items="departamento"
          item-text="nombre"
          item-value="codigo"
          label="Select"
          persistent-hint
          return-object
          
          single-line
        ></v-select>    
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
    props: ['distritoID'],
    data() {
    return {
      distrito: [],
      /* Prueba Jorge */
      departamento:[],
      departamento_id: 1,
      dialog: false,
      correct_data: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters',
      ],
      form_Disable: false,

      codigo: '',
      nombre:'',
      valid: true,
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
      .get("/distrito/id/"+this.distritoID)
      .then(function(response){me.distrito=response.data;
        me.departamento_id= response.data.departamento.codigo;
      })
      .catch(function(error){console.log(error);});
    

    },
    listar_departamento(){
      let me=this;
      axios
      .get("/departamento")
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
    const answer = window.confirm('Desea eliminar el distrito seleccionado?')

        if(answer){
            this.deleteItem()
        }else{

        }
    },
    deleteItem(){
      let me = this;
      axios.delete("/distrito/"+me.distrito.codigo)
      .then(function(response){
            window.location.href = '/distrito';

         })
      .catch(function(error){
              this.correct_data = false;
             console.log(error);
         });
    },
    guardar() {
          let me =this;
         axios
         .put("/distrito",{
            codigo:me.distrito.codigo,
            nombre:me.distrito.nombre,
              departamento: {
                 codigo: me.departamento_id.codigo 
            }
         })
         .then(function(response){
            window.location.href = '/distrito';

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
