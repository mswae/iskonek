'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type TaskProgress = 'Not Started' | 'In Progress' | 'Completed';
export type TaskUrgency = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string; 
  scholarshipId?: string | null;
  title: string;
  requirement: string;
  progress: TaskProgress;
  urgency: TaskUrgency;
}

// Internal type to keep track of the Django Bookmark primary keys
interface BookmarkRecord {
  id: number;
  scholarship: number;
}

interface AppContextType {
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updated: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // 1. Derived state to keep the rest of the frontend happy without breaking it
  const bookmarkedIds = bookmarks.map(b => b.scholarship.toString());

  // 2. Fetch Initial Data from Django on Mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    // Fetch Tasks
    fetch(`${API_URL}/api/tracker/tasks/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then(data => {
        const formattedTasks = data.map((t: any) => ({
          id: t.id.toString(),
          scholarshipId: t.scholarship ? t.scholarship.toString() : null,
          title: t.title,
          requirement: t.requirement,
          progress: t.progress,
          urgency: t.urgency,
        }));
        setTasks(formattedTasks);
      })
      .catch(err => {
        console.error(err);
        if (err.message === "Unauthorized") {
          localStorage.removeItem('accessToken');
          window.location.href = '/login'; // Auto-logout on dead token
        }
      });

    // Fetch Bookmarks
    fetch(`${API_URL}/api/tracker/bookmarks/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setBookmarks(data))
      .catch(err => console.error(err));
  }, []);

  // 3. API Actions
  const toggleBookmark = async (scholarshipId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("Please log in to bookmark scholarships.");
      return;
    }

    const existingBookmark = bookmarks.find(b => b.scholarship.toString() === scholarshipId);

    if (existingBookmark) {
      // It exists -> DELETE it
      try {
        const res = await fetch(`${API_URL}/api/tracker/bookmarks/${existingBookmark.id}/`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setBookmarks(prev => prev.filter(b => b.id !== existingBookmark.id));
        }
      } catch (err) { console.error(err); }
    } else {
      // It doesn't exist -> POST it
      try {
        const res = await fetch(`${API_URL}/api/tracker/bookmarks/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ scholarship: parseInt(scholarshipId) })
        });
        if (res.ok) {
          const newBookmark = await res.json();
          setBookmarks(prev => [...prev, newBookmark]);
        }
      } catch (err) { console.error(err); }
    }
  };

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const payload = {
      title: taskData.title,
      requirement: taskData.requirement,
      progress: taskData.progress,
      urgency: taskData.urgency,
      scholarship: taskData.scholarshipId ? parseInt(taskData.scholarshipId) : null
    };

    try {
      const res = await fetch(`${API_URL}/api/tracker/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const t = await res.json();
        const newTask: Task = {
          id: t.id.toString(),
          scholarshipId: t.scholarship ? t.scholarship.toString() : null,
          title: t.title,
          requirement: t.requirement,
          progress: t.progress,
          urgency: t.urgency,
        };
        setTasks(prev => [newTask, ...prev]);
      } else {
        // THIS IS THE NEW ERROR CATCHER
        const errorData = await res.json();
        console.error("Backend rejected task:", errorData);
        alert("Failed to save task. Check console for details.");
        
        if (res.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
      }
    } catch (err) { console.error(err); }
  };

  const updateTask = async (id: string, updatedData: Partial<Task>) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    // Map frontend 'scholarshipId' to backend 'scholarship' expected field
    const payload: any = { ...updatedData };
    if (updatedData.scholarshipId !== undefined) {
        payload.scholarship = updatedData.scholarshipId ? parseInt(updatedData.scholarshipId) : null;
        delete payload.scholarshipId;
    }

    try {
      const res = await fetch(`${API_URL}/api/tracker/tasks/${id}/`, {
        method: 'PATCH', // We use PATCH to only update the fields that changed
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
      }
    } catch (err) { console.error(err); }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/tracker/tasks/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setTasks(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  return (
    <AppContext.Provider value={{ bookmarkedIds, toggleBookmark, tasks, addTask, updateTask, deleteTask }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}