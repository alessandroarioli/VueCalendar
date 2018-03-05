<template>
  <div id="calendar">
    <div id="header">
      <div>
        <img src="../assets/logo.png">
        <h1>Vue Js Calendar</h1>
      </div>
      <div>
        <current-month></current-month>
      </div>
    </div>
    <div id="day-bar">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>
    <div v-for="week in weeks" class="calendar-week">
      <calendar-day v-for="day in week" :day="day" ></calendar-day>
    </div>
    <event-form></event-form>
  </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue';
import CurrentMonth from './CurrentMonth.vue';
import EventForm from './EventForm.vue';

export default {
  data() {
    return {
      sunday: 0,
      monday: 1
    }
  },
  computed: {
    month() {
      return this.$store.state.currentMonth;
    },
    year() {
      return this.$store.state.currentYear;
    },
    days() {
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');

      do {
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, 'days');
      } while (currentDay.month() + 1 === this.month);

      currentDay = this.$moment(days[0]);

      if (currentDay.day() !== this.monday) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        } while (currentDay.day() !== this.monday);
      }

      currentDay = this.$moment(days[days.length - 1]);

      if (currentDay.day() !== this.sunday) {
        do {
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        } while (currentDay.day() !== this.sunday);
      }

      return days;
    },
    weeks() {
      let weeks = [];
      let week = [];

      for (let day of this.days) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    }
  },
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  }
}
</script>
