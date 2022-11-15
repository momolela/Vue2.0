<template>
  <div class="eventbusA" @click="eventbusfire">
    <router-link to="/eventbusA/eventbusB">eventbusB</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'eventbusA',
    data() {
      return {};
    },
    methods: {
      eventbusfire() {
        this.$EventBus.$emit('eventbusA', 'sunzj');
      }
    }
  };
</script>

<style scoped></style>
