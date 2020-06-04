<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos del Reciclador</v-toolbar-title>
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
      v-model="reciclador.codigo"
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
      v-model="reciclador.nombre"
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
        <p>Apellido</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="reciclador.apellido"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Apellido"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>DNI</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="reciclador.dni"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Dni"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>

     <v-row >
        <v-col 
        lg="2"
        >
        <p>Distrito</p>
        </v-col>
     
        <v-col>
         <v-select
          v-model.number="distrito_id"
          :disabled="true"
          type="number"
          :items="distrito"
          item-text="nombre"
          item-value="codigo"
          label="Select"
          persistent-hint
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
    props: ['recicladorID'],
    data() {
    return {
      reciclador: [],
      departamento:[],
      distrito:[],
      condominio: [],
      departamento_id:0,
      distrito_id: 0,
    condominio_id: 0,
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
    this.listar_distrito();
    this.listar_condominio();
    
  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/reciclador/"+this.recicladorID)
      .then(function(response){me.reciclador=response.data;
        me.departamento_id = response.data.condominio.distrito.departamento.codigo;
        me.distrito_id= response.data.condominio.distrito.codigo;
        me.condominio_id= response.data.condominio.codigo;
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
    listar_distrito(){
      let me=this;
      axios
      .get("/distrito")
      .then(function(response){me.distrito=response.data;
      })
      .catch(function(error){console.log(error);});
    },
     listar_condominio(){
      let me=this;
      axios
      .get("/condominio")
      .then(function(response){me.condominio=response.data;
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
     /* let me = this;
      axios.delete("/distrito/"+me.distrito.codigo)
      .then(function(response){
            window.location.href = '/distrito';
         })
      .catch(function(error){
              this.correct_data = false;
             console.log(error);
         });*/
    },
    guardar() {
        /*  let me =this;
          console.log( me.departamento_id)
         axios
         .put("/distrito",{
            codigo:me.distrito.codigo,
            nombre:me.distrito.nombre,
            departamento: {
                 codigo: me.departamento_id
            }
         })
         .then(function(response){
            window.location.href = '/distrito';
         })
         .catch(function(error){
             console.log(error);
         });*/
     
    }
  }
};
</script>
<style>
  @import '../assets/details_view.css';
</style>