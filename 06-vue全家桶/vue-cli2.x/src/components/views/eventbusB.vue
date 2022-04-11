<template>
  <div class="eventbusB">
    <ul>
      <li>eventbusB1</li>
      <li>eventbusB1</li>
      <li>eventbusB1</li>
      <li>eventbusB1</li>
      <li>eventbusB1</li>
      <li>eventbusB1</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'eventbusB',
    data() {
      return {};
    },
    mounted() {
      this.$EventBus.$on('eventbusA', (param1) => {
        console.log('eventbus on data：' + param1);
      });
    }
  };
</script>

<style scoped></style>
