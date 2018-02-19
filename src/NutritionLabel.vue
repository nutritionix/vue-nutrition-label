<template>
  <div itemtype="http://schema.org/NutritionInformation" class="nf" :style="{ width: options.width }">
    <div class="nf-title">
      Nutrition Facts
    </div>
    <div class="nf-line">
      <div class="nf-serving">
        <div>
          Serving Size: <span itemprop="servingSize">{{ serving }}</span>
        </div>
        <div class="nf-arrows">
          <div
            class="nf-arrow-up"
            aria-label="Increase the Quantity Arrow"
            rel="nofollow"
            @click="modifyServing(1)">
          </div>
          <div
            class="nf-arrow-down"
            aria-label="Decrease the Quantity Arrow"
            rel="nofollow"
            @click="modifyServing(-1)">
          </div>
        </div>
        <input
          type="text"
          value="1"
          class="nf-modifier-field"
          data-role="none"
          aria-label="Change the Quantity Textbox"
          v-model="serving">
        <div class="nf-item-name ">
          <div>
            {{ value.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="nf-bar2"></div>
    <div class="nf-amount-per-serving">
      Amount per serving
    </div>
    <div class="nf-calories">
      <span>Calories</span>
      <span class="nf-pr" itemprop="calories">{{ calories }}</span>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-line nf-text-right">
      <span class="nf-highlight nf-percent-dv">% Daily Value*</span>
    </div>
    <div class="nf-line">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ totalFat.dv }}%</span>
      <span class="nf-highlight">Total Fat</span>
      <span itemprop="fatContent">
        {{ totalFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
    </span>
    </div>
    <div class="nf-line nf-indent">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ saturatedFat.dv }}%</span>
      <span>Saturated Fat</span>
      <span itemprop="saturatedFatContent">
        {{ saturatedFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent">
      <span><em>Trans</em> Fat</span>
      <span itemprop="transFatContent">
        {{ transFat }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ cholesterol.dv }}%</span>
      <span class="nf-highlight">Cholesterol</span>
      <span itemprop="cholesterolContent">
        {{ cholesterol.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ sodium.dv }}%</span>
      <span class="nf-highlight">Sodium</span>
      <span itemprop="cholesterolContent">
        {{ sodium.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ totalCarb.dv }}%</span>
      <span class="nf-highlight">Total Carbohydrates</span>
      <span itemprop="carbohydrateContent">
        {{ totalCarb.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ fiber.dv }}%</span>
      <span>Dietary Fiber</span>
      <span itemprop="fiberContent">
        {{ fiber.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent">
      <span>Sugars</span>
      <span itemprop="sugarContent">
        {{ sugars }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent2">
      <span class="nf-highlight nf-pr" aria-hidden="true">{{ addedSugars.dv }}%</span>
      <span>
        Includes
        <span itemprop="">{{ addedSugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
        Added Sugars
    </span>
    </div>
    <div class="nf-line">
      <span class="nf-highlight">Protein</span>
      <span itemprop="proteinContent">
        {{ protein }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-bar2"></div>
    <div class="nf-vitamins">
      <div class="nf-vitamins">
        <div class="nf-vitamin-column">
          Vitamin D {{ vitaminD.value }}<span aria-hidden="true">mcg</span>
          <span class="sr-only"> micrograms</span>
          <span class="nf-pr" aria-hidden="true">{{ vitaminD.dv }}%</span>
        </div>
        <div class="nf-vitamin-column">
          Calcium {{ calcium.value }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span class="nf-pr" aria-hidden="true">{{ calcium.dv }}%</span>
        </div>
        <div class="nf-vitamin-column">
          Iron {{ iron.value }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span class="nf-pr" aria-hidden="true">{{ iron.dv }}%</span>
        </div>
        <div class="nf-vitamin-column">
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
          {{ value.ingredientStatement || 'None' }}
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
    width: {
      type: String,
      default () {
        return 'auto';
      }
    }
  },

  data () {
    return {
      serving: this.value.serving,
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
      this.serving = this.value.serving;
    }
  },

  methods: {
    modifyServing (num) {
      if (this.serving === 0.5 && num === -1) { return; }

      if (this.serving === 1 && num === -1) {
        num = -0.5;
      }

      if (this.serving === 0.5 && num === 1) {
        num = 0.5;
      }

      this.serving += num;
    },
    unitValue (nutrient) {
      return this.value.nutrition[nutrient] * this.serving;
    },
    percentDailyValue (nutrient) {
      return Math.round(this.unitValue(nutrient) / this.rdi[nutrient] * 100);
    }
  },

  computed: {
    options () {
      return {
        width: this.width === 'auto'
          ? this.width
          : this.width + 'px'
      };
    },
    calories () {
      return this.unitValue('calories');
    },
    totalFat () {
      return {
        value: this.unitValue('totalFat'),
        dv: this.percentDailyValue('totalFat')
      };
    },
    saturatedFat () {
      return {
        value: this.unitValue('saturatedFat'),
        dv: this.percentDailyValue('saturatedFat')
      };
    },
    transFat () {
      return this.unitValue('transFat');
    },
    cholesterol () {
      return {
        value: this.unitValue('cholesterol'),
        dv: this.percentDailyValue('cholesterol')
      };
    },
    sodium () {
      return {
        value: this.unitValue('sodium'),
        dv: this.percentDailyValue('sodium')
      };
    },
    totalCarb () {
      return {
        value: this.unitValue('totalCarb'),
        dv: this.percentDailyValue('totalCarb')
      };
    },
    fiber () {
      return {
        value: this.unitValue('fiber'),
        dv: this.percentDailyValue('fiber')
      };
    },
    sugars () {
      return this.unitValue('sugars');
    },
    addedSugars () {
      return {
        value: this.unitValue('addedSugars'),
        dv: this.percentDailyValue('addedSugars')
      };
    },
    protein () {
      return this.unitValue('protein');
    },
    vitaminD () {
      return {
        value: this.unitValue('vitaminD'),
        dv: this.percentDailyValue('vitaminD')
      };
    },
    calcium () {
      return {
        value: this.unitValue('calcium'),
        dv: this.percentDailyValue('calcium')
      };
    },
    iron () {
      return {
        value: this.unitValue('iron'),
        dv: this.percentDailyValue('iron')
      };
    },
    potassium () {
      return {
        value: this.unitValue('potassium'),
        dv: this.percentDailyValue('potassium')
      };
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

  &-per-container {
    font-size: 1.15em;
    line-height: normal;
  }

  &-serving {
    font-size: 1.2em;
    line-height: normal;
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
    width: 26px;
    text-align: center;
    line-height: normal;
    border: 1px solid #666;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
    float: left;
    padding: 2px 0;
    margin-top: 3px;
  }

  &-item-name {
    margin-left: 50px;
    line-height: 1.25em;
    padding-top: 6px;
    padding-bottom: 5px;
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
</style>
