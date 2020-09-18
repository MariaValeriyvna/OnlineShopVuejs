<template>
     <li class="catalog__item">
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
          <img :src="product.image" alt="product.title"/>
        </router-link>
        <h3 class="catalog__title">
          <a href="#">{{product.title}}</a>
        </h3>
        <span class="catalog__price">{{product.price | numberFormat}} руб.</span>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in colors" :key="color.id" :colors="colors">
            <label class="colors__label">
              <input class="colors__radio sr-only"
              type="radio" :value=color.title checked  />
              <span class="colors__value" :style="{background: color.code}"></span>
            </label>
          </li>
        </ul>
      </li>

</template>

<script>
import gotoPage from '@/helpers/gotopage';
import numberFormat from '@/helpers/numberformat';

export default {

  filters: {
    numberFormat,
  },
  computed: {
    colors() {
      return this.product.colors ? this.product.colors : [];
    },
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>
