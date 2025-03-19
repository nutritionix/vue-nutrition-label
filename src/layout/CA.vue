<template>
  <div>
    <div class="nf-header-wrap">
      <div class="nf-title" v-html="text.nutritionFacts || 'Nutrition Facts <br /> Valeur Nutritive'">
      </div>
      <div class="nf-servings-wrap">
        <template v-if="servingPerContainer >= 1">
          <div>
            {{ text.servingSize || 'Serving Size' }} {{ serving.value }} {{ servingUnitName }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
            /
            {{ text.servingSizeSecondaryLanguage || 'Portion' }} {{ serving.value }} {{ servingUnitNameTranslation }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
          </div>
          <div>
            {{ text.servingsPerContainer || 'Serving Per Container' }} {{ servingPerContainer }}
          </div>
          <div>
            {{ text.servingsPerContainerSecondaryLanguage || 'Portions par contenant' }} {{ servingPerContainer }}
          </div>
        </template>
        <template v-if="servingPerContainer < 1">
          <div>
            {{ text.servingSize || 'Per' }} {{ serving.value }} {{ servingUnitName }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
          </div>
          <div>
            {{ text.servingsPerContainerSecondaryLanguage || 'Pour' }} {{ serving.value }} {{ servingUnitNameTranslation }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="clear">
      <div class="nf-highlight nf-calories" v-if="calories.show">
        <span v-html="text.calories || 'Calories'"></span>
        <span itemprop="calories">{{ calories.value }}</span>
      </div>
      <div class="nf-highlight nf-percent-dv nf-text-right">
        <div>% <span v-html="text.dailyValues || 'Daily Value* <br>% valeur quotidienne'"></span>*</div>
      </div>
    </div>
    <div class="nf-no-line" v-if="totalFat.show">
      <span v-if="totalFat.showDv" class="nf-pr" aria-hidden="true">{{ totalFat.dv }} %</span>
      <span class="nf-highlight" v-html="text.totalFat || 'Fat / Lipides'"></span>
      <span itemprop="fatContent">
        {{ totalFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="saturatedFat.show">
      <span v-if="saturatedFat.showDv" class="nf-pr" aria-hidden="true">{{ saturatedFat.dv }} %</span>
      <span v-html="text.satFat || 'Satured Fat / saturés'"></span>
      <span itemprop="saturatedFatContent">
        {{ saturatedFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="transFat.show">
      <span v-html="text.transFat || '+ Trans / trans'"></span>
      <span itemprop="transFatContent">
        {{ transFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="polyunsaturatedFat.show">
      <span v-html="text.polyFat || 'Polyunsaturated / polyinsaturés'"></span>
      <span itemprop="unsaturatedFatContent">
        {{ polyunsaturatedFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="monounsaturatedFat.show">
      <span v-html="text.monoFat || 'Monounsaturated / monoinsaturés'"></span>
      <span itemprop="unsaturatedFatContent">
        {{ monounsaturatedFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line" v-if="totalCarb.show">
      <div class="nf-no-line">
        <span class="nf-highlight" v-html="text.totalCarb || 'Carbohydrate / Glucides'"></span>
        <span itemprop="carbohydrateContent">
          {{ totalCarb.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-no-line nf-indent" v-if="fiber.show">
        <span v-if="fiber.showDv" class="nf-pr" aria-hidden="true">{{ fiber.dv }} %</span>
        <span v-html="text.fiber || 'Fibre / Fibres'">Fibre / Fibres</span>
        <span itemprop="fiberContent">
          {{ fiber.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-no-line nf-indent" v-if="sugars.show">
        <span class="nf-pr" aria-hidden="true">{{ sugars.dv }} %</span>
        <span v-html="text.sugars || 'Sugars / Sucres'"></span>
        <span itemprop="sugarContent">
          {{ sugars.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-no-line nf-indent" v-if="sugarAlcohol.show">
        <span v-html="text.sugarAlcohol || 'Sugar Alcohols / Polyalcools'"></span>
        {{ sugarAlcohol.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </div>
    </div>
    <div class="nf-line" v-if="protein.show">
      <span class="nf-highlight" v-html="text.protein || 'Protein / Protéines'"></span>
      <span itemprop="proteinContent">
        {{ protein.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line" v-if="cholesterol.show">
      <span class="nf-highlight" v-html="text.cholesterol || 'Cholesterol / Cholestérol'"></span>
      <span itemprop="cholesterolContent">
        {{ cholesterol.value }}<span aria-hidden="true"> mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line" v-if="sodium.show">
      <span v-if="sodium.showDv" class="nf-pr" aria-hidden="true">{{ sodium.dv }} %</span>
      <span class="nf-highlight" v-html="text.sodium || 'Sodium'">Sodium</span>
      <span itemprop="sodiumContent">
        {{ sodium.value }}<span aria-hidden="true"> mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-line" v-if="potassium.show">
      <span v-html="text.potassium || 'Potassium'"></span> {{ roundToSpecificDecimalPlace(potassium.value, 1) }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span v-if="potassium.showDv" class="nf-pr" aria-hidden="true">{{ potassium.dv }} %</span>
    </div>
    <div class="nf-line" v-if="calcium.show">
      <span v-html="text.calcium || 'Calcium'">m</span> {{ roundToSpecificDecimalPlace(calcium.value, 1) }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span v-if="calcium.showDv" class="nf-pr" aria-hidden="true">{{ calcium.dv }} %</span>
    </div>
    <div class="nf-line" v-if="iron.show">
      <span v-html="text.iron || 'Iron / Fer'"></span> {{ roundToSpecificDecimalPlace(iron.value, 1) }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span v-if="iron.showDv" class="nf-pr" aria-hidden="true">{{ iron.dv }} %</span>
    </div>
    <div class="nf-line" v-if="vitaminD.show">
      <span v-html="text.vitaminD || 'Vitamin D / Vitamine D'"></span> {{ roundToSpecificDecimalPlace(vitaminD.value, 1) }}<span aria-hidden="true"> mcg</span>
      <span class="sr-only"> micrograms</span>
      <span v-if="vitaminD.showDv" class="nf-pr" aria-hidden="true">{{ vitaminD.dv }} %</span>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-footer">
      <div v-html="text.textDailyValueFootnote || ''"></div>
      <div>
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
<style lang='scss'>
@font-face {
    font-family: 'Helvetica';
    src: url('~@/assets/fonts/helvetica/Helvetica.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica-Bold';
    src: url('~@/assets/fonts/helvetica/Helvetica-Bold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

.nf.ca {
  font-family: 'Helvetica';
  font-size: 13px;
  line-height: 15px;
  .nf-header-wrap {
    border-bottom: 2px solid #000;
    margin-bottom: 3px;
  }
  .nf-title {
    font-family: 'Helvetica-Bold';
    font-size: 19px;
    margin: 0;
  }
  .nf-servings-wrap {
    font-size: 14px;
    line-height: 14px;
    padding-bottom: 2px;
  }
  .nf-indent {
    padding-left: 8px;
  }
  .nf-indent2 {
    margin-left: 16px;
  }
  .nf-highlight {
    font-family: 'Helvetica-Bold';
    font-size: 13px;
  }
  .nf-calories {
    font-size: 14px;
    border-bottom: 5px solid #000;
    padding-bottom: 2px;
    margin-bottom: 3px;
    float: left;
  }
  .nf-percent-dv {
    float: right;
    font-size: 9px;
    line-height: 9px;
  }
  .nf-no-line {
    padding-bottom: 2px;
  }
  sub {
    line-height: 1px;
  }
  .nf-footer {
    padding-top: 3px;
    font-size: 10px;
    line-height: 11px;
    margin-bottom: -2px;
  }
  .nf-bar1 + .nf-line {
    border: none;
  }
}
</style>
