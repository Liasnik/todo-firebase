import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        loadTodosRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loadTodosSuccess(state, action) {
            state.loading = false;
            state.items = action.payload;
        },
        loadTodosFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        // optimistic add
        addTodoRequest(state, action) {
            const { id, text } = action.payload;
            state.items.unshift({ id, text, completed: false });
        },
        addTodoSuccess(state, action) {
            const { todo, tempId } = action.payload;
            state.items = state.items.map(item => (item.id === tempId ? todo : item));
        },
        addTodoFailure(state, action) {
            const { error, tempId } = action.payload;
            state.loading = false;
            state.error = error;
            state.items = state.items.filter(item => item.id !== tempId);
        },

        // optimistic edit
        editTodoRequest(state, action) {
            const { todo, patch } = action.payload;
            state.items = state.items.map(t => (t.id === todo.id ? { ...t, ...patch } : t));
        },
        editTodoSuccess(state, action) {
            const updated = action.payload;
            state.items = state.items.map(t => (t.id === updated.id ? { ...t, ...updated } : t));
            state.error = null;
        },
        editTodoFailure(state, action) {
            const { error, originalTodo } = action.payload;
            state.loading = false;
            state.error = error;
            state.items = state.items.map(t => (t.id === originalTodo.id ? originalTodo : t));
        },

        // optimistic delete
        deleteTodoRequest(state, action) {
            const { todo } = action.payload;
            state.items = state.items.filter(item => item.id !== todo.id);
        },
        deleteTodoSuccess(state) {
            state.loading = false;
            state.error = null;
        },
        deleteTodoFailure(state, action) {
            const { originalTodo, index, error } = action.payload;
            state.loading = false;
            state.error = error;
            const before = state.items.slice(0, index);
            const after = state.items.slice(index);
            state.items = [...before, originalTodo, ...after];
        },
    },
});

export const {
    loadTodosRequest,
    loadTodosSuccess,
    loadTodosFailure,
    addTodoRequest,
    addTodoSuccess,
    addTodoFailure,
    editTodoRequest,
    editTodoSuccess,
    editTodoFailure,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFailure,
} = todosSlice.actions;

export default todosSlice.reducer;


