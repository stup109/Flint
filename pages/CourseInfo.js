import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
export function CourseInfo() {
    const { course_id } = useParams();
    const [coursedata, setCoursedata] = useState(null);
    
    const WordCard = props => {
      const { word, chapter_name } = props;
      const url=`${word}`;
      return (
        <Link className="link" to={url}>
          <div className="wordcard">Chap.{word} {chapter_name}</div>
        </Link>
      );
    };

    useEffect(() => {
      fetch(`http://localhost/course_info.php?course_id=${course_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            return;
          }
  
          setCoursedata(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    if (coursedata==null) {
      return <div>正在加載...</div>;
    }
    return (
      <div className="container vertical">
        <h1>{coursedata.course.course_name} </h1>
 
          {coursedata.course_chapter.map((course_chapter) => (
            <WordCard
              key={course_chapter.chap_id} // 用word_id來作為唯一key
              word={course_chapter.chap_id}
              chapter_name={course_chapter.chap_name}
            />
          ))}

      </div>
    );
  }