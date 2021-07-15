const getters = {
    // 로그인 된 유저인지 확인하는 getters
    isLogin(state) {
        return (state.user.id !== "" && state.user.name !== "" && state.user.phone !== "" && state.user.token !== "") ? true : false;
    },  

    // 모달 데이터
    modalTitle(state) {
        return state.modal.title;
    },
    modalContent(state) {
        return state.modal.content;
    },

    cursorYear(state) {
        return state.cursor.year;
    },
    cursorMonth(state) {
        return state.cursor.month;
    },
    cursorDate(state) {
        return state.cursor.date;
    },
}

export default getters;