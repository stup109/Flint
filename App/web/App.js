import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './src/Home.js';
import {Login} from './src/Login.js'
import {GenerateText} from './src/GenerateText.js'
import {ChapterInfo} from './src/ChapterInfo.js'
import {ChapterTest} from './src/ChapterTest.js'
import {UserCourse} from './src/UserCourse.js'
import {CourseInfo} from './src/CourseInfo.js'
import {AllCourses} from './src/AllCourses.js'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/generatetext' element={<GenerateText />}/>
      <Route path="/usercourse" element={<UserCourse />} />
      <Route path="/usercourse/:course_id" element={<CourseInfo />} />
      <Route path="/usercourse/:course_id/:chap_id" element={<ChapterInfo />} />
      <Route path="/usercourse/:course_id/:chap_id/chaptertest" element={<ChapterTest />} />
      <Route path="/allcourses" element={<AllCourses />} />
    </Routes>
  );

}
export default App;
