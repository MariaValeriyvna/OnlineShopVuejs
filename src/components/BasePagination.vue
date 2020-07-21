<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        v-if="page !== 1"
        @click.prevent="pagenate(page-1)"
        aria-label="Предыдущая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current': pageNumber === page}"
        @click.prevent="pagenate(pageNumber)"
      >
        {{ pageNumber}}
      </a>
    </li>
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        v-if="page !== pages"
        @click.prevent="pagenate(page+1)"
        aria-label="Следующая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  model: {
    prop: 'page',
    event: 'pagenate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    pagenate(page) {
      this.$emit('pagenate', page);
    },
  },
};
</script>
