import instance from "@/apis";
import qs from "querystring";

function getTodoList(todoData) {
    return instance.get(`/todo/${todoData.todoDate}`);
}

/*
    todoTitle: req.body.todoTitle, // 문자로 발송될 문자 제목
    todoContents: req.body.todoContents, // 문자로 발송될 문자 제목 뒤의 내용
    todoTime: req.body.todoTime, // 사용자가 작성한 TODO LIST가 진행되는 시간
    sendSchedule: req.body.sendSchedule, // 사용자가 설정한 알림 설정
*/
function addTodo(todoData) {
    return instance.post("/todo", qs.stringify(todoData));
}

function deleteTodo(todoData) {
    return instance.delete(`/todo/${todoData.todoId}`);
}

function editTodo(todoData) {
    return instance.put(`/todo/${todoData.todoId}`, qs.stringify(todoData));
}

function checkTodo(todoData) {
    return instance.post(`/todo/${todoData.todoId}/${todoData.todoStatus}`);
}

export {
    getTodoList,
    addTodo,
    deleteTodo,
    editTodo,
    checkTodo,
}