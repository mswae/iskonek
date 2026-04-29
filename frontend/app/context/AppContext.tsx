'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type TaskProgress = 'Not Started' | 'In Progress' | 'Completed';
export type TaskUrgency = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  requirement: string;
  progress: TaskProgress;
  urgency: TaskUrgency;
  scholarshipId?: string | null; // For the dropdown linking to a bookmarked scholarship
}

interface AppContextType {
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on initial mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('iskonek_bookmarks');
    const savedTasks = localStorage.getItem('iskonek_tasks');
    
    if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('iskonek_bookmarks', JSON.stringify(bookmarkedIds));
      localStorage.setItem('iskonek_tasks', JSON.stringify(tasks));
    }
  }, [bookmarkedIds, tasks, isLoaded]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]
    );
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = { ...taskData, id: crypto.randomUUID() };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider value={{ bookmarkedIds, toggleBookmark, tasks, addTask, updateTask, deleteTask }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}