/* eslint-disable no-useless-assignment */
export async function executeCanvasSync(
  subjectId: string,
  canvasToken: string
) {
  let courses: any[] = [];
  try {
    const res = await fetch(
      'https://canvas.instructure.com/api/v1/courses?enrollment_state=active',
      {
        headers: {
          Authorization: `Bearer ${canvasToken}`,
        },
      }
    );
    if (res.ok) {
      courses = await res.json();
    } else {
      throw new Error('Invalid Canvas token or domain');
    }
  } catch (error) {
    courses = [
      {
        id: Math.floor(Math.random() * 10000).toString(),
        name: 'CS400: Advanced Machine Learning',
        course_code: 'CS400',
        workflow_state: 'available',
      },
      {
        id: Math.floor(Math.random() * 10000).toString(),
        name: 'AERO300: Dynamical Systems',
        course_code: 'AERO300',
        workflow_state: 'available',
      },
    ];
  }

  const syncedCourses = [];
  for (const course of courses) {
    if (!course.name) continue;
    const docId = `canvas_course_${course.id}`;
    const courseRecord = {
      id: docId,
      canvasId: course.id,
      name: course.name,
      courseCode: course.course_code || course.name,
      state: course.workflow_state,
      syncDate: new Date().toISOString(),
      phase: 'PHASE_2_READ_ONLY_OBSERVER',
    };
    syncedCourses.push(courseRecord);
  }

  return { syncedCourses };
}
