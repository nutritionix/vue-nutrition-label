export const main = {
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
        totalFat: {
          us: 65,
          us2018: 78,
          uk: 70,
          ca: 65,
          ca2018: 75,
          ca2022: 75
        },
        saturatedFat: 20,
        cholesterol: 300,
        sodium: {
          us: 2400,
          us2018: 2300,
          ca: 2400,
          ca2018: 2300,
          ca2022: 2300
        },
        totalCarb: {
          us: 300,
          us2018: 275,
          ca: 300,
          uk: 260
        },
        fiber: {
          us: 25,
          us2018: 28,
          ca: 25,
          ca2018: 28,
          ca2022: 28
        },
        addedSugars: 50,
        protein: 50,
        vitaminD: {
          us: 20,
          us2018: 20,
          ca: 5,
          ca2018: 20,
          ca2022: 20
        },
        calcium: {
          us: 1300,
          us2018: 1300,
          ca: 1100,
          ca2018: 1300,
          ca2022: 1300
        },
        iron: {
          us: 18,
          us2018: 18,
          ca: 14,
          ca2018: 18,
          ca2022: 18
        },
        potassium: {
          us: 3500,
          us2018: 4700,
          ca: 3500,
          ca2018: 3400,
          ca2022: 3400
        },
        vitaminA: 5000,
        vitaminC: 60,
        kilojoules: 8400,
        calories: 2000,
        sugars: {
          us: 100,
          uk: 90,
          ca2018: 100,
          ca2022: 100
        },
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
            if (this.isUK) {
              return this.ukRound(nutrient, this.multiplier(value));
            }

            if (this.isCanada) {
              if (nutrient === 'totalFat' || nutrient === 'transFat' || nutrient === 'saturatedFat') {
                return this.roundFatsForCanada(this.multiplier(value));
              }

              return this.roundUnsaturatedFatsForCanada(this.multiplier(value));
            }

            return this.roundFats(this.multiplier(value));

          case 'sodium':
            if (this.isCanada) {
              return this.roundSodiumForCanada(this.multiplier(value));
            }

            return this.roundSodium(this.multiplier(value));

          case 'salt':
            value = this.value.nutrition['sodium'] * 0.0025;
            return this.ukRound(nutrient, this.multiplier(value));

          case 'cholesterol':
            return this.roundCholesterol(this.multiplier(value));

          case 'potassium':
          case 'calcium':
            if (nutrient === 'calcium' && this.value.nutrition.hasOwnProperty('calciumMgFor2018')) {
              value = this.value.nutrition['calciumMgFor2018'];
            };

            if (this.isCanada) {
              return this.roundCalciumPotassiumForCanada(this.multiplier(value));
            }

            return this.roundCalciumPotassium(this.multiplier(value));

          case 'caffeine':
            return this.roundToNearestNum(this.multiplier(value), 1);

          // Vitamins and Minerals
          case 'vitaminA':
          case 'vitaminC':
            return this.roundVitaminsMinerals(this.multiplier(value));

          case 'vitaminD':
          case 'iron':
            if (nutrient === 'iron' && this.value.nutrition.hasOwnProperty('ironMgFor2018')) {
              value = this.value.nutrition['ironMgFor2018'];
            };

            if (this.isCanada) {
              if (nutrient === 'vitaminD') {
                return this.roundVitaminDForCanada(this.multiplier(value));
              }

              if (nutrient === 'iron') {
                return this.roundIronForCanada(this.multiplier(value));
              }
            }

            return this.roundVitaminDIron(this.multiplier(value));

          // Essentials
          case 'totalCarb':
          case 'fiber':
          case 'sugars':
          case 'addedSugars':
          case 'protein':
            if (this.isUK) {
              return this.ukRound(nutrient, this.multiplier(value));
            }

            if (this.isCanada) {
              if (nutrient === 'sugars') {
                return this.roundEssentialsForCanada(this.multiplier(value));
              }
            }

            return this.roundEssentials(this.multiplier(value));

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
      let rawValue;
      if (this.value.hasOwnProperty('nutrition') && this.value.nutrition.hasOwnProperty(nutrient)) {
        rawValue = this.value.nutrition[nutrient];
      };

      let countryDV = this.settings.countryDV.toLowerCase();
      let rdi = 0;

      if ((typeof this.rdi[nutrient]) === 'object') {
        rdi = !this.rdi[nutrient][countryDV]
          ? this.rdi[nutrient]['us']
          : this.rdi[nutrient][countryDV];
      } else {
        rdi = this.rdi[nutrient];
      }

      if (nutrient === 'calcium' && this.value.nutrition.hasOwnProperty('calciumMgFor2018')) {
        rawValue = this.value.nutrition['calciumMgFor2018'];
      };

      if (nutrient === 'iron' && this.value.nutrition.hasOwnProperty('ironMgFor2018')) {
        rawValue = this.value.nutrition['ironMgFor2018'];
      };

      let dv = rawValue / rdi * 100;

      switch (nutrient) {
        case 'cholesterol':
          if (this.unitValue(nutrient) === '< 5') {
            dv = 0;
          } else {
            dv = this.roundToSpecificDecimalPlace(this.unitValue(nutrient) / rdi * 100, 0);
          }

          break;

        case 'sodium':
          dv = this.roundToSpecificDecimalPlace(dv, 0);
          break;

        case 'totalCarb':
        case 'fiber':
        case 'sugars':
        case 'addedSugars':
        case 'protein':
          if (this.unitValue(nutrient) === '< 1') {
            dv = 0;
          } else {
            dv = this.roundToSpecificDecimalPlace(this.unitValue(nutrient) / rdi * 100, 0);
          }

          break;

        case 'salt':
          dv = this.roundToSpecificDecimalPlace(this.unitValue('sodium') * 0.0025 / rdi * 100, 0);
          break;

        case 'vitaminA':
        case 'vitaminC':
        case 'vitaminD':
        case 'potassium':
        case 'calcium':
        case 'iron':
          dv = this.multiplier(rawValue) / rdi * 100;

          // <1% express as 0
          if (dv < 1) {
            if (this.isCanada) {
              if ((nutrient === 'iron' && dv >= 0.2777) || (nutrient === 'calcium' && dv >= 0.3846)) {
                dv = this.roundToNearestNum(dv, 1);
              }
            } else {
              dv = 0;
            }
          }

          // =1%-2% express as 2%
          if (dv >= 1 && dv <= 2) {
            dv = 2;
          }

          // <=10% round to nearest 2%
          if (dv <= 10) {
            dv = this.roundToNearestNum(dv, 2);
          }

          // >10%-50% round to nearest 5%
          if (dv > 10 && dv <= 50) {
            dv = this.roundToNearestNum(dv, 5);
          }

          // >50% round to nearest 10%
          if (dv > 50) {
            dv = this.roundToNearestNum(dv, 10);
          }

          break;

        default:
          dv = this.roundToSpecificDecimalPlace(this.unitValue(nutrient) / rdi * 100, 0);
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
        if (this.isCanada) {
          return this.roundToNearestNum(value, 1);
        }

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

    // Fats - Canada
    roundFatsForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 0);
      }

      // < .5 g - express to nearest .1g increment
      if (value < 0.5) {
        return this.roundToSpecificDecimalPlace(this.roundToNearestNum(value, 0.1), 1);
      }

      // <= 5 g - express to nearest .5g increment
      if (value <= 5) {
        return this.roundToNearestNum(value, 0.5);
      }

      // > 5 g - express to nearest 1g increment
      return this.roundToNearestNum(value, 1);
    },

    // Unsaturated Fats - Canada
    roundUnsaturatedFatsForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 0);
      }

      // < 1 g - express to nearest .1g increment
      if (value < 1) {
        return this.roundToSpecificDecimalPlace(this.roundToNearestNum(value, 0.1), 1);
      }

      // <= 5 g - express to nearest .5g increment
      if (value <= 5) {
        return this.roundToNearestNum(value, 0.5);
      }

      // > 5 g - express to nearest 1g increment
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

    roundSodiumForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 0);
      }

      // < 5 g - express to nearest 1g increment
      if (value < 5) {
        return this.roundToNearestNum(value, 1);
      }

      // 5 - 140 mg - express to nearest 5mg increment
      if (value <= 140) {
        return this.roundToNearestNum(value, 5);
      }

      // > 140 mg - express to nearest 10g increment
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
        if (this.isCanada) {
          return this.roundToNearestNum(value, 1);
        } else {
          // < 1 g - express as "Contains less than 1g" or "less than 1g"
          return '< 1';
        }
      }
      // > 1 mg - express to nearest 1 g increment
      return this.roundToNearestNum(value, 1);
    },

    // Vitaminins and Minerals
    roundVitaminsMinerals (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 1);
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

    // 2018 Rounding rule for Vitamin D and Iron
    roundVitaminDIron (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 1);
      }

      // round to the nearest 0.1 increment
      return this.roundToNearestNum(value, 0.1);
    },

    // Vitamin D - Canada
    roundVitaminDForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 1);
      }

      if (value < 0.1) {
        return 0;
      }

      // < 1 mcg - express to nearest .2mcg increment
      if (value < 1) {
        return this.roundToNearestNum(value, 0.2);
      }

      // < 5 mcg - express to nearest .5mcg increment
      if (value < 5) {
        return this.roundToNearestNum(value, 0.5);
      }

      // >= 5 mcg - express to nearest 1mcg increment
      return this.roundToNearestNum(value, 1);
    },

    // Iron - Canada
    roundIronForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 1);
      }

      if (value < 0.05) {
        return 0;
      }

      // < .5 mcg - express to nearest .1mcg increment
      if (value < 0.5) {
        return this.roundToNearestNum(value, 0.1);
      }

      // < 2.5 mcg - express to nearest .25mcg increment
      if (value < 2.5) {
        return this.roundToNearestNum(value, 0.25);
      }

      // >= 2.5 mcg - express to nearest .5mcg increment
      return this.roundToNearestNum(value, 0.5);
    },

    // 2018 Rounding rule for Calcium and Potassium
    roundCalciumPotassium (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 1);
      }

      // round to the nearest 10 increment
      return this.roundToNearestNum(value, 10);
    },

    // Calcium and Potassium - Canada
    roundCalciumPotassiumForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 1);
      }

      if (value < 5) {
        return 0;
      }

      // < 50 g - express to nearest 10mg increment
      if (value < 50) {
        return this.roundToNearestNum(value, 10);
      }

      // < 250 g - express to nearest 25mg increment
      if (value < 250) {
        return this.roundToNearestNum(value, 25);
      }

      // >= 250 g - express to nearest 50mg increment
      return this.roundToNearestNum(value, 50);
    },

    // Carb, Protein, Fiber, Sugar - Canada
    roundEssentialsForCanada (value) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 0);
      }

      // < .5 g - express to nearest .5g increment
      if (value < 0.5) {
        return 0;
      }

      // >= 5 g - express to nearest 1g increment
      return this.roundToSpecificDecimalPlace(value, 1);
    },

    roundToNearestNum (value, nearest) {
      if (!this.settings.useFdaRounding) {
        return this.roundToSpecificDecimalPlace(value, 0);
      }

      return nearest < 0 ? Math.round(value * nearest) / nearest : Math.round(value / nearest) * nearest;
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
          : 'US',
        staticServingAndUnitText: this.hasOption('staticServingAndUnitText')
          ? this.options.staticServingAndUnitText
          : ''
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
    servingUnitNameTranslation () {
      return this.value.hasOwnProperty('servingUnitNameTranslation') && this.value.servingUnitNameTranslation !== '' ? this.value.servingUnitNameTranslation : '';
    },
    useGramAndNotMlOnTheUkLabel () {
      return this.value.hasOwnProperty('useGramAndNotMlOnTheUkLabel') ? this.value.useGramAndNotMlOnTheUkLabel : 0;
    },
    useMlOnUkLabel () {
      return this.value.hasOwnProperty('useMlOnUkLabel') ? this.value.useMlOnUkLabel : 0;
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
        show: this.hasOption(n) ? this.options.totalFat.show : 1,
        showDv: this.hasOption(n) ? this.options.totalFat.dv : 1
      };
    },
    saturatedFat () {
      let n = 'saturatedFat';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.saturatedFat.show : 1,
        showDv: this.hasOption(n) ? this.options.saturatedFat.dv : 1
      };
    },
    transFat () {
      let n = 'transFat';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.transFat.show : 1
      };
    },
    polyunsaturatedFat () {
      let n = 'polyunsaturatedFat';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.polyunsaturatedFat.show : 1
      };
    },
    monounsaturatedFat () {
      let n = 'monounsaturatedFat';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.monounsaturatedFat.show : 1
      };
    },
    cholesterol () {
      let n = 'cholesterol';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.cholesterol.show : 1,
        showDv: this.hasOption(n) ? this.options.cholesterol.dv : 1
      };
    },
    sodium () {
      let n = 'sodium';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.sodium.show : 1,
        showDv: this.hasOption(n) ? this.options.sodium.dv : 1
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
        show: this.hasOption(n) ? this.options.totalCarb.show : 1,
        showDv: this.hasOption(n) ? this.options.totalCarb.dv : 1
      };
    },
    fiber () {
      let n = 'fiber';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.fiber.show : 1,
        showDv: this.hasOption(n) ? this.options.fiber.dv : 1
      };
    },
    sugars () {
      let n = 'sugars';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.sugars.show : 1,
        showDv: this.hasOption(n) ? this.options.sugars.dv : 0
      };
    },
    addedSugars () {
      let n = 'addedSugars';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.addedSugars.show : 0,
        showDv: this.hasOption(n) ? this.options.addedSugars.dv : 1
      };
    },
    protein () {
      let n = 'protein';

      return {
        per100: this.per100(n),
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.protein.show : 1,
        showDv: this.hasOption(n) ? this.options.protein.dv : 1
      };
    },
    vitaminA () {
      let n = 'vitaminA';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.vitaminA.show : 0,
        showDv: this.hasOption(n) ? this.options.vitaminA.dv : 1
      };
    },
    vitaminC () {
      let n = 'vitaminC';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.vitaminC.show : 0,
        showDv: this.hasOption(n) ? this.options.vitaminC.dv : 1
      };
    },
    vitaminD () {
      let n = 'vitaminD';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.vitaminD.show : 1,
        showDv: this.hasOption(n) ? this.options.vitaminD.dv : 1
      };
    },
    calcium () {
      let n = 'calcium';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.calcium.show : 1,
        showDv: this.hasOption(n) ? this.options.calcium.dv : 1
      };
    },
    iron () {
      let n = 'iron';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.iron.show : 1,
        showDv: this.hasOption(n) ? this.options.iron.dv : 1
      };
    },
    potassium () {
      let n = 'potassium';

      return {
        value: this.unitValue(n),
        dv: this.percentDailyValue(n),
        show: this.hasOption(n) ? this.options.potassium.show : 1,
        showDv: this.hasOption(n) ? this.options.potassium.dv : 1
      };
    },
    caffeine () {
      let n = 'caffeine';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.caffeine.show : 1
      };
    },
    sugarAlcohol () {
      let n = 'sugarAlcohol';

      return {
        value: this.unitValue(n),
        show: this.hasOption(n) ? this.options.sugarAlcohol.show : 1
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
    },
    setServingUnit () {
      return this.useMlOnUkLabel ? 'ml' : 'g';
    },
    isUK () {
      return this.settings.layout.toLowerCase() === 'uk';
    },
    isCanada () {
      return this.settings.layout.toLowerCase() === 'ca';
    }
  },

  updated () {
    this.$emit('getServing', this.serving);
  }
};
