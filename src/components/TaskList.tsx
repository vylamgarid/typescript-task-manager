import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, toggleTask } from '../features/tasksSlice';
import { RootState, AppDispatch } from '../store';
import { setFilter } from '../features/filterSlice'


const TaskList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { tasks, status } = useSelector((state: RootState) => state.tasks);
    const filter = useSelector((state: RootState) => state.filter.filter);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        dispatch(deleteTask(id));
    };

    const handleToggle = (id: number) => {
        dispatch(toggleTask(id));
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // 'all' filter
    });

    return (
        <ul className="list-group">
            <div className="mt-4 mb-2">
                <button
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => dispatch(setFilter('all'))}
                >
                    All
                </button>
                <button
                    className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => dispatch(setFilter('completed'))}
                >
                    Completed
                </button>
                <button
                    className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => dispatch(setFilter('pending'))}
                >
                    Pending
                </button>
            </div>
            {filteredTasks.map((task) => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="form-check-input me-3"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                    </div>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;