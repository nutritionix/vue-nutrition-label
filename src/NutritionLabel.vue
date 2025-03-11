<template>
  <div itemtype="http://schema.org/NutritionInformation"
    v-if="isLoaded"
    class="nf"
    :class="layoutClass"
    :style="{ width: settings.width }">
    <!-- US -->
    <template v-if="setLayout('us')">
      <nfp-us :options="options" v-model="value" @getServingQuantity="setServing($event)"></nfp-us>
    </template>
    <!-- UK -->
    <template v-if="setLayout('uk')">
      <nfp-uk :options="options" v-model="value" @getServingQuantity="setServing($event)"></nfp-uk>
    </template>
    <!-- CA -->
    <template v-if="setLayout('ca')">
      <nfp-ca :options="options" v-model="value" @getServingQuantity="setServing($event)"></nfp-ca>
    </template>
  </div>
</template>
<script>
import NFPUS from '@/layout/US.vue';
import NFPUK from '@/layout/UK.vue';
import NFPCA from '@/layout/CA.vue';
export default {
  name: 'vue-nutrition-label',

  components: {
    'nfp-us': NFPUS,
    'nfp-uk': NFPUK,
    'nfp-ca': NFPCA
  },

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
      serving: this.value.serving
    };
  },

  methods: {
    hasOption (key) {
      return this.options.hasOwnProperty(key);
    },
    setLayout (country) {
      return this.settings.layout.toLowerCase() === country;
    },
    setServing (val) {
      this.serving = val;
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
        layout: this.hasOption('layout')
          ? this.options.layout
          : 'US'
      };
    },
    layoutClass () {
      return {
        us: this.setLayout('us'),
        uk: this.setLayout('uk'),
        ca: this.setLayout('ca')
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
.pull-left {
  float: left;
}
.no-border {
  border: none;
}
</style>
