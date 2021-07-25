<template>
  <li  @dragstart="startDrag($event)">
    {{ title }}
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    title: String,
    id: Number,
  },
  methods: {
    startDrag(evt: DragEvent) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('cardID', this.id);
    },
  },
});
</script>

<style lang="scss" scoped>
$gap: 10px;
$card-border-radius: 3px;

li {
  background-color: #fff;
  padding: $gap;

  &:not(:last-child) {
    margin-bottom: $gap;
  }

  border-radius: $card-border-radius;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
