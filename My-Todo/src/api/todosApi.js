import { db } from '../shared/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';

const TODOS_COLLECTION = 'todos';

export const fetchTodos = async () => {
  const q = query(collection(db, TODOS_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addTodoApi = async (text) => {
  const payload = { text, completed: false, createdAt: serverTimestamp() };
  const ref = await addDoc(collection(db, TODOS_COLLECTION), payload);
  // Считываем обратно, чтобы получить фактический createdAt
  const snap = await getDoc(doc(db, TODOS_COLLECTION, ref.id));
  const data = snap.exists() ? snap.data() : { text, completed: false };
  return { id: ref.id, ...data };
};

export const updateTodoApi = async (id, patch) => {
  const ref = doc(db, TODOS_COLLECTION, id);
  await updateDoc(ref, patch);
  return { id, ...patch };
};

export const deleteTodoApi = async (id) => {
  const ref = doc(db, TODOS_COLLECTION, id);
  await deleteDoc(ref);
  return id;
};
