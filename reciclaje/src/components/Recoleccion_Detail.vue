<template>
<v-layout align-start>
    <v-flex>

    <v-container >

      <v-toolbar flat color="white">
        <v-toolbar-title>Datos de la Recoleccion</v-toolbar-title>
         <v-spacer></v-spacer>
 

      </v-toolbar>
      <v-divider ></v-divider>




      <v-form >
    <v-row class="first_row">
        <v-col 
        lg="2"
        >
        <p>ID</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="bolsa.codigo"
      :disabled="true"
      label="Codigo"
      solo
    ></v-text-field>    
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Generador</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="usuario.nombre"
      :disabled="true"
      label="Generador"
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
        <v-text-field
      v-model="reciclador.nombre"
      label="Reciclador"
            :disabled="true"
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Fecha de Creacion</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="bolsa.creadoFecha"
      label="Fecha de Creacion"
            :disabled="true"
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Fecha de Recojo</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="bolsa.recojoFecha"
      label="Fecha de Recojo"
            :disabled="true"
    ></v-text-field>      
        </v-col>
    </v-row>

    <v-row >
        <v-col 
        lg="2"
        >
        <p>Activa</p>
        </v-col>
     
        <v-col>
        <v-text-field
      v-model="bolsa.activa"
      label="Activa"
            :disabled="true"
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
    props: ['recoleccionID'],
    data() {
    return {
      bolsa: [],
      reciclador:{
        nombre:'No asignado'
      },
      usuario:{
        nombre:'No asignado'
      }
    };
  },
  computed: {
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
      .get("/bolsa/"+this.recoleccionID)
      .then(function(response){me.bolsa=response.data;
        me.usuario = response.data.usuario;

      if(response.data.reciclador != null){
        me.reciclador = response.data.reciclador;
      }
      
      })
      .catch(function(error){console.log(error);});
    
    }
  }
};
</script>
<style>
  @import '../assets/details_view.css';
</style>