import './style.css';
import { Link } from "react-router-dom";
import { useState,useEffect,useRef,useReducer } from "react";
import ReactDOM from "react-dom/client";

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

export function Home() {
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
  return (
    <div className="App">
        <header>
            <h2 className="logo">Logo</h2>
            <nav className="navigation">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Test</a>
                <a href="#">Other</a>
                <a href="login">Login</a>
                <a href="generatetext">Generate text</a>
                <a href="usercourse">User Course</a>
                <a href="allcourses">All Courses</a>
                
                {/* <button className="btnLogin">Login</button> */}
            </nav>
            <br/>
            {/* <div class="voice_to_text"> 
                <h1>Voice to Text Converter</h1>
                <input name="" id="convert_text"></input>
                <button id="click_to_record">Voice To Text</button>
            </div> */}
        </header>
        <body>
            <div className="container" >
            {userData &&
            userData.user_course.map((course, index) => (
                <LevelCard key={index} level={course.course_id} />
            ))}
            </div>
        </body>
    <div className="wrapper">

        <span className="icon-close">
            <ion-icon name="close-outline"></ion-icon>
        </span>
        <div className = "form-box-Login">
            <div className = "form-value">
                <form action = "">
                    <h2>Login</h2>
                    <div className = "inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" placeholder=" " required/>
                        <label for = "">Email</label>
                    </div>
                    <div className = "inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" placeholder=" " required/>
                        <label for = "">Password</label>
                    </div>
                    <div className="forget">
                        <label for = ""><input type="checkbox"/>Remember Me <a href="#">Forget Password</a></label>
                    </div>
                    <div className="button">
                        <button>Login</button>
                    </div>
                    <div className="register-link">
                        <p>Don't have a account <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
        <div className = "form-box-Register">
            <div className = "form-value">
                <form action = "">
                    <h2>Registration</h2>
                    <div className = "inputbox">
                        <ion-icon name="people-outline"></ion-icon>
                        <input type="name" placeholder=" " required/>
                        <label for = "">Username</label>
                    </div>
                    <div className = "inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" placeholder=" " required/>
                        <label for = "">Email</label>
                    </div>
                    <div className = "inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" placeholder=" " required/>
                        <label for = "">Password</label>
                    </div>
                    <div className="forget">
                        <label for = ""><input type="checkbox"/>I agree to the terms & conditions</label>
                    </div>
                    <div className="button">
                        <button>Login</button>
                    </div>
                    <div className="login-link">
                        <p>Already have a account? <a href="login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script type="text/javascript" src="speech.js"></script>
    </div>
  );
}

