<template>
  <div itemtype="http://schema.org/NutritionInformation"
    v-if="isLoaded"
    class="nf"
    :class="{ uk: settings.layout.toLowerCase() === 'uk', us: settings.layout.toLowerCase() !== 'uk' }"
    :style="{ width: settings.width }">
    <!-- US -->
    <template v-if="settings.layout.toLowerCase() === 'us'">
      <div class="nf-title" v-html="text.nutritionFacts || 'Nutrition Facts'">
      </div>
      <div class="nf-line">
        <div class="nf-serving">
          <div class="nf-serving-per-container" v-if="servingPerContainer > 0">
            {{ servingPerContainer }} <span v-html="text.servingsPerContainer || 'Serving per container'"></span>
          </div>
          <template v-if="!settings.readOnly">
          <input
            type="text"
            class="nf-modifier-field"
            @click="selectAll()"
            @keydown="serving.isModified = true"
            data-role="none"
            aria-label="Change the Quantity Textbox"
            v-model.number.lazy="serving.value">
          </template>
          <div class="nf-item-name" :class="{ 'read-only': settings.readOnly }">
            <div v-if="!settings.readOnly">
              {{ servingUnitName }}
              <template v-if="settings.showServingWeight">
                ({{ servingWeight }}g)
              </template>
            </div>
            <template v-if="settings.readOnly">
              <span class="text-serving-size" v-html="text.servingSize || 'Serving Size'">
              </span>
              <span class="text-serving-item" v-if="!settings.multipleItems">
                {{ value.serving }} {{ itemName }}
              </span>
              <span v-if="settings.multipleItems" v-html="text.multipleItems || 'Multiple items'">
              </span>
            </template>
          </div>
        </div>
      </div>
      <div class="nf-bar2"></div>
      <div class="nf-amount-per-serving" v-html="text.amountPerServing || 'Amount per serving'">
      </div>
      <div class="nf-calories" v-if="calories.show">
        <span v-html="text.calories || 'Calories'"></span>
        <span class="nf-pr" itemprop="calories">{{ calories.value }}</span>
      </div>
      <div class="nf-bar1"></div>
      <div class="nf-line nf-text-right">
        <span class="nf-highlight nf-percent-dv">% <span v-html="text.dailyValues || 'Daily Value'"></span>*</span>
      </div>
      <div class="nf-line" v-if="totalFat.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ totalFat.dv }}%</span>
        <span class="nf-highlight" v-html="text.totalFat || 'Total Fat'"></span>
        <span itemprop="fatContent">
          {{ totalFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
      </div>
      <div class="nf-line nf-indent" v-if="saturatedFat.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ saturatedFat.dv }}%</span>
        <span v-html="text.satFat || 'Saturated Fat'"></span>
        <span itemprop="saturatedFatContent">
          {{ saturatedFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-line nf-indent" v-if="transFat.show">
        <span v-html="text.transFat || '<em>Trans</em> Fat'"></span>
        <span itemprop="transFatContent">
          {{ transFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-line" v-if="cholesterol.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ cholesterol.dv }}%</span>
        <span class="nf-highlight" v-html="text.cholesterol || 'Cholesterol'"></span>
        <span itemprop="cholesterolContent">
          {{ cholesterol.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
        </span>
      </div>
      <div class="nf-line" v-if="sodium.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ sodium.dv }}%</span>
        <span class="nf-highlight" v-html="text.sodium || 'Sodium'"></span>
        <span itemprop="sodiumContent">
          {{ sodium.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
        </span>
      </div>
      <div class="nf-line" v-if="totalCarb.show">
        <span class="nf-highlight nf-pr" aria-hidden="true" v-if="settings.countryDV.toLowerCase() !== 'ca'">{{ totalCarb.dv }}%</span>
        <span class="nf-highlight" v-html="text.totalCarb || 'Total Carbohydrates'"></span>
        <span itemprop="carbohydrateContent">
          {{ totalCarb.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-line nf-indent" v-if="fiber.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ fiber.dv }}%</span>
        <span v-html="text.fiber || 'Dietary Fiber'"></span>
        <span itemprop="fiberContent">
          {{ fiber.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-line nf-indent" v-if="sugars.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ sugars.dv }}%</span>
        <span v-html="text.sugars || 'Sugars'"></span>
        <span itemprop="sugarContent">
          {{ sugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-line nf-indent2" v-if="addedSugars.show">
        <span class="nf-highlight nf-pr" aria-hidden="true">{{ addedSugars.dv }}%</span>
        <span>
          <span v-html="text.includes || 'Includes'"></span>
          <span itemprop="">{{ addedSugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
          </span>
          <span v-html="text.addedSugars || 'Added Sugars'"></span>
        </span>
      </div>
      <div class="nf-line" v-if="protein.show">
        <span class="nf-highlight" v-html="text.protein || 'Protein'"></span>
        <span itemprop="proteinContent">
          {{ protein.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-bar2"></div>
      <div class="nf-vitamins">
        <div class="nf-vitamins">
          <div class="nf-vitamin-column" v-if="vitaminA.show">
            <span v-html="text.vitaminA || 'Vitamin A'"></span> {{ vitaminA.value }}<span aria-hidden="true">IU</span>
            <span class="sr-only"> International Unit</span>
            <span class="nf-pr" aria-hidden="true">{{ vitaminA.dv }}%</span>
          </div>
          <div class="nf-vitamin-column" v-if="vitaminC.show">
            <span v-html="text.vitaminC || 'Vitamin C'"></span> {{ vitaminC.value }}<span aria-hidden="true">mg</span>
            <span class="sr-only"> milligrams</span>
            <span class="nf-pr" aria-hidden="true">{{ vitaminC.dv }}%</span>
          </div>
          <div class="nf-vitamin-column" v-if="vitaminD.show">
            <span v-html="text.vitaminD || 'Vitamin D'"></span> {{ vitaminD.value }}<span aria-hidden="true">mcg</span>
            <span class="sr-only"> micrograms</span>
            <span class="nf-pr" aria-hidden="true">{{ vitaminD.dv }}%</span>
          </div>
          <div class="nf-vitamin-column" v-if="calcium.show">
            <span v-html="text.calcium || 'Calcium'"></span> {{ calcium.value }}<span aria-hidden="true">mg</span>
            <span class="sr-only"> milligrams</span>
            <span class="nf-pr" aria-hidden="true">{{ calcium.dv }}%</span>
          </div>
          <div class="nf-vitamin-column" v-if="iron.show">
            <span v-html="text.iron || 'Iron'"></span> {{ iron.value }}<span aria-hidden="true">mg</span>
            <span class="sr-only"> milligrams</span>
            <span class="nf-pr" aria-hidden="true">{{ iron.dv }}%</span>
          </div>
          <div class="nf-vitamin-column" v-if="potassium.show">
            <span v-html="text.potassium || 'Potassium'"></span> {{ potassium.value }}<span aria-hidden="true">mg</span>
            <span class="sr-only"> milligrams</span>
            <span class="nf-pr" aria-hidden="true">{{ potassium.dv }}%</span>
          </div>
        </div>
      </div>
      <div class="nf-bar2"></div>
          <div v-if="caffeine.show">
            <span v-html="text.caffeine || 'Caffeine'"></span> {{ caffeine.value }}<span aria-hidden="true">mg</span>
            <span class="sr-only"> milligrams</span>
          </div>
      <div v-if="caffeine.show" class="nf-bar1"></div>
      <div class="nf-footnote">
        <span>
          {{ text.footnote || 'The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2000 calories a day is used for general nutrition advice.' }}
        </span>
          <div class="nf-ingredient-statement">
            <strong v-html="(text.ingredients || 'INGREDIENTS') + ':'"></strong>
            <div v-html="ingredientStatement"></div>
          </div>
      </div>
    </template>
    <!-- UK -->
    <template v-if="settings.layout.toLowerCase() === 'uk'">
      <div class="nf-title" v-html="text.nutritionFacts || 'Nutrition'">
      </div>
      <table>
        <thead>
          <tr>
            <th>Typical Values</th>
            <th>Per 100g</th>
            <th>
              <template v-if="!settings.readOnly">
                <input
                  type="text"
                  class="nf-modifier-field"
                  @click="selectAll()"
                  @keydown="serving.isModified = true"
                  data-role="none"
                  aria-label="Change the Quantity Textbox"
                  v-model.number.lazy="serving.value">
              </template>
              {{ servingUnitName }}
              <template v-if="servingWeight !== 0">
                ({{ servingWeight }}g)
              </template>
            </th>
            <th>%*({{ servingWeight }}g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Energy</td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ kilojoules.per100 }}kj</template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ kilojoules.value }}kj</template>
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td itemprop="calories">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ calories.per100 }}kcal</template>
            </td>
            <td itemprop="calories">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ calories.value }}kcal</template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ calories.dv }}%</template>
            </td>
          </tr>
          <tr>
            <td>Total Fat</td>
            <td itemprop="fatContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ totalFat.per100 }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td itemprop="fatContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ totalFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ totalFat.dv }}%</template>
            </td>
          </tr>
          <tr>
            <td class="nf-indent">Saturated Fat</td>
            <td itemprop="saturatedFatContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ saturatedFat.per100 }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td itemprop="saturatedFatContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ saturatedFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ saturatedFat.dv }}%</template>
            </td>
          </tr>
          <tr>
            <td>Carbohydrate</td>
            <td itemprop="carbohydrateContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ totalCarb.per100 }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td itemprop="carbohydrateContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ totalCarb.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ totalCarb.dv }}%</template>
            </td>
          </tr>
          <tr>
            <td class="nf-indent">Sugars</td>
            <td itemprop="sugarContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ sugars.per100 }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td itemprop="sugarContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ sugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ sugars.dv }}%</template>
            </td>
          </tr>
          <tr>
            <td>Fibre</td>
            <td itemprop="fiberContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ fiber.per100 }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td itemprop="fiberContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ fiber.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Protein</td>
            <td itemprop="proteinContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ protein.per100 }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td itemprop="proteinContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ protein.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span></template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ protein.dv }}%</template>
            </td>
          </tr>
          <tr>
            <td>Salt</td>
            <td itemprop="sodiumContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ salt.per100 }}<span aria-hidden="true">g</span><span class="sr-only">grams</span></template>
            </td>
            <td itemprop="sodiumContent">
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ salt.value }}<span aria-hidden="true">g</span><span class="sr-only">grams</span></template>
            </td>
            <td>
              <template v-if="zeroServingWeight">
                <span aria-hidden="true">&ndash;</span>
                <span class="sr-only">Data not available</span>
              </template>
              <template v-if="!zeroServingWeight">{{ salt.dv }}%</template>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
              <span v-html="text.footnote || '* Reference intake of an average adult (8400kj/2000kcal)'">
              </span>
              <div class="nf-ingredient-statement">
                <strong v-html="(text.ingredients || 'INGREDIENTS') + ':'"></strong>
                <div v-html="ingredientStatement"></div>
              </div>
              <div class="nf-disclaimer" v-if="text.disclaimer" v-html="text.disclaimer">
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </template>
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
        totalFat: { us: 65, uk: 70, ca: 75 },
        saturatedFat: 20,
        cholesterol: 300,
        sodium: { us: 2400, ca: 2300 },
        totalCarb: { us: 300, uk: 260 },
        fiber: { us: 25, ca: 28 },
        addedSugars: 50,
        protein: 50,
        vitaminD: 20,
        calcium: 1300,
        iron: 18,
        potassium: { us: 4700, ca: 3400 },
        vitaminA: 5000,
        vitaminC: 60,
        kilojoules: 8400,
        calories: 2000,
        sugars: { us: 100, uk: 90, ca: 100 },
        salt: 6
      }
    };
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
      if ((this.value.hasOwnProperty('nutrition') && this.value.nutrition.hasOwnProperty(nutrient)) ||
        nutrient === 'kilojoules' ||
        nutrient === 'salt') {
        let layout = this.settings.layout.toLowerCase();
        let value = this.value.nutrition[nutrient];

        switch (nutrient) {
          case 'kilojoules':
            value = this.value.nutrition['calories'] * 4.184;
            return this.ukRound(nutrient, this.multiplier(value));

          case 'calories':
            return layout === 'uk'
              ? this.ukRound(nutrient, this.multiplier(value))
              : this.roundCalories(this.multiplier(value));

          // Fats
          case 'totalFat':
          case 'transFat':
          case 'monounsaturatedFat':
          case 'polyunsaturatedFat':
          case 'saturatedFat':
            return layout === 'uk'
              ? this.ukRound(nutrient, this.multiplier(value))
              : this.roundFats(this.multiplier(value));

          case 'sodium':
            return this.roundSodium(this.multiplier(value));

          case 'salt':
            value = this.value.nutrition['sodium'] * 0.0025;
            return this.ukRound(nutrient, this.multiplier(value));

          case 'cholesterol':
            return this.roundCholesterol(this.multiplier(value));

          case 'potassium':
            return this.roundPotassium(this.multiplier(value));

          case 'caffeine':
            return this.roundToNearestNum(this.multiplier(value), 1);

          // Vitamins and Minerals
          case 'vitaminA':
          case 'vitaminC':
          case 'vitaminD':
          case 'calcium':
          case 'iron':
            return this.roundVitaminsMinerals(this.multiplier(value));

          // Essentials
          case 'totalCarb':
          case 'fiber':
          case 'sugars':
          case 'addedSugars':
          case 'protein':
            return layout === 'uk'
              ? this.ukRound(nutrient, this.multiplier(value))
              : this.roundEssentials(this.multiplier(value));

          case 'servingWeight':
            return this.servingUnitName.toLowerCase() === 'serving'
              ? this.roundToSpecificDecimalPlace(this.byServing(value), 0)
              : this.roundToSpecificDecimalPlace(this.byWeight(value), 0);
        }
      }
    },

    multiplier (value) {
      return this.servingUnitName.toLowerCase() === 'serving'
        ? this.byServing(value)
        : this.byWeight(value);
    },

    percentDailyValue (nutrient) {
      let unitValue = this.unitValue(nutrient);
      let countryDV = this.settings.countryDV.toLowerCase();
      let rdi = 0;

      if ((typeof this.rdi[nutrient]) === 'object') {
        rdi = !this.rdi[nutrient][countryDV]
          ? this.rdi[nutrient]['us']
          : this.rdi[nutrient][countryDV];
      } else {
        rdi = this.rdi[nutrient];
      }

      let dv = this.roundToSpecificDecimalPlace(unitValue / rdi * 100, 0);

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

        case 'salt':
          dv = this.roundToSpecificDecimalPlace(this.unitValue('sodium') * 0.0025 / rdi * 100, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
        return this.roundToSpecificDecimalPlace(value, 0);
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
      let el = document.querySelector('.' + this.settings.layout.toLowerCase() + ' .nf-modifier-field');
      el.select();
      el.setSelectionRange(0, 9999);
    },

    per100 (nutrient) {
      let value;

      if (nutrient === 'kilojoules') {
        value = this.value.nutrition['calories'] / this.value.nutrition.servingWeight * 100 * 4.184;
      } else if (nutrient === 'salt') {
        value = this.value.nutrition['sodium'] * 2.5 / 1000 / this.value.nutrition.servingWeight * 100;
      } else {
        value = this.value.nutrition[nutrient] / this.value.nutrition.servingWeight * 100;
      }

      return this.ukRound(nutrient, value);
    },

    ukRound (nutrient, value) {
      let round = this.settings.useFdaRounding;

      switch (nutrient) {
        case 'kilojoules':
          return round
            ? Math.round(value)
            : this.roundToSpecificDecimalPlace(value, 1);

        case 'calories':
          return round
            ? Math.round(value)
            : this.roundToSpecificDecimalPlace(value, 1);

        case 'totalFat':
        case 'transFat':
        case 'saturatedFat':
        case 'monounsaturatedFat':
        case 'polyunsaturatedFat':
        case 'totalCarb':
        case 'fiber':
        case 'sugars':
        case 'addedSugars':
        case 'protein':
          if (value >= 10) {
            value = round
              ? Math.round(value)
              : this.roundToSpecificDecimalPlace(value, 1);
          }

          if ((value < 10 && value > 0.5) || (value < 10 && value > 0.1 && nutrient === 'saturatedFat')) {
            value = this.roundToSpecificDecimalPlace(value, 1);
          }

          if (value < 0.5 && value > 0 && nutrient !== 'saturatedFat') {
            value = '<0.5';
          }

          if (value < 0.1 && value > 0 && nutrient === 'saturatedFat') {
            value = '<0.1';
          }

          return value;

        case 'salt':
          if (value >= 1) {
            value = this.roundToSpecificDecimalPlace(value, 0);
          }

          if (value < 1 && value > 0.0125) {
            value = this.roundToSpecificDecimalPlace(value, 2);
          }

          if (value < 0.0125 && value > 0) {
            value = '<0.01';
          }

          return value;
      }
    }
  },

  computed: {
    isLoaded () {
      return this.value.hasOwnProperty('name');
    },
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
          : false,
        showServingWeight: this.hasOption('showServingWeight')
          ? this.options.showServingWeight
          : 0,
        layout: this.hasOption('layout')
          ? this.options.layout
          : 'US',
        countryDV: this.hasOption('countryDV')
          ? this.options.countryDV
          : 'US'
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
      let n = 'calories';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.calories.show : 1
      };
    },
    kilojoules () {
      let n = 'kilojoules';

      return {
        per100: this.per100(n),
        value: this.unitValue(n)
      };
    },
    totalFat () {
      let n = 'totalFat';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.totalFat.show : 1
      };
    },
    saturatedFat () {
      let n = 'saturatedFat';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.saturatedFat.show : 1
      };
    },
    transFat () {
      let n = 'transFat';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.transFat.show : 1
      };
    },
    cholesterol () {
      let n = 'cholesterol';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.cholesterol.show : 1
      };
    },
    sodium () {
      let n = 'sodium';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.sodium.show : 1
      };
    },
    salt () {
      let n = 'salt';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n)
      };
    },
    totalCarb () {
      let n = 'totalCarb';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.totalCarb.show : 1
      };
    },
    fiber () {
      let n = 'fiber';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.fiber.show : 1
      };
    },
    sugars () {
      let n = 'sugars';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.sugars.show : 1
      };
    },
    addedSugars () {
      let n = 'addedSugars';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.addedSugars.show : 0
      };
    },
    protein () {
      let n = 'protein';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.protein.show : 1
      };
    },
    vitaminA () {
      let n = 'vitaminA';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.vitaminA.show : 0
      };
    },
    vitaminC () {
      let n = 'vitaminC';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.vitaminC.show : 0
      };
    },
    vitaminD () {
      let n = 'vitaminD';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.vitaminD.show : 1
      };
    },
    calcium () {
      let n = 'calcium';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.calcium.show : 1
      };
    },
    iron () {
      let n = 'iron';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.iron.show : 1
      };
    },
    potassium () {
      let n = 'potassium';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.potassium.show : 1
      };
    },
    caffeine () {
      let n = 'caffeine';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.caffeine.show : 1
      };
    },
    servingWeight () {
      return this.unitValue('servingWeight');
    },
    ingredientStatement () {
      return this.value.hasOwnProperty('ingredientStatement') ? this.value.ingredientStatement : 'None';
    },
    text () {
      return this.hasOption('locale') ? this.options.locale : {};
    },
    zeroServingWeight () {
      return this.servingWeight <= 0;
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
    padding: 2px 0;
    clear: both;
    overflow: auto;
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
    min-height: 25px;
    &.read-only {
      margin-left: 0;
      width: 100%;
      min-height: 0;
      .text-serving-size {
        float: left;
      }
      .text-serving-item {
        float: right;
        max-width: 160px;
        text-align: right;
      }
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

  &-ingredient-statement,
  &-disclaimer {
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

  &.uk .nf-title {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding-top: 8px;
    padding-bottom: 6px;
  }

  &.uk .nf-modifier-field {
    width: 20px;
    padding: 3px;
    text-align: center;
    float: none;
    margin-top: 0;
    margin-right: 3px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 4px solid #000;
    tr th,
    tbody tr td {
      border-bottom: 1px solid #000;
      padding-top: 4px;
      padding-bottom: 4px;
    }
    tfoot tr td {
      padding-top: 4px;
      font-size: 90%;
    }
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
