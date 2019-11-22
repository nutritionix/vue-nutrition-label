<template>
  <div id='app'>
    <h1>
      Vue Nutrition Label
    </h1>
    <div class="wrap">
      <div class="col1">
        <form>
          <p>
            <label>Serving Weight</label>
            <input type="number" v-model="n.servingWeight">
          </p>
          <p v-if="options.calories.show">
            <label>Calories</label>
            <input type="number" v-model="n.calories">
          </p>
          <p v-if="options.fatCalories.show">
            <label>Calories from Fat</label>
            <input type="number" v-model="n.fatCalories">
          </p>
          <p v-if="options.totalFat.show">
            <label>Total Fat</label>
            <input type="number" v-model="n.totalFat">
          </p>
          <p v-if="options.saturatedFat.show">
            <label>Saturated Fat</label>
            <input type="number" v-model="n.saturatedFat">
          </p>
          <p v-if="options.transFat.show">
            <label>Trans Fat</label>
            <input type="number" v-model="n.transFat">
          </p>
          <p v-if="options.polyunsaturatedFat.show">
            <label>Polyunsaturated Fat</label>
            <input type="number" v-model="n.polyunsaturatedFat">
          </p>
          <p v-if="options.monounsaturatedFat.show">
            <label>Monounsaturated Fat</label>
            <input type="number" v-model="n.monounsaturatedFat">
          </p>
          <p v-if="options.cholesterol.show">
            <label>Cholesterol</label>
            <input type="number" v-model="n.cholesterol">
          </p>
          <p v-if="options.sodium.show">
            <label>Sodium</label>
            <input type="number" v-model="n.sodium">
          </p>
          <p v-if="options.totalCarb.show">
            <label>Carbohydrate</label>
            <input type="number" v-model="n.totalCarb">
          </p>
          <p v-if="options.fiber.show">
            <label>Fiber</label>
            <input type="number" v-model="n.fiber">
          </p>
          <p v-if="options.sugars.show">
            <label>Sugars</label>
            <input type="number" v-model="n.sugars">
          </p>
          <p v-if="options.addedSugars.show">
            <label>Added Sugars</label>
            <input type="number" v-model="n.addedSugars">
          </p>
          <p v-if="options.protein.show">
            <label>Protein</label>
            <input type="number" v-model="n.protein">
          </p>
          <p v-if="options.vitaminA.show">
            <label>Vitamin A</label>
            <input type="number" v-model="n.vitaminA">
          </p>
          <p v-if="options.vitaminC.show">
            <label>Vitamin C</label>
            <input type="number" v-model="n.vitaminC">
          </p>
          <p v-if="options.vitaminD.show">
            <label>Vitamin D</label>
            <input type="number" v-model="n.vitaminD">
          </p>
          <p v-if="options.calcium.show">
            <label>Calcium</label>
            <input type="number" v-model="n.calcium">
          </p>
          <p v-if="options.iron.show">
            <label>Iron</label>
            <input type="number" v-model="n.iron">
          </p>
          <p v-if="options.potassium.show">
            <label>Potassium</label>
            <input type="number" v-model="n.potassium">
          </p>
          <p v-if="options.caffeine.show">
            <label>Caffeine</label>
            <input type="number" v-model="n.caffeine">
          </p>
        </form>
      </div>
      <div class="col2">
        <nutrition-label :options="options" v-model="item"></nutrition-label>
      </div>
      <div class="col3">
        <nutrition-label :options="ukOptions" v-model="item"></nutrition-label>
      </div>
    </div>
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
        useFdaRounding: 1,
        readOnly: false,
        multipleItems: false,
        layout: 'US',
        locale: {
          nutritionFacts: 'Nutrition Facts',
          dailyValues: 'Daily Value',
          servingSize: 'Serving Size:',
          servingsPerContainer: 'Servings Per Container:',
          amountPerServing: 'Amount Per Serving',
          calories: 'Calories',
          caffeine: 'Caffeine',
          fatCalories: 'Calories from Fat',
          totalFat: 'Total Fat',
          satFat: 'Saturated Fat',
          transFat: '<em>Trans<em> Fat',
          polyFat: 'Polyunsaturated Fat',
          monoFat: 'Monounsaturated Fat',
          cholesterol: 'Cholesterol',
          sodium: 'Sodium',
          potassium: 'Potassium',
          totalCarb: 'Total Carbohydrates',
          fiber: 'Dietary Fiber',
          sugars: 'Sugars',
          protein: 'Protein',
          vitaminA: 'Vitamin A',
          vitaminC: 'Vitamin C',
          calcium: 'Calcium',
          iron: 'Iron',
          includes: 'Includes',
          addedSugars: 'Added Sugars',
          vitaminD: 'Vitamin D',
          ingredients: 'Ingredients',
          disclaimer: 'Disclaimer',
          viewAllIngredients: 'View All Ingredients',
          multipleItems: 'Multiple Items'
        },
        addedSugars: {
          show: 1,
          na: 1
        },
        caffeine: {
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
          show: 0,
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
        serving: 1,
        servingPerContainer: 0,
        servingUnitName: 'serving',
        ingredientStatement: 'Swiss cheese, American cheese, more cheese and a burger.',
        nutrition: {
          calories: 523.1247,
          caffeine: 12.43,
          fatCalories: 170,
          totalFat: 48.5941,
          saturatedFat: 69.3748,
          transFat: 0,
          polyunsaturatedFat: 0,
          monounsaturatedFat: 0,
          cholesterol: 10,
          sodium: 780.2844,
          totalCarb: 7.5555,
          fiber: 15.1524,
          sugars: 22.6127,
          protein: 38.9961,
          vitaminA: 1,
          vitaminC: 2,
          calcium: 35,
          iron: 1,
          addedSugars: 0,
          potassium: 100,
          vitaminD: 0,
          servingWeight: 200
        }
      }
    };
  },
  computed: {
    ukOptions () {
      let options = JSON.parse(JSON.stringify(this.options));
      options.width = 380;
      options.layout = 'UK';
      options.locale.nutritionFacts = 'Nutrition';
      return options;
    },
    n () {
      return this.item.nutrition;
    }
  }
};
</script>
<style>
  #app {
    font-family: Arial, Helvetica, sans-serif;
  }
  h1 {
    text-align: center;
  }
  .nf {
    margin: 0 auto;
  }
  form, form * {
    font-size: 12px;
  }
  form label {
    display: block;
    float: left;
    width: 130px;
    padding: 5px 10px 0 0;
    text-align: right;
  }
  form input {
    background-color: #f0f0f0;
    border: none;
    padding: 4px 6px;
    width: 80px;
  }
  form p {
    margin: 0 0 4px 0;
    padding: 0;
  }
  .wrap {
    clear: both;
    margin: 0 auto;
    width: 1000px;
  }
  .col1, .col2, .col3 {
    float: left;
  }
  .col1 {
    width: 260px;
  }
  .col2 {
    width: 340px;
  }
  .col3 {
    width: 400px
  }

</style>
