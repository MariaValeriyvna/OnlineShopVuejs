<template>
  <main class="content container" v-if="productLoading">
    <Preloader style= "top: 10%; left: 50%;" />Загрузка товара...</main>
  <main class="content container" v-else-if="!productData">Не удалось загрузить товар</main>
  <main class="content container" v-else>
    <Preloader  v-show="productAddSending" style= "top: 0; right: -1%" />
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link"
          :to="{name: 'main'}">{{category.title}}</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">{{product.title}}</a>
        </li>
      </ul>
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" :src="image" :alt="product.title" />
        </div>
      </div>
      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">{{product.title}}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">{{product.price | numberFormat}} ₽</b>
            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in colors" :key="color.id" :colors="colors">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      :value=color.title
                      checked
                    />
                    <span class="colors__value" :style="{background: color.code}"></span>
                  </label>
                </li>
              </ul>
            </fieldset>
            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                 @click.prevent="--productAmount" :disabled="productAmount=== 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus" />
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount" />

                <button type="button" aria-label="Добавить один товар"
                @click.prevent="++productAmount">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus" />
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit"
              :disabled="productAddSending">В корзину
              </button>

            </div>
          </form>
          <Preloader v-show="productAddSending" style= "top: 50%; left: 45%;" />
          <div></div>
          <div v-show="productAdded"
          style="font-size: 24px; color: #9eff00 ; padding-top: 20px">
            Товар добавлен в корзину</div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">Описание</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">Характеристики</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">Гарантия</a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">Оплата и доставка</a>
          </li>
        </ul>
        <div class="item__content">
            {{product.description}}
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import products from '@/data/products';
// import categories from '@/data/categories';

import { mapActions } from 'vuex';
import gotoPage from '@/helpers/gotopage';
import numberFormat from '@/helpers/numberformat';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Preloader from '../components/Preloader.vue';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  components: { Preloader },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
    colors() {
      return this.productData.colors;
    },
    image() {
      return this.productData.image.file.url;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => { this.productData = response.data; })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 1000);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
