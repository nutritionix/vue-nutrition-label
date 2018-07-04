<template>
  <div id="app">
    <h1>
      Vue Nutrition Label
    </h1>
    <nutrition-label :options="options" v-model="item"></nutrition-label>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // demo
      options: {
        width: 280,
        useFdaRounding: 0,
        addedSugars: {
          show: 1,
          na: 1
        },
        calcium: {
          show: 1,
          na: 1
        },
        calories: {
          show: 1,
          na: 1
        },
        cholesterol: {
          show: 1,
          na: 1
        },
        fatCalories: {
          show: 1,
          na: 1
        },
        fiber: {
          show: 1,
          na: 1
        },
        iron: {
          show: 1,
          na: 1
        },
        monounsaturatedFat: {
          show: 0,
          na: 1
        },
        polyunsaturatedFat: {
          show: 0,
          na: 1
        },
        potassium: {
          show: 1,
          na: 1
        },
        protein: {
          show: 1,
          na: 1
        },
        saturatedFat: {
          show: 1,
          na: 1
        },
        sodium: {
          show: 1,
          na: 1
        },
        sugarAlcohol: {
          show: 0,
          na: 1
        },
        sugars: {
          show: 1,
          na: 1
        },
        totalCarb: {
          show: 1,
          na: 1
        },
        totalFat: {
          show: 1,
          na: 1
        },
        transFat: {
          show: 1,
          na: 1
        },
        vitaminA: {
          show: 1,
          na: 1
        },
        vitaminC: {
          show: 1,
          na: 1
        },
        vitaminD: {
          show: 1,
          na: 1
        }
      },
      item: {
        name: 'Super Cheese Burger',
        serving: 175,
        servingPerContainer: 0,
        servingUnitName: 'gram',
        ingredientStatement: 'Swiss cheese, American cheese, more cheese and a burger.',
        nutrition: {
          calories: 510,
          fatCalories: 170,
          totalFat: 19,
          saturatedFat: 9,
          transFat: 2,
          polyunsaturatedFat: 0,
          monounsaturatedFat: 0,
          cholesterol: 10,
          sodium: 560,
          totalCarb: 79,
          fiber: 4,
          sugars: 35,
          protein: 9,
          vitaminA: 1,
          vitaminC: 2,
          calcium: 35,
          iron: 1,
          addedSugars: 0,
          potassium: 100,
          vitaminD: 0,
          servingWeight: 175
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
