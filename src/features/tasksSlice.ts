import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Define the initial state
interface TasksState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
};

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return response.data as Task[];
});

// Async thunk to add a task
export const addTask = createAsyncThunk('tasks/addTask', async (title: string) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
    });
    response.data.id = Date.now();
    return response.data;
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
});

// Slice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.tasks = action.payload;
                state.status = 'idle';
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
});

export const { toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;