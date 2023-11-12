import { useState,useEffect,useRef,useReducer } from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";

const LevelCard = ({ level }) => {
  const url = `/usercourse/${level}`;
// 修正：改一下，用course_id去找coursename，再把對應的course_name放到card。
  if(level==1){
    var course_name='Listening';
  }
  else if(level==2){
    var course_name='Speaking';
  }
  else if(level==3){
    var course_name='Reading';
  }
  else{
    var course_name='Writing';
  }

  return (
    <Link className="link" to={url}>
      <div className="card">{course_name}</div>
    </Link>
  );
};

const UserCourse = () => {
  const [userData, setUserData] = useState(null);
  const [sessionValid, setSessionValid] = useState(false);
  useEffect(() => {
    fetch(`http://localhost/user_info.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          return;
        }
        console.log(data);
        console.log(data.user_course.progress_percentage);
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

  if (userData ==null) {
    return <div>請先登入。</div>;
  }

  // useEffect(() => {
  //   fetch(`http://localhost/course_info.php?course_id=`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //         return;
  //       }
  //       console.log(data);
  //       console.log(data.user_course.progress_percentage);
  //       setUserData(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }, []);


  return (
      <>
        <h1>User Course</h1>
        <div className="container" >
        {userData &&
          userData.user_course.map((course, index) => (
            <LevelCard key={index} level={course.course_id} />
        ))}
        </div>

      </>
    
  );
}
export {UserCourse};

// course_id，去找course_name
