import React, { useState, useEffect } from 'react';
import { handleLogout } from './api.js';
import './styles.css';

const AllCourses = () => {
  const [courses, setCourses] = useState([]); // 放所有課程資訊

  useEffect(() => {
    // 在组件加载时获取课程数据
    fetch(`http://localhost:5000/get_courses`)
      .then((response) => response.json())
      .then((data) => {
        // 从Python返回的课程数据
        console.log(data);
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <h1>Course List</h1>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Is Public</th>
          </tr>
        </thead>
        <tbody>
          {courses.courses && courses.courses.map((course) => (
            <tr key={course.course_id}>
              <td>{course.course_id}</td>
              <td>{course.course_name}</td>
              <td>{course.course_describe}</td>
              <td>{course.course_public === 0 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>

        
      </table>
    {courses.courses && courses.courses.map((course,index) => (
        <h3 key={course.course_id}>{course.course_id}</h3>
    ))}
    </>
  );
};

export { AllCourses };
