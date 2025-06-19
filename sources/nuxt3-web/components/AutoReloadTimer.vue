<template>
  <p>Recargando en {{ secondsLeft }} segundos...</p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps<{ interval: number }>();
const emit = defineEmits<{ (e: 'reload'): void }>();

const secondsLeft = ref(props.interval);
let timer: any;

onMounted(() => {
  timer = setInterval(() => {
    if (secondsLeft.value <= 1) {
      emit('reload');
      secondsLeft.value = props.interval;
    } else {
      secondsLeft.value -= 1;
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
