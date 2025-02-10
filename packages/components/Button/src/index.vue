<template>
    <button>{{ props.text }}</button>
</template>

<script setup lang="ts">

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

</script>

<style></style>