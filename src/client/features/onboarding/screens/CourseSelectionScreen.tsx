import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function CourseSelectionScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [courses] = useState([
    { id: 1, name: 'Advanced Robotics (CS-401)' },
    { id: 2, name: 'Linear Algebra (MATH-202)' },
    { id: 3, name: 'Quantum Physics (PHYS-301)' },
  ]);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">
          Select Your Courses
        </h2>

        <div className="space-y-3 mb-10">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => toggle(course.id)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                selected.includes(course.id)
                  ? 'border-blue-500 bg-blue-50/50 text-blue-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selected.includes(course.id)
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selected.includes(course.id) && (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-lg">{course.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction
            onClick={onNext}
            className="flex-1"
            disabled={selected.length === 0}
          >
            Next
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
