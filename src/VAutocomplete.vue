<template>
  <div
    :id="id"
    ref="autocomplete"
    tabindex="0"
    class="autocomplete"
  >
    <input
      v-model="searchValue"
      class="autocomplete__input"
      @focus.prevent="onInputFocus"
      @blur.prevent="onInputBlur"
      @input="onInput"
    >
    <ul
      v-if="showList"
      class="autocomplete__items-list"
    >
      <li
        v-for="(item, itemIndex) in props.items"
        :key="itemIndex"
        class="autocomplete__item"
        :class="{'autocomplete__item--selected': selectedItemIndex === itemIndex}"
        @click="onItemClick(item)"
      >
        {{ getProperty(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getObjectValue, deepEqual } from './helpers'

export interface IAutocompleteProps {
  modelValue?: any | null
  placeholder?: string
  items?: Array<any>,
  property?: null | string | ((item: any) => string)
}


const props = withDefaults(defineProps<IAutocompleteProps>(), {
  modelValue: null,
  placeholder: '',
  items: (): Array<any> => [],
  property: null
})
const emit = defineEmits<{
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'input:search',value: string): void
  (e: 'update:modelValue', value: any): void
}>()

const id = Date.now().toString()

const autocomplete = ref(null)

const getProperty = (item: any) => {
  if (props.property === null) {
    return item
  }
  if (typeof props.property === 'string') {
    return getObjectValue(item, props.property)
  }
  if (typeof props.property === 'function') {
    return props.property(item)
  }
}

const searchValue = ref<string | null>(null)
const selectedItemIndex = ref<number | null>(null)

watch(() => props.modelValue, (value: any) => {
  if (value !== null && value !== undefined) {
    searchValue.value = getProperty(value)
  }
  selectedItemIndex.value = props.items.findIndex(item => deepEqual(item, value))
},  { immediate: true })

const showList = ref<boolean>(false)

const onInputFocus = () => {
  showList.value = true
  emit('focus')
}
const onInputBlur = (e: FocusEvent) => {
  const targetId = (e.relatedTarget as HTMLElement)?.id
  if (targetId === id) {
    return
  }
  showList.value = false
  emit('blur')
}

const onInput = ({ target }: Event) => {
  emit('input:search', (target as HTMLInputElement).value)
  emit('update:modelValue', null)
}

const onItemClick = (item: any) => {
  showList.value = false
  emit('input:search', getProperty(item))
  emit('update:modelValue', item)
}
</script>

<style scoped lang="scss">
$font-family: var(--font-family, sans-serif);
$font-size: var(--font-size, 18px);
$color: var(--color, #000);

$item-background: var(--item-background, #FFF);
$item-background-hover: var(--item-background-hover, #DEDEDE);
$item-background-selected: var(--item-background-selected, #ADD8E6);
$item-padding: var(--item-padding, 8px);
$item-border: var(--item-border, none);

$input-padding: var(--input-padding, 8px);
$input-border-color: var(--input-border-color, black);
$input-border-width: var(--input-border-width, 1px);
$input-border-radius: var(--input-border-radius, 0);

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: $font-family;
  font-size: $font-size;
  color: $color;
}

.autocomplete {
  position: relative;
  width: fit-content;

  &__input{
    padding: $input-padding;
    border-color: $input-border-color;
    border-width: $input-border-width;
    border-radius: $input-border-radius;

    &:focus {
      outline: none;
    }
  }

  &__items-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    list-style-type: none;
  }

  &__item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: $item-padding;
    cursor: pointer;
    background: $item-background;
    &:not(.autocomplete__item--selected):hover {
      background-color: #dedede;
    }

    &--selected {
      background-color: lightblue;
    }
  }
}
</style>
