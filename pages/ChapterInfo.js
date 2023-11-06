import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { handleLogout } from "./api.js";
// import ReactHtmlParser from 'react-html-parser';
export function ChapterInfo() {
    const { course_id,chap_id } = useParams();
    const [chapdata, setChapdata] = useState(null);
    useEffect(() => {
        fetch(`http://localhost/chap_info.php?course_id=${course_id}&chap_id=${chap_id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
              return;
            }
    
            setChapdata(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
    if (chapdata==null) {
      return <div>正在加載...</div>;
    }

    // 反白部分去查找單字中文意思
    document.addEventListener('mouseup', function(e){
      let selection = window.getSelection();
      //console.log(selection.toString());
    },false);

    const LevelCard = ({ course_id,chap_id }) => {
      const url = `/usercourse/${course_id}/${chap_id}/chaptertest`; 
      return (
        <Link className="link" to={url}>
          <div className="card">本章題目</div>
        </Link>
      );
    };

    return (
      <div className="wordcardinfo">
        <h3>Course ID: {chapdata.course_id}</h3>
        <h3>Chap ID: {chapdata.chap_id}</h3>
        <h3>Chap Name: {chapdata.chap_name}</h3>
        <h3>Chap Content:</h3>
        <h3 dangerouslySetInnerHTML={{ __html: chapdata.content }} />
        
        <LevelCard course_id={chapdata.course_id} chap_id={chapdata.chap_id}/>
        {/* <h3>{ReactHtmlParser(chapdata.content.replace(/\n/g, '<br>'))}</h3> */}
      </div>
    );
  }

  //7.27到這裡，記得用課程到章節的字卡