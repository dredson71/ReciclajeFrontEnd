<template>
   <div>
     <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
   </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data(){
      return {
        chartData:{
          '2017-05-13': 2,
          '2017-05-14': 5,
          '2017-05-15': 4

        }
      }
    }
  }
</script>
