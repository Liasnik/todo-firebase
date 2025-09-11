# To Do List з віртуалізацією

## Стек
- React 19
- Redux
- Redux-Saga
- Vite
- Firebase (Firestore)

## Функціонал
- Завантаження to-do елементів з Firebase Firestore (реальні запити).
- Віртуалізоване відображення (рендериться лише видима частина).
- Додавання, редагування, видалення, перемикання виконання.

## Запуск
0. Налаштувати Firebase (разово): у [консолі Firebase](https://console.firebase.google.com/) увімкнути Firestore, додати веб‑додаток і скопіювати конфіг. У корені створити файл `.env.local` та додати ключі:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
1. Встановити залежності:
```bash
npm install
```
2. Запустити dev-сервер:
```bash
npm run dev
```
3. Відкрити у браузері посилання з консолі (зазвичай `http://localhost:5173`).

## Структура даних
- Початкові 1000 елементів згенеровано у `src/data/todos.js` і можуть бути використані лише для одноразового сидування (опційно).
- Реальні запити до Firestore реалізовано у `src/api/todosApi.js`.

### Опційне сидування (1000 елементів)
У дев‑режимі можна одноразово заповнити колекцію `todos` з даних `src/data/todos.js`:
1. Відкрити додаток у браузері, DevTools → Console.
2. Виконати: `await window.seedTodos()`.
Після заповнення цей код можна прибрати.

## Ключові частини
- Саги: `src/store/sagas/todosSaga.js` + підключення `src/store/sagas/index.js`.
- Редʼюсер: `src/store/reducers/todosReducer.js`.
- Дії: `src/store/actions/todosActions.js`, типи: `src/store/types/todosTypes.js`.
- Віртуалізація: `src/shared/ui/VirtualizedList/VirtualizedList.jsx`.
- Елементи списку: `src/features/todos/ui/TodoItem.jsx`.
- Головний екран: `src/App.jsx`.
