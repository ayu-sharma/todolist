import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function MainComponent() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks || [];
  });
  const [editedTask, setEditedTask] = useState(() => {
    const savedEditedTask = JSON.parse(localStorage.getItem('editedTask'));
    return savedEditedTask || null;
  });
  const [currentTask, setCurrentTask] = useState(() => {
    const savedCurrentTask = localStorage.getItem('currentTask');
    return savedCurrentTask || '';
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
      const savedEditedTask = JSON.parse(localStorage.getItem('editedTask'));
      if (savedEditedTask !== null) {
        setEditedTask(savedEditedTask);
      }
      const savedCurrentTask = localStorage.getItem('currentTask');
      if (savedCurrentTask) {
        setCurrentTask(savedCurrentTask);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('editedTask', JSON.stringify(editedTask));
  }, [editedTask]);

  useEffect(() => {
    localStorage.setItem('currentTask', currentTask);
  }, [currentTask]);

  const handleAddTask = (taskText) => {
    const newTasks = [...tasks, { text: taskText, checked: false }];
    setTasks(newTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleTask = (index) => {
    const checkTasks = tasks.map((task, i) =>
      i === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(checkTasks);
  };

  const editTask = (index) => {
    setCurrentTask(tasks[index].text);
    setEditedTask(index);
  };

  const updateTask = (taskText) => {
    if (!taskText.trim()) {
      return;
    }
    const updatedTasks = tasks.map((task, i) => {
      if (i === editedTask) {
        return { ...task, text: taskText };
      }
      return task;
    });
    setTasks(updatedTasks);
    setCurrentTask('');
    setEditedTask(null);
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} updateTask={updateTask} editTask={editTask} currentTask={currentTask} />
      <TaskList tasks={tasks} onToggleTask={handleToggleTask} onRemoveTask={handleRemoveTask} onEditTask={editTask} />
    </div>
  );
}

export default MainComponent;
