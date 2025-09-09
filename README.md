# To Do List з віртуалізацією
[Демо](https://liasnik.github.io/todo-firebase/)

## Стек
- React 19
- Redux Toolkit
- Redux-Saga
- Vite
- Firebase (Firestore)

## Функціонал
- Завантаження to-do елементів з Firebase Firestore.
- Віртуалізоване відображення (рендериться лише видима частина).
- Додавання, редагування, видалення, перемикання виконання.

## Запуск
1. Налаштувати Firebase: (https://console.firebase.google.com/) увімкнути Firestore, додати веб‑додаток і скопіювати конфіг. У корені створити файл `.env.local` та додати ключі:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
2. Встановити залежності:
```bash
npm install
```
3. Запустити dev-сервер:
```bash
npm run dev
```
4. Відкрити у браузері посилання з консолі (зазвичай `http://localhost:5173`).

## Структура даних
- Колекція Firestore `todos`: поля `text` (string), `completed` (boolean), `createdAt` (timestamp)
- API-запити: `src/api/todosApi.js`

## Ключові частини
- Стор: `src/store/store.js` (RTK `configureStore` + `redux-saga`).
- Слайс: `src/features/todos/model/todosSlice.js`.
- Саги: `src/store/sagas/todosSaga.js` + підключення `src/store/sagas/index.js`.
- Селектори: `src/features/todos/model/selectors.js`.
- Хуки дій: `src/hooks/useTodoActions.js`.
- Віртуалізація: `src/shared/ui/VirtualizedList/VirtualizedList.jsx`.
- Елементи списку: `src/features/todos/ui/TodoItem.jsx`.
- Головний екран: `src/App.jsx`.
