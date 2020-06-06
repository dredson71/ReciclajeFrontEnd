<template>
<v-app id="app" >
 <v-app-bar app 

  dark

  color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title       >Reciclemos</v-toolbar-title>
        <v-list dense color="primary" class ="listaSelect" > 

      <v-list-group
      color="white"
      
      >
        <template v-slot:activator>
          <v-list-item-title>Usuarios</v-list-item-title>
        </template>
              <v-list-item v-for="item in items2" :key="item.text" router :to="item.route">

          <v-list-item-content>
            <v-list-item-title class="navigation_tile">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    
      </v-list-group>
    </v-list>

    <v-list dense color="primary" class ="listaSelect" > 

      <v-list-group
      color="white"
      
      >
        <template v-slot:activator>
          <v-list-item-title>Solicitudes</v-list-item-title>
        </template>
              <v-list-item v-for="item in items_Solicitudes" :key="item.text" router :to="item.route">

          <v-list-item-content>
            <v-list-item-title class="navigation_tile">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    
      </v-list-group>
    </v-list>
    
     <v-btn
          v-for="item in itemss"
          :key="item.text"
          router :to="item.route"
          color="primary"
          class="listaSelect"
          small
          depressed
          
          
        >
          {{ item.text }}
        </v-btn>




      
  </v-app-bar>
  
        <v-navigation-drawer app v-model="drawer" class="primary">
        <v-list>
        <v-list-item v-for="item in items" :key="item.text" router :to="item.route" @click="drawer = !drawer">
          <v-list-item-icon >
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="navigation_tile">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

<template v-slot:append>
        <div class="pa-2">
          <v-btn block>Logout</v-btn>
        </div>
      </template>
        </v-navigation-drawer>


    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>


  </v-app>

</template>
<script>
export default {
  name: 'App',
  data () {
    return {
       drawer: false,
       items: [
          { icon: 'dashboard', text: 'Inicio',route: '/' },
          { icon: 'folder', text: 'Departamento',route: '/departamento'  },
          { icon: 'folder', text: 'Distrito' ,route: '/distrito' },
          { icon: 'folder', text: 'Asociación' ,route: '/asociacion' }
        ],
         items2: [
          { icon: 'folder', text: 'Generador' ,route: '/generador' },
          { icon: 'folder', text: 'Reciclador' ,route: '/reciclador' },
        ],
        items_Solicitudes: [
          { icon: 'folder', text: 'Generador' ,route: '/solicitud_generador' },
          { icon: 'folder', text: 'Condominio' ,route: '' },
        ], 
        itemss: [
           { icon: 'folder', text: 'Condominio' ,route: '/condominio' },
          { icon: 'folder', text: 'Recoleccion' ,route: '/recoleccion' },
          { icon: 'folder', text: 'Residuo' ,route: '/residuo' },
        ],
    }
  },
  methods:{
    onClick (e, item) {
        e.stopPropagation()
      },
  },
}
</script>
<style>
  @import './assets/style.css';
</style>