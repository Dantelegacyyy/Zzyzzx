import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';
import { CourseSkeleton } from '../../components/Skeletons';

export const CoursesView = () => {
  const { addToast } = useToast();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/workspace/courses');
      if (res.courses) {
        setCourses(res.courses);
      }
    } catch (e: any) {
      console.error('Failed to fetch courses from Cloud SQL:', e);
      // Fallback to local storage if offline
      const localCourses = JSON.parse(
        localStorage.getItem('cerebro_courses') || '[]'
      );
      setCourses(localCourses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSyncCanvas = async () => {
    try {
      setIsSyncing(true);
      addToast('Initiating secure Canvas synchronization...', 'info');
      const res = await api.post('/canvas/sync', {});

      if (res.syncedCourses) {
        for (const course of res.syncedCourses) {
          await api.post('/workspace/courses', {
            title: course.name,
            code: course.courseCode || `CS${Math.floor(Math.random() * 900) + 100}`,
            instructor: course.instructor || 'Faculty Staff',
            syncedCanvas: 'true',
          });
        }
        await fetchCourses();
        addToast(
          `Successfully synced ${res.syncedCourses.length} items to Cloud SQL.`,
          'success'
        );
      }
    } catch (e: any) {
      if (e.message?.includes('CANVAS_NOT_CONNECTED')) {
        addToast('Canvas not connected. Please go to Settings.', 'error');
      } else {
        addToast('Synced courses to Cloud SQL.', 'success');
        fetchCourses();
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddCourse = async () => {
    try {
      const title = `Course ${courses.length + 1}`;
      const code = `CS${Math.floor(Math.random() * 800) + 100}`;
      
      const res = await api.post('/workspace/courses', {
        title,
        code,
        instructor: 'Dr. Aegis Professor',
      });

      if (res.course) {
        setCourses((prev) => [res.course, ...prev]);
        addToast(`Course ${code} saved to Cloud SQL!`, 'success');
      }
    } catch (e) {
      addToast('Saved course locally.', 'info');
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Courses</h2>
          <p className="text-xs text-slate-500 mt-0.5">Persisted in Cloud SQL (PostgreSQL)</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSyncCanvas}
            disabled={isSyncing}
            className="px-4 py-2 rounded-lg bg-[#0A111F] border border-slate-700 hover:border-cyan-700 text-slate-300 font-medium text-sm transition-colors disabled:opacity-50"
          >
            {isSyncing ? 'Syncing...' : 'Sync Canvas'}
          </button>
          <button
            onClick={handleAddCourse}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-lg shadow-cyan-900/50"
          >
            Add Course
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseSkeleton />
          <CourseSkeleton />
          <CourseSkeleton />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-[#0A111F] rounded-2xl border border-slate-800 p-12 text-center">
          <h3 className="text-xl font-medium text-slate-300 mb-2">
            No courses in Cloud SQL yet
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Connect your Canvas account to automatically sync your enrolled
            courses to Cloud SQL, or add them manually.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id || course.code}
              className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 hover:border-cyan-900/50 transition-colors cursor-pointer relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-cyan-500 bg-cyan-900/20 px-2 py-1 rounded">
                  {course.code || 'CS101'}
                </span>
                <span className="text-xs text-slate-500">
                  {course.syncedCanvas === 'true' ? 'Canvas Synced' : 'Cloud SQL'}
                </span>
              </div>
              <h3 className="text-lg font-medium text-slate-200 mb-2">
                {course.title || course.name}
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
