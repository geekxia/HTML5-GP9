"use strict";
var study = {
  namespaced: true,
  state: {
    num: 1e3
  },
  mutations: {
    add(state, payload) {
      state.num += payload;
    }
  }
};
exports.study = study;
