<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Generador</v-toolbar-title>
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
        @click="open"
         color="primary">
            Nuevo
      </v-btn>

      <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-form v-model="valid" ref="form">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nombre" 
                    :rules="ruleNombre"
                     required
                    label="Nombre"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="apellido" 
                    :rules="ruleApellido"
                     required
                    label="Apellido"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="dni" 
                    :rules="ruleDNI"
                     required
                    label="DNI"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>


            </v-card-text>
               <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-date-picker
                        v-model="picker"
                        year-icon="mdi-calendar-blank"
                        prev-icon="mdi-skip-previous"
                        next-icon="mdi-skip-next"
                      ></v-date-picker>
                     </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

           

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="direccion" 
                    :rules="ruleDireccion"
                    required
                    label="Direccion"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="email" 
                    :rules="ruleCorreo"
                    required
                    label="Correo Electronico"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>


            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
           <v-text-field
           v-model="password"
            :append-icon="show2 ? 'visibility' : 'visibility_off'"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            :rules="rules"
            @click:append="show2 = !show2"
          ></v-text-field>
          </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

             <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="celular"
                                        :rules="ruleCelular"
                                        required
                                     type="number"

                  label="Celular"></v-text-field>
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
                        @change=listar_condominio(selected_Distrito.nombre)

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
                        v-model="selected_Condominio"
                        :items="condominio"
                        item-text="nombre"
                        item-value="codigo"
                        label="Condominio"
                        :rules="[v => !!v || 'Item is required']"
                        required
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
                        v-model="selected_Sexo"
                        :items="sexo"
                        item-text= "nombre"
                        item-value="codigo"
                        label="Sexo"
                        :rules="[v => !!v || 'Item is required']"
                        required
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

          </v-form>

          </v-card>
        </v-dialog>




      </v-toolbar>
      <v-data-table
    :headers="headers"
    :items="generador"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.actions="{ item }">
     

      <router-link :to="'/generador/' + item.codigo "
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
      generador: [],
      departamento:[],
      distrito:[],
      condominio:[],
      sexo:[],
      selected_Distrito: {  codigo: 0 },
      selected_Departamento: {  codigo: 0 },
      selected_Condominio: null,
      selected_Sexo: null,
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

      picker: new Date().toISOString().substr(0, 10),
      headers: [
        { text: "Nombres", value: "nombre", sortable: false },
        { text: "Apellido", value: "apellido", sortable: false },
        { text: "DNI", value: "dni", sortable: false },
        {text: 'Distrito',value: 'condominio.distrito.nombre',sortable:false},
        {text: 'Condominio',value: 'condominio.nombre',sortable:false},
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
    this.listar_departamento();
    this.listar_sexo();
  },
  methods: {
    listar() {
      //TODO
      let me=this;
      axios
      .get("/usuario")
      .then(function(response){me.generador=response.data;})
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
    listar_condominio(dist){
      let me=this;
      axios
      .get("/condominio/distrito/"+dist)
      .then(function(response){me.condominio=response.data;})
      .catch(function(error){console.log(error);});
    },
    listar_sexo(){
      let me=this;
      axios
      .get("/sexo" )
      .then(function(response){me.sexo=response.data;})
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
