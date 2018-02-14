<template>
  <div id="app">
    <h1>
      Vue Nutrition Label
    </h1>
    <nutrition-label :width="'280'" v-model="item"></nutrition-label>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // demo
      item: {
        name: 'Super Cheese Burger',
        serving: 1,
        ingredientStatement: 'Swiss cheese, American cheese, more cheese and a burger.',
        nutrition: {
          calories: 430,
          fatCalories: 10,
          totalFat: 5,
          saturatedFat: 1,
          transFat: 2,
          polyunsaturatedFat: 0.5,
          monounsaturatedFat: 0.5,
          cholesterol: 20,
          sodium: 100,
          totalCarb: 30,
          fiber: 2,
          sugars: 1,
          protein: 3,
          vitaminA: 1,
          vitaminC: 2,
          calcium: 30,
          iron: 1,
          addedSugars: 2,
          potassium: 470,
          vitaminD: 2
        }
      }
    };
  }
};
</script>
<style>
  #app {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  .nf {
    margin: 0 auto;
  }
</style>
