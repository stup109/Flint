import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home.js';
import {Login} from './pages/Login.js'
import {GenerateText} from './pages/GenerateText.js'
import {ChapterInfo} from './pages/ChapterInfo.js'
import {ChapterTest} from './pages/ChapterTest.js'
import {UserCourse} from './pages/UserCourse.js'
import {CourseInfo} from './pages/CourseInfo.js'
import {AllCourses} from './pages/AllCourses.js'


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
