import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { BookOpen, Check } from 'lucide-react';

export function CourseSelectionScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [courses] = useState([
    { id: 1, name: 'Advanced Robotics & Control Systems (CS-401)', code: 'CS-401' },
    { id: 2, name: 'Data Structures & Algorithms (CS-201)', code: 'CS-201' },
    { id: 3, name: 'Quantum Physics & Mechanics (PHYS-301)', code: 'PHYS-301' },
    { id: 4, name: 'Linear Algebra & Vector Spaces (MATH-202)', code: 'MATH-202' },
  ]);
  const [selected, setSelected] = useState<number[]>([1, 2, 3]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <BookOpen size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Active Courses
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Select the classes you are currently enrolled in to generate study vectors.
          </p>
        </div>

        {/* Grouped iOS Checklist Container */}
        <div className="my-auto py-3">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80 text-left">
            {courses.map((course) => {
              const isSelected = selected.includes(course.id);
              return (
                <button
                  key={course.id}
                  onClick={() => toggle(course.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-zinc-800/80 transition-colors"
                >
                  <div className="pr-3">
                    <h4 className="text-sm font-semibold text-white">{course.name}</h4>
                    <span className="text-[11px] font-mono text-zinc-500">{course.code}</span>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#007AFF] text-white shadow-sm'
                        : 'border border-zinc-700 bg-zinc-800'
                    }`}
                  >
                    {isSelected && <Check size={14} className="stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction
            onClick={onNext}
            className="w-full"
            disabled={selected.length === 0}
          >
            Continue ({selected.length} Selected)
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Back
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


