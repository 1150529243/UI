<template>
    <button>{{ props.text }}</button>
</template>

<script setup lang="ts">
import {defineOptions} from 'vue'
const props = defineProps({
    type: {
        type: String,
        default: 'default'
    },
    text: {
        type: String,
        default: '按钮'
    }
})

// vue3.4 新增的编译宏
defineOptions({
    name:'ludashuai-Button'
})

</script>

<style></style>