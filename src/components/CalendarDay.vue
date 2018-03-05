<template>
  <div :class="classComputed" @click="captureClick">
    {{ day.format('D') }}
    <ul class="event-list">
      <li v-for="event in events">{{ event.description }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [ 'day' ],
  computed: {
    events() {
      return this.$store.state.events.filter(event => event.date.isSame(this.day, 'days'));
    },
    classComputed() {
      let today = this.$moment();
      return {
        day: true,
        today: this.day.isSame(today, 'day'),
        past: this.day.isBefore(today, 'day'),
        active: this.$store.state.eventFormDate.isSame(this.day, 'day') && this.$store.state.eventFormActive
      };
    }
  },
  methods: {
    captureClick(event) {
      this.$store.commit('eventFormDate', this.day);
      this.$store.commit('eventFormActive', true);
      this.$store.commit('eventFormPosition', { x: event.clientX, y: event.clientY });
    }
  }
}
</script>
