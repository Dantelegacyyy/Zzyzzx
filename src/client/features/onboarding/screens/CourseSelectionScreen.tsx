import React, { useState } from 'react';
import { Check } from 'lucide-react';

const DEFAULT_COURSES = [
  { id: 'cs201', name: 'Data Structures', defaultChecked: true },
  { id: 'math240', name: 'Discrete Mathematics', defaultChecked: true },
  { id: 'cs310', name: 'Algorithms', defaultChecked: true },
  { id: 'cs330', name: 'Operating Systems', defaultChecked: false },
  { id: 'cs350', name: 'Computer Architecture', defaultChecked: false },
];

export function CourseSelectionScreen({
  onNext,
  onBack,
}: {
  onNext: (courses: string[]) => void;
  onBack: () => void;
}) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    DEFAULT_COURSES.filter((c) => c.defaultChecked).map((c) => c.id)
  );

  const toggleCourse = (id: string) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextClick = () => {
    const selectedCourseNames = DEFAULT_COURSES.filter((c) =>
      selectedCourses.includes(c.id)
    ).map((c) => c.name);
    onNext(selectedCourseNames.length > 0 ? selectedCourseNames : ['Data Structures', 'Discrete Mathematics', 'Algorithms']);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-slate-900 bg-[#FAFBFD] rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#007AFF] uppercase mb-3">
        <span>08 SELECT YOUR COURSES</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-5">
          Choose the courses you want to sync.
        </h2>

        {/* Checkbox Course List */}
        <div className="w-full space-y-2.5 text-left mb-4">
          {DEFAULT_COURSES.map((course) => {
            const isChecked = selectedCourses.includes(course.id);
            return (
              <button
                type="button"
                key={course.id}
                onClick={() => toggleCourse(course.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isChecked
                    ? 'bg-blue-50/80 border-[#007AFF]/60 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <span className={`text-xs sm:text-sm font-semibold ${
                  isChecked ? 'text-[#007AFF]' : 'text-slate-700'
                }`}>
                  {course.name}
                </span>

                {/* Custom Checkbox Square */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-[#007AFF] text-white shadow-sm'
                      : 'border-2 border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check size={14} className="stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNextClick}
            className="flex-1 py-3 px-6 rounded-full bg-[#007AFF] hover:bg-[#0062CC] active:scale-[0.98] text-white font-bold text-xs shadow-[0_4px_20px_rgba(0,122,255,0.4)] transition-all"
          >
            Next
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 2 ? 'w-4 bg-[#007AFF]' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
