<template>
  <div>
    <div class="nf-title" v-html="text.nutritionFacts || 'Nutrition'">
    </div>
    <table>
      <thead>
        <tr>
          <th>Typical Values</th>
          <th>Per 100{{setServingUnit}}</th>
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
              ({{ servingWeight }}{{setServingUnit}})
            </template>
          </th>
          <th>%*({{ servingWeight }}{{setServingUnit}})</th>
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
        <tr v-if="totalFat.show">
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
        <tr v-if="saturatedFat.show">
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
        <tr v-if="totalCarb.show">
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
        <tr v-if="sugars.show">
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
        <tr v-if="fiber.show">
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
        <tr v-if="protein.show">
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
  </div>
</template>
<script>
import { main } from '@/mixins/';
export default {
  mixins: [main]
};
</script>
<style lang='scss'>
.nf.uk {
  .nf-title {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding-top: 8px;
    padding-bottom: 6px;
  }

  .nf-modifier-field {
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
</style>
