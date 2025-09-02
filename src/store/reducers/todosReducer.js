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

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TODOS_REQUEST:
            return { ...state, loading: true, error: null };
        case LOAD_TODOS_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case LOAD_TODOS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Optimistic create: add item immediately with a temp id
        case ADD_TODO_REQUEST:
            return {
                ...state,
                items: [{
                    id: action.payload.id, // use temp ID to replace later on success
                    text: action.payload.text,
                    completed: false,
                }, ...state.items],
            };
        case ADD_TODO_SUCCESS:{
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.tempId ? action.payload.todo : item
                ),
            };
        }
        case ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: state.items.filter(item => item.id !== action.payload.tempId),
            };

        // Optimistic update: patch item immediately
        case EDIT_TODO_REQUEST:
            return {
                ...state,
                items: state.items.map(todo =>
                    todo.id === action.payload.todo.id ? { ...todo, ...action.payload.patch } : todo
                ),
            };
        case EDIT_TODO_SUCCESS:
            // Merge server payload to ensure final state parity
            return {
                ...state,
                items: state.items.map(todo =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                ),
                error: null,
            };
        case EDIT_TODO_FAILURE:
            // Rollback to original item on failure
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: state.items.map(todo =>
                    todo.id === action.payload.originalTodo.id ? action.payload.originalTodo : todo
                ),
            };
            
        // Optimistic delete: remove immediately, rollback on failure
        case DELETE_TODO_REQUEST: {
            const { todo } = action.payload;
            // remove immediately
            return {
                ...state,
                items: state.items.filter(item => item.id !== todo.id),
            };
        }
        case DELETE_TODO_SUCCESS:
            // No-op besides clearing error/loading; item already removed
            return { ...state, loading: false, error: null };
        case DELETE_TODO_FAILURE: {
            // Rollback: insert item back to original index
            const { originalTodo, index, error } = action.payload;
            const before = state.items.slice(0, index);
            const after = state.items.slice(index);
            return {
                ...state,
                loading: false,
                error,
                items: [...before, originalTodo, ...after],
            };
        }

        default:
            return state;
    }
}