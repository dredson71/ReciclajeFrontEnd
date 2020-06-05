<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos del Generador</v-toolbar-title>
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




      <v-form v-model="valid" ref="form">
    <v-row class="first_row">
        <v-col 
        lg="2"
        >
        <p>ID</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="generador.codigo"
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
      v-model="generador.nombre"
      :rules="ruleNombre"
      label="Name"
      required
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
      v-model="generador.apellido"
      :rules="ruleApellido"
      label="Apellido"
      required
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
      v-model="generador.dni"
      :rules="ruleDNI"
      label="Dni"
      required
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Celular</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="generador.telefono"
      :rules="ruleCelular"
      label="Celular"
      required
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Direccion</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="generador.direccion"
      :rules="ruleDireccion"
      label="Direccion"
      required
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Correo</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="generador.email"
      :rules="ruleCorreo"
      label="Correo"
      required
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
                        v-model="selected_Departamento"
                        :items="departamento"
                        type="number"
                        item-text= "nombre"
                        item-value="codigo"
                        label="Departamento"
                        persistent-hint
                        @change=listar_distrito_byDepartamento(selected_Departamento)
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
                        v-model="selected_Distrito"
                        :items="distrito"
                        type="number"
                        :disabled="select_bool"
                        item-text= "nombre"
                        item-value="codigo"
                        label="Distrito"
                       @change=listar_condominio_bydistrito(selected_Distrito)
                        persistent-hint
                        single-line
                    ></v-select>  
        </v-col>
    </v-row>

     <v-row >
        <v-col 
        lg="2"
        >
        <p>Condominio</p>
        </v-col>
     
        <v-col>
           <v-select
                        v-model="selected_Condominio"
                        :items="condominio"
                        type="number"
                        :disabled="select_bool_condominio"
                        item-text= "nombre"
                        item-value="codigo"
                        label="Condominio"
                        :rules="[v => !!v || 'Item is required']"
                        required
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
    props: ['generadorID'],
    data() {
    return {
      generador: [],
      departamento:[],
      distrito:[],
      condominio:[],
      selected_Distrito: null,
      selected_Departamento: null,
      selected_Condominio: null,
      valid: false,
      show2:false,
      dialog: false,
      select_bool:true,
      select_bool_condominio : true,
       ruleNombre: [v => !!v || 'Nombre es requerido', v => (v && v.length <=50 ) || 'Nombre debe ser menor a 50 caracteres'],
      ruleZona: [v => !!v || 'Zona es requerido', v => (v && v.length <=20 ) || 'Zona debe ser menor a 20 caracteres'],
      ruleCodFormalizado: [v => !!v || 'Codigo Formalizador es requerido', v => (v && v.length <=13 ) || 'Codigo Formalizador debe ser menor a 13 caracteres'],
      ruleDNI: [v => !!v || 'DNI es requerido',  v => (v && v.length == 8) || 'DNI debe ser de 8 caracteres'],
      ruleApellido: [v => !!v || 'Apellido es requerido', v => (v && v.length <=50 ) || 'Apellido debe ser menor a 50 caracteres'],
      ruleDireccion: [v => !!v || 'Direccion es requerido', v => (v && v.length <=50 ) || 'Direccion debe ser menor a 50 caracteres'],
      ruleCelular: [v => !!v || 'Celular es requerido',  v => (v && v < 1000000000 && v > 99999999) || 'Celular debe ser de 9 caracteres'],
      ruleCorreo: [v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)  || 'E-mail must be valid' , v => (v && v.length <=50 ) || 'Correo debe ser menor a 50 caracteres'],
      rules: [ v => (v && v.length <=10 ) || 'Password debe ser menor a 10 caracteres'],
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
    this.listar_distrito();
    this.listar_condominio();
  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/usuario/"+this.generadorID)
      .then(function(response){me.generador=response.data;
        me.selected_Departamento = response.data.condominio.distrito.departamento.codigo;
        me.selected_Distrito= response.data.condominio.distrito.codigo;
        me.selected_Condominio= response.data.condominio.codigo;
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
    listar_distrito_byDepartamento(depa){
      /*let me=this;
      axios
      .get("/distrito")
      .then(function(response){me.distrito=response.data;})
      .catch(function(error){console.log(error);});*/
      var nombre_depar = "";
      for(var i=0; i < this.departamento.length ; i++){
        if(this.departamento[i].codigo == depa)
          nombre_depar = this.departamento[i].nombre;
      }
      this.select_bool = false;
      let me=this;
      axios
      .get("/distrito/"+nombre_depar)
      .then(function(response){me.distrito=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_distrito(){
      let me=this;
      axios
      .get("/distrito")
      .then(function(response){me.distrito=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_condominio(){
      let me=this;
      axios
      .get("/condominio")
      .then(function(response){me.condominio=response.data;})
      .catch(function(error){console.log(error);});
    },
     listar_condominio_bydistrito(depa){
    
     var nombre_depar = "";
      for(var i=0; i < this.distrito.length ; i++){
        if(this.distrito[i].codigo == depa)
          nombre_depar = this.distrito[i].nombre;
      }
      this.select_bool_condominio = false;
      let me=this;
      axios
      .get("/condominio/distrito/"+nombre_depar)
      .then(function(response){me.condominio=response.data;
     })
      .catch(function(error){console.log(error);});
      console.log(this.selected_Condominio);

    },
    validar(){
        const answer = window.confirm('Desea actualizar los datos ingresados?')
        if(answer){
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

        this.$refs.form.validate()
      if(this.valid){
       console.log(this.generador.nombre);
        console.log(this.generador.apellido);
        console.log(this.generador.dni);
        console.log(this.generador.celular);
        console.log(this.generador.email);
        console.log(this.generador.direccion);
        console.log(this.selected_Condominio);
        console.log(this.selected_asociacion);
      }
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