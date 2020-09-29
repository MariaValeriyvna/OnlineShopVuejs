<template>
      <BaseFormField :title ="title" :error='error'>
             <input class="form__input"
              v-model="dataValue"
              :type="type"
              :placeholder="placeholder">
      </BaseFormField>
</template>

<script>
import formFieldMixin from '../mixin/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
