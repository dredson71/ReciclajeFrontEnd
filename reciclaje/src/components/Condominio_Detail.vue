<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos del Condominio</v-toolbar-title>
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
      v-model="condominio.codigo"
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
      v-model="condominio.nombre"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Nombre"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>
        <v-row >
        <v-col 
        lg="2"
        >
        <p>Dirección</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="condominio.direccion"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Dirección"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>
        <v-row >
        <v-col 
        lg="2"
        >
        <p>Urbanización</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="condominio.urbanizacion"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Urbanización"
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
          label="Departamento"
          persistent-hint
          return-object

          @focus=listar_distrito(departamento_id.nombre)

          single-line
        ></v-select>    
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
          v-model="distrito_id"
          :items="distrito"
          item-text="nombre"
          item-value="codigo"
          label="Distrito"
          persistent-hint
          single-line
        ></v-select>    
        </v-col>
    </v-row>
    <v-row >
        <v-col 
        lg="2"
        >
        <p>Nombre de contacto</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="condominio.nombreContacto"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Nombre de contacto"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>
        <v-row >
        <v-col 
        lg="2"
        >
        <p>Número de contacto</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="condominio.numeroContacto"
      :rules="nameRules"
      :disabled="form_Disable"
      label="Número de contacto"
      required
      solo
    ></v-text-field>      
        </v-col>
    </v-row>
    <v-row >
        <v-col 
        lg="2"
        >
        <p>Reciclador</p>
        </v-col>
     
        <v-col>
         <v-select
          v-model="reciclador_id"
          :items="reciclador"
          item-text="nombre"
          item-value="codigo"
          label="Reciclador"
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
    props: ['condominioID'],
    data() {
    return {
      condominio: [],
      distrito:[],
      departamento:[],
      reciclador:[],
      distrito_id: {  codigo: 0 },
      departamento_id: {  codigo: 0 },
      reciclador_id: {  codigo: 0 },
      dialog: false,
      correct_data: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters',
      ],
      form_Disable: false,
      codigo: '',
      nombre:'',
      direccion:'',
      urbanizacion:'',
      nombreContacto:'',
      numeroContacto:'',
      valid: true,
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
      .get("/condominio/"+this.condominioID)
      .then(function(response){me.condominio=response.data;
        me.distrito_id= response.data.distrito;
        me.departamento_id= response.data.distrito.departamento;
        me.reciclador_id= response.data.reciclador;
      })
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
      this.direccion = "";
      this.urbanizacion = "";
      this.distrito_id = {  codigo: 0 };
      this.departamento_id = {  codigo: 0 };
      this.nombreContacto = "";
      this.numeroContacto = "";
      this.reciclador_id = {  codigo: 0 };
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
      axios.delete("/condominio/"+me.condominio.codigo)
      .then(function(response){
            window.location.href = '/condominio';
         })
      .catch(function(error){
              this.correct_data = false;
             console.log(error);
         });
    },
    guardar() {
          let me =this;
          console.log( me.distrito_id)
          console.log( me.reciclador_id)
         axios
         .put("/condominio",{
            codigo:me.condominio.codigo,
            nombre:me.condominio.nombre,
            direccion:me.condominio.direccion,
            urbanizacion:me.condominio.urbanizacion,
            distrito: {
                 codigo: me.distrito_id.codigo
            },
            nombreContacto:me.condominio.nombreContacto,
            numeroContacto:me.condominio.numeroContacto,
            reciclador: {
                 codigo: me.reciclador_id.codigo
            }
         })
         .then(function(response){
            window.location.href = '/condominio';
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