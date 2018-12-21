<template>
  <div itemtype="http://schema.org/NutritionInformation" class="nf" :style="{ width: settings.width }">
    <div class="nf-title">
      Nutrition Facts
    </div>
    <div class="nf-line">
      <div class="nf-serving">
        <div class="nf-serving-per-container" v-if="servingPerContainer > 0">
          {{ servingPerContainer }} Serving per container
        </div>
        <template v-if="!settings.readOnly">
        <input
          type="text"
          class="nf-modifier-field"
          id="serving"
          @click="selectAll()"
          @keydown="serving.isModified = true"
          data-role="none"
          aria-label="Change the Quantity Textbox"
          v-model.number.lazy="serving.value">
        </template>
        <div class="nf-item-name" :class="{ 'read-only': settings.readOnly }">
          <div v-if="!settings.readOnly">
            {{ servingUnitName }}
            <template v-if="servingWeight !== 0">
              ({{ servingWeight }}g)
            </template>
          </div>
          <div v-if="settings.readOnly">
            Serving Size:
            <template v-if="!settings.multipleItems">
              {{ value.serving }} x {{ itemName }}
            </template>
            <template v-if="settings.multipleItems">
              Multiple items
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="nf-bar2"></div>
    <div class="nf-amount-per-serving">
      Amount per serving
    </div>
    <div class="nf-calories" v-if="calories.show">
      <span>Calories</span>
      <span class="nf-pr" itemprop="calories">{{ calories.value }}</span>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-line nf-text-right">
      <span class="nf-highlight nf-percent-dv">% Daily Value*</span>
    </div>
    <div class="nf-line" v-if="totalFat.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ totalFat.dv }}%</span>
      <span class="nf-highlight">Total Fat</span>
      <span itemprop="fatContent">
        {{ totalFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
    </span>
    </div>
    <div class="nf-line nf-indent" v-if="saturatedFat.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ saturatedFat.dv }}%</span>
      <span>Saturated Fat</span>
      <span itemprop="saturatedFatContent">
        {{ saturatedFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent" v-if="transFat.show">
      <span><em>Trans</em> Fat</span>
      <span itemprop="transFatContent">
        {{ transFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line" v-if="cholesterol.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ cholesterol.dv }}%</span>
      <span class="nf-highlight">Cholesterol</span>
      <span itemprop="cholesterolContent">
        {{ cholesterol.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line" v-if="sodium.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ sodium.dv }}%</span>
      <span class="nf-highlight">Sodium</span>
      <span itemprop="cholesterolContent">
        {{ sodium.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line" v-if="totalCarb.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ totalCarb.dv }}%</span>
      <span class="nf-highlight">Total Carbohydrates</span>
      <span itemprop="carbohydrateContent">
        {{ totalCarb.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent" v-if="fiber.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ fiber.dv }}%</span>
      <span>Dietary Fiber</span>
      <span itemprop="fiberContent">
        {{ fiber.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent" v-if="sugars.show">
      <span>Sugars</span>
      <span itemprop="sugarContent">
        {{ sugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent2" v-if="addedSugars.show">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ addedSugars.dv }}%</span>
      <span>
        Includes
        <span itemprop="">{{ addedSugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
        Added Sugars
      </span>
    </div>
    <div class="nf-line" v-if="protein.show">
      <span class="nf-highlight">Protein</span>
      <span itemprop="proteinContent">
        {{ protein.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-bar2"></div>
    <div class="nf-vitamins">
      <div class="nf-vitamins">
        <div class="nf-vitamin-column" v-if="vitaminD.show">
          Vitamin D {{ vitaminD.value }}<span aria-hidden="true">mcg</span>
          <span class="sr-only"> micrograms</span>
          <span class="nf-pr" aria-hidden="true">{{ vitaminD.dv }}%</span>
        </div>
        <div class="nf-vitamin-column" v-if="calcium.show">
          Calcium {{ calcium.value }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span class="nf-pr" aria-hidden="true">{{ calcium.dv }}%</span>
        </div>
        <div class="nf-vitamin-column" v-if="iron.show">
          Iron {{ iron.value }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span class="nf-pr" aria-hidden="true">{{ iron.dv }}%</span>
        </div>
        <div class="nf-vitamin-column" v-if="potassium.show">
          Potassium {{ potassium.value }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span class="nf-pr" aria-hidden="true">{{ potassium.dv }}%</span>
        </div>
      </div>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-footnote">
      <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2000 calories a day is used for general nutrition advice.</span>
        <div class="nf-ingredient-statement">
          <strong>INGREDIENTS:</strong>
          <div v-html="ingredientStatement"></div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vue-nutrition-label',

  props: {
    value: {
      type: Object,
      default () {
        return {};
      }
    },
    options: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data () {
    return {
      serving: {
        value: this.value.serving,
        isModified: false
      },
      rdi: {
        totalFat: 65,
        saturatedFat: 20,
        cholesterol: 300,
        sodium: 2400,
        totalCarb: 300,
        fiber: 25,
        addedSugars: 50,
        protein: 50,
        vitaminD: 20,
        calcium: 1300,
        iron: 18,
        potassium: 4700,
        vitaminA: 5000,
        vitaminC: 60
      }
    };
  },

  watch: {
    value () {
      this.isLoaded = true;
      this.serving.value = this.value.serving;
    }
  },

  methods: {
    modifyServing (num) {
      if (this.serving.value === 0.5 && num === -1) { return; }

      if (this.serving.value === 1 && num === -1) {
        num = -0.5;
      }

      if (this.serving.value === 0.5 && num === 1) {
        num = 0.5;
      }

      this.serving.value += num;
      this.serving.isModified = true;
    },

    unitValue (nutrient) {
      if (this.value.hasOwnProperty('nutrition') && this.value.nutrition.hasOwnProperty(nutrient)) {
        let value = this.value.nutrition[nutrient];

        switch (nutrient) {
          case 'calories':
            return this.roundCalories(this.multiplier(value));

          // Fats
          case 'totalFat':
          case 'transFat':
          case 'monounsaturatedFat':
          case 'polyunsaturatedFat':
          case 'saturatedFat':
            return this.roundFats(this.multiplier(value));

          case 'sodium':
            return this.roundSodium(this.multiplier(value));

          case 'cholesterol':
            return this.roundCholesterol(this.multiplier(value));

          case 'potassium':
            value = value / 100 * this.rdi[nutrient];
            return this.roundPotassium(this.multiplier(value));

          // Vitamins and Minerals
          case 'vitaminD':
          case 'calcium':
          case 'iron':
            value = value / 100 * this.rdi[nutrient];
            return this.roundVitaminsMinerals(this.multiplier(value));

          // Essentials
          case 'totalCarb':
          case 'fiber':
          case 'sugars':
          case 'addedSugars':
          case 'protein':
            return this.roundEssentials(this.multiplier(value));

          case 'servingWeight':
            return this.servingUnitName.toLowerCase() === 'gram'
              ? this.serving.value.toFixed(0)
              : this.byServing(value).toFixed(0);
        }
      }
    },

    multiplier (value) {
      return this.servingUnitName.toLowerCase() === 'gram'
        ? this.byWeight(value)
        : this.byServing(value);
    },

    percentDailyValue (nutrient) {
      let unitValue = this.unitValue(nutrient);
      let dv = (unitValue / this.rdi[nutrient] * 100).toFixed(0);

      switch (nutrient) {
        case 'cholesterol':
          if (unitValue === '< 5') {
            dv = 0;
          }
          break;

        case 'totalCarb':
        case 'fiber':
        case 'sugars':
        case 'addedSugars':
        case 'protein':
          if (unitValue === '< 1') {
            dv = 0;
          }
          break;
      }

      return dv;
    },

    hasOption (key) {
      return this.options.hasOwnProperty(key);
    },

    byServing (value) {
      if (!this.serving.isModified) {
        return value;
      }

      return value * this.serving.value;
    },

    byWeight (value) {
      if (!this.serving.isModified) {
        return value;
      }

      return this.serving.value * (value / this.value.serving);
    },

    roundCalories (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value < 5) {
        return 0;
      } else if (value <= 50) {
        // 50 cal - express to nearest 5 cal increment
        return this.roundToNearestNum(value, 5);
      }
      // > 50 cal - express to nearest 10 cal increment
      return this.roundToNearestNum(value, 10);
    },

    roundFats (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value < 0.5) {
        return 0;
      } else if (value < 5) {
        // < 5 g - express to nearest .5g increment
        return this.roundToNearestNum(value, 0.5);
      }
      // >= 5 g - express to nearest 1 g increment
      return this.roundToNearestNum(value, 1);
    },

    roundCholesterol (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value < 2) {
        return 0;
      } else if (value <= 5) {
        return '< 5';
      }
      // > 5 mg - express to nearest 5 mg increment
      return this.roundToNearestNum(value, 5);
    },

    roundSodium (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value < 5) {
        return 0;
      } else if (value <= 140) {
        // 5 - 140 mg - express to nearest 5 mg increment
        return this.roundToNearestNum(value, 5);
      }
      // >= 5 g - express to nearest 10 g increment
      return this.roundToNearestNum(value, 10);
    },

    roundPotassium (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value < 5) {
        return 0;
      } else if (value <= 140) {
      // 5 - 140 mg - express to nearest 5 mg increment
        return this.roundToNearestNum(value, 5);
      } else {
      // >= 5 g - express to nearest 10 g increment
        return this.roundToNearestNum(value, 10);
      }
    },

    // Total Carb, Fiber, Sugar, Sugar Alcohol and Protein
    roundEssentials (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value < 0.5) {
        return 0;
      } else if (value < 1) {
        // < 1 g - express as "Contains less than 1g" or "less than 1g"
        return '< 1';
      }
      // > 1 mg - express to nearest 1 g increment
      return this.roundToNearestNum(value, 1);
    },

    // Vitamin D, Calcium and Iron
    roundVitaminsMinerals (value) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      if (value > 0) {
        if (value < 10) {
          // < 10 - round to nearest even number
          return this.roundToNearestNum(value, 2);
        } else if (value < 50) {
          // between 10 and 50, round to the nearest 5 increment
          return this.roundToNearestNum(value, 5);
        }
        // else, round to the nearest 10 increment
        return this.roundToNearestNum(value, 10);
      }
      return 0;
    },

    roundToNearestNum (value, nearest) {
      if (!this.settings.useFdaRounding) {
        return value.toFixed(0);
      }

      value = this.roundToSpecificDecimalPlace(value, 4);
      if (nearest < 0) {
        return Math.round(value * nearest) / nearest;
      }
      return Math.round(value / nearest) * nearest;
    },

    roundToSpecificDecimalPlace (value, decimals) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    },

    selectAll () {
      let el = document.querySelector('#serving');
      el.select();
      el.setSelectionRange(0, 9999);
    }
  },

  computed: {
    settings () {
      return {
        width: this.hasOption('width')
          ? this.options.width.toString() + 'px'
          : 'auto',
        useFdaRounding: this.hasOption('useFdaRounding')
          ? this.options.useFdaRounding
          : 0,
        readOnly: this.hasOption('readOnly')
          ? this.options.readOnly
          : false,
        multipleItems: this.hasOption('multipleItems')
          ? this.options.multipleItems
          : false
      };
    },
    itemName () {
      return this.value.hasOwnProperty('name') ? this.value.name : 'Item';
    },
    servingPerContainer () {
      return this.value.hasOwnProperty('servingPerContainer') ? this.value.servingPerContainer : 0;
    },
    servingUnitName () {
      return this.value.hasOwnProperty('servingUnitName') && this.value.servingUnitName !== '' ? this.value.servingUnitName : 'Serving';
    },
    calories () {
      return {
        value: this.unitValue('calories'),
        show: this.hasOption('calories') ? this.options.calories.show : 1
      };
    },
    totalFat () {
      return {
        value: this.unitValue('totalFat'),
        dv: this.percentDailyValue('totalFat'),
        show: this.hasOption('totalFat') ? this.options.totalFat.show : 1
      };
    },
    saturatedFat () {
      return {
        value: this.unitValue('saturatedFat'),
        dv: this.percentDailyValue('saturatedFat'),
        show: this.hasOption('saturatedFat') ? this.options.saturatedFat.show : 1
      };
    },
    transFat () {
      return {
        value: this.unitValue('transFat'),
        show: this.hasOption('transFat') ? this.options.transFat.show : 1
      };
    },
    cholesterol () {
      return {
        value: this.unitValue('cholesterol'),
        dv: this.percentDailyValue('cholesterol'),
        show: this.hasOption('cholesterol') ? this.options.cholesterol.show : 1
      };
    },
    sodium () {
      return {
        value: this.unitValue('sodium'),
        dv: this.percentDailyValue('sodium'),
        show: this.hasOption('sodium') ? this.options.sodium.show : 1
      };
    },
    totalCarb () {
      return {
        value: this.unitValue('totalCarb'),
        dv: this.percentDailyValue('totalCarb'),
        show: this.hasOption('totalCarb') ? this.options.totalCarb.show : 1
      };
    },
    fiber () {
      return {
        value: this.unitValue('fiber'),
        dv: this.percentDailyValue('fiber'),
        show: this.hasOption('fiber') ? this.options.fiber.show : 1
      };
    },
    sugars () {
      return {
        value: this.unitValue('sugars'),
        show: this.hasOption('sugars') ? this.options.sugars.show : 1
      };
    },
    addedSugars () {
      return {
        value: this.unitValue('addedSugars'),
        dv: this.percentDailyValue('addedSugars'),
        show: this.hasOption('addedSugars') ? this.options.addedSugars.show : 0
      };
    },
    protein () {
      return {
        value: this.unitValue('protein'),
        show: this.hasOption('protein') ? this.options.protein.show : 1
      };
    },
    vitaminD () {
      return {
        value: this.unitValue('vitaminD'),
        dv: this.percentDailyValue('vitaminD'),
        show: this.hasOption('vitaminD') ? this.options.vitaminD.show : 1
      };
    },
    calcium () {
      return {
        value: this.unitValue('calcium'),
        dv: this.percentDailyValue('calcium'),
        show: this.hasOption('calcium') ? this.options.calcium.show : 1
      };
    },
    iron () {
      return {
        value: this.unitValue('iron'),
        dv: this.percentDailyValue('iron'),
        show: this.hasOption('iron') ? this.options.iron.show : 1
      };
    },
    potassium () {
      return {
        value: this.unitValue('potassium'),
        dv: this.percentDailyValue('potassium'),
        show: this.hasOption('potassium') ? this.options.potassium.show : 1
      };
    },
    servingWeight () {
      return this.unitValue('servingWeight');
    },
    ingredientStatement () {
      return this.value.hasOwnProperty('ingredientStatement') ? this.value.ingredientStatement : 'None';
    }
  }
};
</script>
<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Archivo+Black');
.nf {
  border: 1px solid #000;
  padding: 6px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  line-height: 14px;
  text-align: left;

  &-title,
  &-serving-unit-qty,
  &-highlight,
  &-serving,
  &-amount-per-serving,
  &-calories {
    font-family: 'Archivo Black', sans-serif;
  }

  &-title {
    font-size: 2.15em;
    line-height: 1.15em;
    margin-top: -6px;
  }

  &-serving-per-container {
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 2px;
  }

  &-serving {
    font-size: 1.2em;
    line-height: normal;
    padding: 3px 0;
    >div>span {
      float: left;
    }
  }

  &-serving-size {
    margin-left: 105px;
    text-align: right;
  }

  &-amount-per-serving {
    font-size: .94em;
  }

  &-arrow-up,
  &-arrow-down {
    width: 0;
    height: 0;
    border-style: solid;
  }

  &-arrows {
    float: left;
    padding: 6px 5px 0 0;
  }

  &-arrow-up {
    cursor: pointer;
    margin-bottom: 4px;
    border-width: 0 5px 6px 5px;
    border-color: transparent transparent #333 transparent;
  }

  &-arrow-down {
    cursor: pointer;
    margin-top: 4px;
    border-width: 6px 5px 0 5px;
    border-color: #333 transparent transparent transparent;
  }

  &-modifier-field {
    width: 30px;
    text-align: center;
    line-height: normal;
    border: 1px solid #666;
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 1em;
    float: left;
    padding: 2px 0;
    margin-top: 3px;
  }

  &-item-name {
    display: table;
    margin-left: 42px;
    padding-top: 2px;
    min-height: 25px;
    &.read-only {
      margin-left: 0;
    }
    > div {
      display: table-cell;
      vertical-align: middle;
      min-height: 24px;
    }
  }

  &-serving-unit-qty {
    display: inline-block;
  }

  &-calories {
    font-size: 2em;
    line-height: 1em;
  }

  &-percent-dv {
    font-size: .84em;
  }

  &-vitamin-column {
   font-size: .94em;
   padding: 1px 0;
   border-bottom: 1px solid #000;
  }

  &-ingredient-statement {
    padding-top: 8px;
  }

  &-footnote {
    padding-top: 4px;
    margin-left: 5px;
    font-size: .85em;
    line-height: 1em;
  }

  &-footnote:before {
    content: "*";
    float: left;
    margin-left: -5px;
  }

  &-text-right {
    text-align: right;
  }

  &-line {
    border-top: 1px solid #000;
    padding-top: 1px;
    padding-bottom: 1px;
    font-size: .94em;
  }

  &-indent2 {
    margin-left: 28px;
  }

  &-indent {
    padding-left: 16px;
  }

  &-pr {
    float: right;
  }

  &-bar1 {
    height: 5px;
  }

  &-bar2 {
    height: 10px;
  }

  &-bar1,
  &-bar2 {
    background-color: #000;
  }
}

.clear {
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}

.pull-right {
  float: right;
}
</style>
