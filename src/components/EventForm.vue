<template>
  <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
    <h4>Add an event</h4>
    <p>{{ date.format('dddd, MMM Do') }}</p>
    <div class="text">
      <input v-focus type="text" v-model="description" @keyup.enter="createEvent" placeholder="Go shopping">
    </div>
    <div class="buttons">
      <button type="button" @click="createEvent">Create</button>
    </div>
    <button type="button" id="close-button" @click="closeForm">&#10005</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: ''
    }
  },
  computed: {
    date() {
      return this.$store.state.eventFormDate;
    },
    active() {
      return this.$store.state.eventFormActive;
    },
    top() {
      return `${this.$store.state.mouseY}px`;
    },
    left() {
      return `${this.$store.state.mouseX}px`;
    }
  },
  methods: {
    closeForm() {
      this.$store.commit('eventFormActive', false);
    },
    createEvent() {
      if (this.description.length > 0) {
        this.$store.dispatch('addEvent', this.description).then(_ => {
          this.description = '';
          this.$store.commit('eventFormActive', false);
        });
      }
    }
  },
  directives: {
    focus: {
      update(el) {
        el.focus();
      }
    }
  }
}
</script>
