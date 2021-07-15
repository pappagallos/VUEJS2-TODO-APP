const mutations = {
    MUT_SET_USER_TRAITS(state, userData) {
        state.user.id = userData.userId;
        state.user.name = userData.userName;
        state.user.phone = userData.userPhone;
        state.user.token = userData.userToken;
    },
    MUT_USER_TOKEN(state, userToken) {
        state.userToken = userToken;
    },
    
    MUT_TODAY(state, todayObj) {
        state.today = todayObj;
    },
    MUT_MONTHLY(state, monthlyObj) {
        state.monthly = monthlyObj;
    },
    MUT_CURSOR(state, cursorObj) {
        state.cursor = cursorObj;
    },
    MUT_CALENDAR(state, calendarObj) {
        state.calendar = calendarObj;
    },

    MUT_UPDATE_MODAL_FLAG(state, value) {
        state.modal.flag = value;
    },
    MUT_UPDATE_ADD_TODO_MODAL_FLAG(state, value) {
        state.modal.isShowAddTodoModal = value;
    }
}

export default mutations;