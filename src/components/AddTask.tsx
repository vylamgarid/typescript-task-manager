import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addTask } from '../features/tasksSlice';

const AddTask: React.FC = () => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            await dispatch(addTask(taskTitle));
            setTaskTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add new task"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default AddTask;