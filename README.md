# vue-nutrition-label

> A VueJS component to create a 2018 FDA-style nutrition label

## Installation
### via npm

``` bash
npm install vue-nutrition-label --save
```

### via CDN
``` html
<script src="https://cdn.jsdelivr.net/npm/vue-nutrition-label/dist/vue-nutritioan-label.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/vue-nutrition-label/dist/vue-nutrition-label.min.css" rel="stylesheet" type="text/css">
```

## Usage
### via npm
``` html
<!-- Vue component -->
<template>
  <div>
    <nutrition-label :options="options" v-model="item"></nutrition-label>
  </div>
</template>

<script>
  import NutritionLabel from 'vue-nutrition-label';

  // register globally
  Vue.component('nutrition-label', NutritionLabel);

  export default {
    // or register locally
    components: {
      NutritionLabel
    },
    data () {
      return {
        options: {},
        item: {}
      };
    }
  }
</script>

<style>
  your styles
</style>
```
### via CDN
``` html
<html>
  <head>
    <title>...</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-nutrition-label/dist/vue-nutrition-label.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/vue-nutrition-label/dist/vue-nutrition-label.min.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <div id="app">
      <nutrition-label :options="options" v-model="item"></nutrition-label>
    </div>
   <script>
      var vm = new Vue({
        el: '#app',
        components: {
          'nutrition-label': window.VueNutritionLabel.NutritionLabel
        },
        data() {
          return {
            options: {},
            item: {}
       });
    </script>
  </body>
</html>
```

## :options
The `options` prop must be an `Object`.

``` javascript
const options = {
  width: 280,
  useFdaRounding: 1, // use FDA rounding rules
  readOnly: false,  // show/hide serving input field
  multipleItems: false,
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
}
```

## Item Object
``` javascript
const item = {
  name: 'Double Cheese Burger',
  serving: 1,
  servingPerContainer: 0,
  servingUnitName: 'serving',
  ingredientStatement: 'Swiss cheese, American cheese, more cheese and a burger.',
  nutrition: {
    calories: 510,
    fatCalories: 170,
    totalFat: 19,
    saturatedFat: 9,
    transFat: 0,
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
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run bundle
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
