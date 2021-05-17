<template>
  <div class="tip">
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'Tip'
}
</script>

<style scoped>
.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
}
.tip p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
}
</style>
