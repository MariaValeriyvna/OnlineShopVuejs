<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{$store.state.cartProducts.length}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products"
            :key="item.productId"
            :item="item"
            @deleteFromCart=deleteFromCart(item.productId) />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }}</span>
          </p>

          <router-link class="cart__button button button--primery"
          tag="button"
          :to="{name: 'order'}"
          type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberformat';

export default {
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
    deleteFromCart(productId) {
      this.deleteCartProduct({ productId });
    },
  },
};
</script>
