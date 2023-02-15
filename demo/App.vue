<template>
  <div class="demo">
    <VAutocomplete
      v-model="selectedUser"
      :items="filteredUserList"
      property="name"
      @input:search="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { VAutocomplete } from '../src/main'
import { ref } from 'vue'

const selectedUser = ref(null)

const usersList = ref([
  {
    id: 1,
    name: 'John'
  },
  {
    id: 2,
    name: 'Jack'
  },
  {
    id: 3,
    name: 'Alex'
  },
  {
    id: 4,
    name: 'Steve'
  },
])

const filteredUserList = ref([...usersList.value])

const onSearch = (searchValue: string) => {
  filteredUserList.value = usersList.value.filter(user => user.name.includes(searchValue))
}
</script>

<style lang="scss" scoped>
.demo {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
