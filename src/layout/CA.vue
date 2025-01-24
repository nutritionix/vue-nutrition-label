<template>
  <div>
    <div class="nf-header-wrap">
      <div class="nf-title">
        Nutrition Facts<br />
        Valeur Nutritive
      </div>
      <div class="nf-servings-wrap">
        <template v-if="servingPerContainer >= 1">
          <div>
            Serving Size {{ serving.value }} {{ servingUnitName }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
            /
            Portion {{ serving.value }} {{ servingUnitNameTranslation }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
          </div>
          <div>
            Serving Per Container {{ servingPerContainer }}
          </div>
          <div>
            Portions par contenant {{ servingPerContainer }}
          </div>
        </template>
        <template v-if="servingPerContainer < 1">
          <div>
            Per {{ serving.value }} {{ servingUnitName }}
            <template v-if="settings.showServingWeight">
              ({{ servingWeight }}{{setServingUnit}})
            </template>
          </div>
          <div>
            pour {{ serving.value }} {{ servingUnitNameTranslation }}
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
        <div>% Daily Value*</div>
        <div>% valeur quotidienne*</div>
      </div>
    </div>
    <div class="nf-no-line" v-if="totalFat.show">
      <span v-if="totalFat.showDv" class="nf-pr" aria-hidden="true">{{ totalFat.dv }} %</span>
      <span class="nf-highlight">Fat / Lipides</span>
      <span itemprop="fatContent">
        {{ totalFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="saturatedFat.show">
      <span v-if="saturatedFat.showDv" class="nf-pr" aria-hidden="true">{{ saturatedFat.dv }} %</span>
      <span>Saturated / saturés</span>
      <span itemprop="saturatedFatContent">
        {{ saturatedFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="transFat.show">
      <span>+ Trans / trans</span>
      <span itemprop="transFatContent">
        {{ transFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="polyunsaturatedFat.show">
      <span>Polyunsaturated / polyinsaturés</span>
      <span itemprop="unsaturatedFatContent">
        {{ polyunsaturatedFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-no-line nf-indent" v-if="monounsaturatedFat.show">
      <span>Monounsaturated / monoinsaturés</span>
      <span itemprop="unsaturatedFatContent">
        {{ monounsaturatedFat.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line" v-if="totalCarb.show">
      <div class="nf-no-line">
        <span class="nf-highlight">Carbohydrate / Glucides</span>
        <span itemprop="carbohydrateContent">
          {{ totalCarb.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-no-line nf-indent" v-if="fiber.show">
        <span v-if="fiber.showDv" class="nf-pr" aria-hidden="true">{{ fiber.dv }} %</span>
        <span>Fibre / Fibres</span>
        <span itemprop="fiberContent">
          {{ fiber.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-no-line nf-indent" v-if="sugars.show">
        <span class="nf-pr" aria-hidden="true">{{ sugars.dv }} %</span>
        <span>Sugars / Sucres</span>
        <span itemprop="sugarContent">
          {{ sugars.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
        </span>
      </div>
      <div class="nf-no-line nf-indent" v-if="sugarAlcohol.show">
        <span>Sugar Alcohols / Polyalcools</span>
        {{ sugarAlcohol.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </div>
    </div>
    <div class="nf-line" v-if="protein.show">
      <span class="nf-highlight">Protein / Protéines</span>
      <span itemprop="proteinContent">
        {{ protein.value }}<span aria-hidden="true"> g</span><span class="sr-only"> grams</span>
      </span>
    </div>
    <div class="nf-line" v-if="cholesterol.show">
      <span class="nf-highlight">Cholesterol / Cholestérol</span>
      <span itemprop="proteinContent">
        {{ cholesterol.value }}<span aria-hidden="true"> mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-line" v-if="sodium.show">
      <span v-if="sodium.showDv" class="nf-pr" aria-hidden="true">{{ sodium.dv }} %</span>
      <span class="nf-highlight">Sodium</span>
      <span itemprop="sodiumContent">
        {{ sodium.value }}<span aria-hidden="true"> mg</span><span class="sr-only"> milligrams</span>
      </span>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-line" v-if="potassium.show">
      <span>Potassium</span> {{ roundToSpecificDecimalPlace(potassium.value, 1) }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span v-if="potassium.showDv" class="nf-pr" aria-hidden="true">{{ potassium.dv }} %</span>
    </div>
    <div class="nf-line" v-if="calcium.show">
      <span>Calcium</span> {{ roundToSpecificDecimalPlace(calcium.value, 1) }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span v-if="calcium.showDv" class="nf-pr" aria-hidden="true">{{ calcium.dv }} %</span>
    </div>
    <div class="nf-line" v-if="iron.show">
      <span>Iron / Fer</span> {{ roundToSpecificDecimalPlace(iron.value, 1) }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span v-if="iron.showDv" class="nf-pr" aria-hidden="true">{{ iron.dv }} %</span>
    </div>
    <div class="nf-line" v-if="vitaminA.show">
      <span>Vitamin A / Vitamine A</span> {{ vitaminA.value }}<span aria-hidden="true"> IU</span>
      <span class="sr-only"> International Unit</span>
      <span class="nf-pr" aria-hidden="true">{{ vitaminA.dv }} %</span>
    </div>
    <div class="nf-line" v-if="vitaminC.show">
      <span>Vitamin C / Vitamine C</span> {{ vitaminC.value }}<span aria-hidden="true"> mg</span>
      <span class="sr-only"> milligrams</span>
      <span class="nf-pr" aria-hidden="true">{{ vitaminC.dv }} %</span>
    </div>
    <div class="nf-line" v-if="vitaminD.show">
      <spaN>Vitamin D / Vitamine D</span> {{ roundToSpecificDecimalPlace(vitaminD.value, 1) }}<span aria-hidden="true"> mcg</span>
      <span class="sr-only"> micrograms</span>
      <span v-if="vitaminD.showDv" class="nf-pr" aria-hidden="true">{{ vitaminD.dv }} %</span>
    </div>
    <div class="nf-bar1"></div>
    <div class="nf-footer">
      <div>
        * 5% or less is <strong>a little</strong>, 15% or more is
        <strong>a lot</strong>
      </div>
      <div>
        * 5% ou mmoins c'est <strong>peu</strong>, 15% ou plus c'est
        <strong>beaucoup</strong>
      </div>
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
  font-family: "Helvetica";
  font-style: normal;
  font-weight: normal;
  src: local("Helvetica"),
    url("../assets/fonts/helvetica/Helvetica.woff") format("woff");
}
@font-face {
  font-family: "Helvetica Bold";
  font-style: normal;
  font-weight: normal;
  src: local("Helvetica Bold"),
    url("../assets/fonts/helvetica/Helvetica-Bold.woff") format("woff");
}
.nf.ca {
  font-size: 13px;
  .nf-header-wrap {
    border-bottom: 2px solid #000;
    margin-bottom: 3px;
  }
  .nf-title {
    font-family: "Helvetica Bold";
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
    font-family: "Helvetica Bold";
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
