import { getUserTraitsData } from "@/utils/userStorage";

const state = {
    user: {
        id: getUserTraitsData("userId"),       // 로그인 된 사용자 아이디
        name: getUserTraitsData("userName"),     // 로그인 된 사용자 이름
        phone: getUserTraitsData("userPhone"),    // 로그인 된 사용자 핸드폰 번호
        token: getUserTraitsData("userToken"),    // 로그인 된 사용자 토큰
    },

    dayList: ["일", "월", "화", "수", "목", "금", "토"],
    
    today: {
        year: null,     // 년
        month: null,    // 월
        date: null,     // 일
        day: null       // 요일
    },

    monthly: {
        endOfDate: null, // 현재 월의 마지막 일수가 몇 일인지 구해 저장되는 변수
        startOfDay: null // 현재 월의 1일이 시작하는 요일을 구해 저장되는 변수
    },

    cursor: {
        year: null,     // 년
        month: null,    // 월
        date: null,     // 일
        day: null       // 요일
    },

    calendar: {
        date: []
    },

    modal: {
        isShowAddTodoModal: false,   // TODO LIST를 추가하는 MODAL을 띄울 것 인지 체크해주는 상태 값
        flag: false,                // 모달을 띄었는지 확인하는 플래그, true일 경우에는 모달을 띄우고 false일 경우에는 모달을 끄는 기능
        title: null,                // 모달 화면에서 보일 제목 부분
        content: null               // 모달 화면에서 보일 내용 부분
    }
}

export default state;