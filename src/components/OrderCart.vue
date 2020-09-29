<template>
   <div>
           <ul class="cart__orders">
            <li  class="cart__order" v-for="cartProduct in cartProducts"
            :key="cartProduct.id">
              <h3>{{ cartProduct.product.title }}</h3>
              <b>{{ cartProduct.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ cartProduct.product.id }}</span>
              <b >{{ cartProduct.amount }} шт</b>
            </li>
          </ul>
            <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalAmount }}</b>
            товара на сумму
            <b>{{ totalPrice + 500 | numberFormat}}
              ₽</b>
            </p>
          </div>
   </div>
</template>

<script>

import numberFormat from '@/helpers/numberformat';
import { mapGetters } from 'vuex';

export default {
  filters: { numberFormat },
  computed: {
    ...mapGetters({ cartProducts: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalAmount: 'cartTotalamount' }),
  },
};
</script>
