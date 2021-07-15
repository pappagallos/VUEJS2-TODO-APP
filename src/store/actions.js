const actions = {
    ACT_SET_USER_TOKEN({ commit }, userToken) {
        commit("MUT_USER_TOKEN", userToken);
    },
    ACT_SET_TODAY({ commit }, todayObj) {
        commit("MUT_TODAY", todayObj);
    },
    ACT_SET_MONTHLY({ commit }, monthlyObj) {
        commit("MUT_MONTHLY", monthlyObj);
    },
    ACT_SET_CURSOR({ commit }, cursorObj) {
        commit("MUT_CURSOR", cursorObj);
    },
    ACT_SET_CALENDAR({ commit }, calendarObj) {
        commit("MUT_CALENDAR", calendarObj);
    }
}

export default actions;