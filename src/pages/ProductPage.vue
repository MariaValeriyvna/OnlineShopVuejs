<template>
  <main class="content container">
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
          <img width="570" :src="product.image" :alt="product.title" />
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
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="blue"
                      checked
                    />
                    <span class="colors__value" style="background-color: #73B6EA;"></span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="yellow"
                    />
                    <span class="colors__value" style="background-color: #FFBE15;"></span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="gray"
                    />
                    <span class="colors__value" style="background-color: #939393;"></span>
                  </label>
                </li>
              </ul>
            </fieldset>
            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus" />
                  </svg>
                </button>

                <input type="text" v-model.number="productAmount" />

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus" />
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit">В корзину</button>
            </div>
          </form>
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
import products from '@/data/products';
import categories from '@/data/categories';
import gotoPage from '@/helpers/gotopage';
import numberFormat from '@/helpers/numberformat';

export default {
  data() {
    return {
      productAmount: 1,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount },
      );
    },
  },
  computed: {
    product() {
      return products.find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return categories.find(
        (category) => category.id === this.product.categoryId,
      );
    },
  },
};
</script>
