import store from "@/store";

function saveUserTraits(userData) {
    return window.localStorage.setItem("todo_user_traits", `{"userId": "${userData.userId}", "userName": "${userData.userName}", "userPhone": "${userData.userPhone}", "userToken": "${userData.userToken}"}`);
}

function saveStoreUserTraits(userData) {
    store.commit("MUT_SET_USER_TRAITS", userData);
    return;
}

function getUserTraitsData(jsonName) {
    const jsonContents = JSON.parse(window.localStorage.getItem("todo_user_traits"));
    if(typeof jsonContents === "undefined" || jsonContents === null) return "";
    else return jsonContents[jsonName];
}

export {
    saveUserTraits,
    saveStoreUserTraits,
    getUserTraitsData,
}