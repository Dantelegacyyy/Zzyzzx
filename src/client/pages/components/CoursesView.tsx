import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';

export const CoursesView = () => {
  const { addToast } = useToast();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Mock local loading
    const localCourses = JSON.parse(
      localStorage.getItem('cerebro_courses') || '[]'
    );
    setCourses(localCourses);
  }, []);

  const saveCourses = (newCourses: any[]) => {
    localStorage.setItem('cerebro_courses', JSON.stringify(newCourses));
    setCourses(newCourses);
  };

  const handleSyncCanvas = async () => {
    try {
      setIsSyncing(true);
      addToast('Initiating secure Canvas synchronization...', 'info');
      setTimeout(() => {
        if (isSyncing) addToast('AEGIS extracting course metadata...', 'aegis');
      }, 500);
      const res = await api.post('/canvas/sync', {});

      const newCourses = [...courses];
      if (res.syncedCourses) {
        for (const course of res.syncedCourses) {
          newCourses.push({
            ...course,
            code: course.courseCode || `C-${Math.floor(Math.random() * 900)}`,
          });
        }
      }

      saveCourses(newCourses);
      addToast(
        `Successfully synced ${res.syncedCourses?.length || 0} items.`,
        'success'
      );
    } catch (e: any) {
      if (e.message.includes('CANVAS_NOT_CONNECTED')) {
        addToast('Canvas not connected. Please go to Settings.', 'error');
      } else {
        addToast('Failed to sync Canvas.', 'error');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddDummyCourse = () => {
    const id = window.crypto.randomUUID();
    const newCourse = {
      id,
      code: `CS${Math.floor(Math.random() * 900) + 100}`,
      name: 'New Custom Course',
      term: 'Fall 2026',
    };
    saveCourses([...courses, newCourse]);
    addToast('Course created.', 'success');
  };

  const handleDelete = (courseId: string) => {
    const updated = courses.filter((c) => c.id !== courseId);
    saveCourses(updated);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-wide">Courses</h2>
        <div className="flex gap-3">
          <button
            onClick={handleSyncCanvas}
            disabled={isSyncing}
            className="px-4 py-2 rounded-lg bg-[#0A111F] border border-slate-700 hover:border-cyan-700 text-slate-300 font-medium text-sm transition-colors disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync Canvas'}
          </button>
          <button
            onClick={handleAddDummyCourse}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-lg shadow-cyan-900/50"
          >
            Add Course
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-slate-500 text-center py-12">
          Loading courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-[#0A111F] rounded-2xl border border-slate-800 p-12 text-center">
          <h3 className="text-xl font-medium text-slate-300 mb-2">
            No courses yet
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Connect your Canvas account to automatically sync your enrolled
            courses, or add them manually.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 hover:border-cyan-900/50 transition-colors cursor-pointer relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(course.id);
                  }}
                  className="text-slate-500 hover:text-red-400"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-cyan-500 bg-cyan-900/20 px-2 py-1 rounded">
                  {course.code}
                </span>
                <span className="text-xs text-slate-500">
                  {course.term || 'Synced'}
                </span>
              </div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                {course.name}
              </h3>
              {course.instructor && (
                <p className="text-sm text-slate-500">{course.instructor}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
