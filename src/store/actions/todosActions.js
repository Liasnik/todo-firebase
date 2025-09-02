import {
    LOAD_TODOS_REQUEST,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    EDIT_TODO_REQUEST,
    EDIT_TODO_SUCCESS,
    EDIT_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
} from '../types/todosTypes';

export const loadTodos = () => ({type: LOAD_TODOS_REQUEST})
export const loadTodosSuccess = (todos) => ({type: LOAD_TODOS_SUCCESS, payload: todos})
export const loadTodosFailure = (error) => ({type: LOAD_TODOS_FAILURE, payload: error})

export const addTodo = (text, id) => ({type: ADD_TODO_REQUEST, payload: { text, id }})
export const addTodoSuccess = (todo, tempId) => ({type: ADD_TODO_SUCCESS, payload: { todo, tempId }})
export const addTodoFailure = (error, tempId) => ({type: ADD_TODO_FAILURE, payload: {error, tempId}})

export const editTodo = (todo, patch) => ({type: EDIT_TODO_REQUEST, payload:{ todo, patch }})
export const editTodoSuccess = (updatedTodo) => ({type: EDIT_TODO_SUCCESS, payload: updatedTodo })
export const editTodoFailure = (error, originalTodo) => ({type: EDIT_TODO_FAILURE, payload: { error, originalTodo }})

export const deleteTodo = (todo, index) => ({type: DELETE_TODO_REQUEST, payload: { todo, index }})
export const deleteTodoSuccess = (id) => ({type: DELETE_TODO_SUCCESS, payload: { id }})
export const deleteTodoFailure = (error, originalTodo, index) => ({type: DELETE_TODO_FAILURE, payload: { error, originalTodo, index }})