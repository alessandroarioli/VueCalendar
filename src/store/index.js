import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

// Moment.js
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
  state: {
    currentYear: 2018,
    currentMonth: 1,
    mouseX: 0,
    mouseY: 0,
    eventFormActive: false,
    eventFormDate: moment(),
    events: []
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPosition(state, payload) {
      state.mouseX = payload.x;
      state.mouseY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload;
    },
    addEvent(state, payload) {
      state.events.push(payload);
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    }
  },
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        let obj = {
          description: payload,
          date: context.state.eventFormDate
        };

        // Send event to Node server
        Axios.post('/add_event', obj).then(response => {
          if (response.status === 200) {
            context.commit('addEvent', obj);
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
});
