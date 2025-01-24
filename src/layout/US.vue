<template>
  <div>
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
            <span class="text-serving-item" v-if="!settings.multipleItems && settings.staticServingAndUnitText === ''" v-html="value.serving + ' ' + itemName">
            </span>
            <span class="text-serving-item" v-if="settings.staticServingAndUnitText !== '' && !settings.multipleItems" v-html="settings.staticServingAndUnitText">
            </span>
            <span class="nf-pr" v-if="settings.multipleItems" v-html="text.multipleItems || 'Multiple items'">
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
      <span v-if="totalFat.showDv" class="nf-highlight nf-pr" aria-hidden="true">{{ totalFat.dv }}%</span>
      <span class="nf-highlight" v-html="text.totalFat || 'Total Fat'"></span>
      <span itemprop="fatContent">
        {{ totalFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
    </span>
    </div>
    <div class="nf-line nf-indent" v-if="saturatedFat.show">
      <span v-if="saturatedFat.showDv" class="nf-highlight nf-pr" aria-hidden="true">{{ saturatedFat.dv }}%</span>
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
    <div class="nf-line nf-indent" v-if="polyunsaturatedFat.show">
      <span v-html="text.polyFat || 'Polyunsaturated Fat'"></span>
      <span itemprop="unsaturatedFatContent">
        {{ polyunsaturatedFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent" v-if="monounsaturatedFat.show">
      <span v-html="text.monoFat || 'Monounsaturated Fat'"></span>
      <span itemprop="unsaturatedFatContent">
        {{ monounsaturatedFat.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line" v-if="cholesterol.show">
      <span v-if="cholesterol.showDv" class="nf-highlight nf-pr" aria-hidden="true">{{ cholesterol.dv }}%</span>
      <span class="nf-highlight" v-html="text.cholesterol || 'Cholesterol'"></span>
      <span itemprop="cholesterolContent">
        {{ cholesterol.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line" v-if="sodium.show">
      <span v-if="sodium.showDv" class="nf-highlight nf-pr" aria-hidden="true">{{ sodium.dv }}%</span>
      <span class="nf-highlight" v-html="text.sodium || 'Sodium'"></span>
      <span itemprop="sodiumContent">
        {{ sodium.value }}<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line" v-if="totalCarb.show">
      <span class="nf-highlight nf-pr" aria-hidden="true" v-if="['us', 'us2018'].indexOf(settings.countryDV.toLowerCase()) > 0 && totalCarb.showDv">{{ totalCarb.dv }}%</span>
      <span class="nf-highlight" v-html="text.totalCarb || 'Total Carbohydrates'"></span>
      <span itemprop="carbohydrateContent">
        {{ totalCarb.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent" v-if="fiber.show">
      <span v-if="fiber.showDv" class="nf-highlight nf-pr" aria-hidden="true">{{ fiber.dv }}%</span>
      <span v-html="text.fiber || 'Dietary Fiber'"></span>
      <span itemprop="fiberContent">
        {{ fiber.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent" v-if="sugars.show">
      <span class="nf-highlight nf-pr" aria-hidden="true" v-if="['us', 'us2018'].indexOf(settings.countryDV.toLowerCase()) < 0">{{ sugars.dv }}%</span>
      <span v-html="text.sugars || 'Sugars'"></span>
      <span itemprop="sugarContent">
        {{ sugars.value }}<span aria-hidden="true">g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line nf-indent2" v-if="addedSugars.show">
      <span v-if="addedSugars.showDv" class="nf-highlight nf-pr" aria-hidden="true">{{ addedSugars.dv }}%</span>
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
          <span v-html="text.vitaminD || 'Vitamin D'"></span> {{ roundToSpecificDecimalPlace(vitaminD.value, 1) }}<span aria-hidden="true">mcg</span>
          <span class="sr-only"> micrograms</span>
          <span v-if="vitaminD.showDv" class="nf-pr" aria-hidden="true">{{ vitaminD.dv }}%</span>
        </div>
        <div class="nf-vitamin-column" v-if="calcium.show">
          <span v-html="text.calcium || 'Calcium'"></span> {{ roundToSpecificDecimalPlace(calcium.value, 1) }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span v-if="calcium.showDv" class="nf-pr" aria-hidden="true">{{ calcium.dv }}%</span>
        </div>
        <div class="nf-vitamin-column" v-if="iron.show">
          <span v-html="text.iron || 'Iron'"></span> {{ roundToSpecificDecimalPlace(iron.value, 1) }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span v-if="iron.showDv" class="nf-pr" aria-hidden="true">{{ iron.dv }}%</span>
        </div>
        <div class="nf-vitamin-column" v-if="potassium.show">
          <span v-html="text.potassium || 'Potassium'"></span> {{ roundToSpecificDecimalPlace(potassium.value, 1) }}<span aria-hidden="true">mg</span>
          <span class="sr-only"> milligrams</span>
          <span v-if="potassium.showDv" class="nf-pr" aria-hidden="true">{{ potassium.dv }}%</span>
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
  </div>
</template>
<script>
import { main } from '@/mixins/';
export default {
  mixins: [main]
};
</script>
