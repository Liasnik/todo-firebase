const todos = Array.from({ length: 1000}, (_, index) => ({
  id: index + 1,
  text: `Задача #${index + 1}`,
  completed: false,
}));

export default todos;
