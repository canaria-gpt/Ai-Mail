import React, {useState, useEffect} from 'react';
//import './LoginFormCss.css';
//import axios from "axios";
import Token from "./Token";

function TestLogin() {
    // const apiUrl = "http://localhost:8000/user-service/api/login";
    // const apiUrl = "http://localhost:11679/api/signup";
    const apiUrl = "http://localhost:8080/auth/login";

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in (has access token)
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = (event) => {
        event.preventDefault();

//        axios.post(apiUrl, {
//            username: formData.username,
//            password: formData.password
//        }, {
//            headers: {
//                "Content-Type": "application/json"
//            }
//        })
//            .then(response => {
//                console.log(response.data)
//                console.log(response.headers["Accesstoken"])
//                console.log(response.headers)
//                localStorage.setItem("accessToken",response.data["accessToken"])
//                axios.get(apiUrl,Token(localStorage.getItem("accessToken")))
//                    .then(response=>console.log(response))
//                    .catch(error=>console.error(error))
//            })
//            .catch(error => console.error(error));

         fetch(apiUrl, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 username: formData.username,
                 password: formData.password,
             }),
             responseHeaders: true
         })
             .then(response => response.json())
             .then(response => {
                 response.headers.forEach(console.log);
                 const accessToken = response.headers.get("accessToken");
                 const refreshToken = response.headers.get("refreshToken");
                 console.log(accessToken, refreshToken);
                 if (response.status === 200) {
                     // Handle successful login here
                     setLoginMessage("로그인이 되었습니다");
                     const accessToken = response.headers.get("accessToken");
                     const refreshToken = response.headers.get("refreshToken");
                     console.log(accessToken, refreshToken);

                     localStorage.setItem("accessToken", accessToken);
                     localStorage.setItem("refreshToken", refreshToken);

                     response.headers.forEach((value, name) => {
                         console.log(name, ":", value);
                     });

                     setIsLoggedIn(true);
                     // Redirect to root page
                     // window.location.href = "/";
                 } else if (response.status === 400) {
                     alert("유저정보가 올바르지 않습니다.")
                 } else {
                     setLoginMessage("로그인에 문제가 발생했습니다");
                 }
             })
             .catch(error => {
                 console.error("Error:", error);
                 setLoginMessage("로그인에 문제가 발생했습니다");
             });
    };

    const handleLogout = () => {
        // Remove access token from local storage
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <div className="login-form-container" style={{display: 'flex',
        justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h1>로그인 이거 적용된거 맞아?</h1>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={isLoggedIn ? handleLogout : handleLogin}>
                <label htmlFor="username">아이디: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <label htmlFor="password">비밀번호: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br/><br/>

                <button type="submit">로그인</button>
            </form>
            {loginMessage && <p style={{color: "green"}}>{loginMessage}</p>}
        </div>
    );
}

export default TestLogin;