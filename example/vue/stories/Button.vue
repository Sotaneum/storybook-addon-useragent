<template>
  <button type="button" :class="classes" @click="onClick">
    alert window.navigator.userAgent
  </button>
</template>

<script lang="ts" setup>
import "./button.css";

const classes = "storybook-button";

const onClick = () => {
  alert(window.navigator.userAgent);
};
</script>
