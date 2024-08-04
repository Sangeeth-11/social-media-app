import React, { useContext, useState } from 'react'
import { userLogin, userRegister } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { refreshContext } from '../contextApi/Refresh'



function Auth() {
    const navigate = useNavigate()
    const {setRefresh} = useContext(refreshContext)
    const [status, SetStatus] = useState(true)
    const [loginData, setLoginData] = useState('')
    const [registerData, setRegisterData] = useState('')


    const handleLogin = async () => {
        const {email,password}=loginData
        if (!email) {
            toast.error("email cannot be empty")
        }
        else if(!password){
            toast.error("password cannot be empty")
        }
        else{
            const result = await userLogin(loginData)
            if (result.status == 200) {
                toast("login successfull")
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.userDetails))
                setRefresh(result)
                navigate('/home')
            } 
            else if(result.status==202){
                toast("email not verified")
                // sessionStorage.setItem("userData", JSON.stringify(result.data.userData))
                sessionStorage.setItem("id", result.data.user._id)
                sessionStorage.setItem("email", result.data.user.email)
                setRefresh(result)
                navigate('/verifyOTP')
            }
            else {
                toast(result.response.data)
            }
        }
    }
    const handleRegister = async () => {

        const { username, email, password, confirmPassword } = registerData
        console.log(username.length);
        if (!username || !email || !password || !confirmPassword) {
            toast.error("All fields required ")
        }
        else if ( username.length < 3) {
            toast.error("Username should be minimun of 4 characters")
        }
        else if ( password.length < 5 ) {
            toast.error("password should be minimum of 6 characters")
        }
        else if (password != confirmPassword) {
            toast.error(" password and confirmpassword doesnot match")
        }
        else {
            const result = await userRegister(registerData)
            if (result.status == 200) {
                alert("otp sent to registered email")
                console.log(result.data.value);
                sessionStorage.setItem("id", result.data.value._id)
                sessionStorage.setItem("email", result.data.value.email)
                navigate('/verifyOTP')
            } else {
                alert("not registered")
            }
        }



    }
    return (
        <div>

            <section className="vh-90 mt-5">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center  h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://www.loginradius.com/blog/static/9168d643be247776ac19f500f1689d09/d3746/social.jpg"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                {status ?
                                    <div>
                                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3">
                                            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="email" id="form3Example3" className="form-control form-control-lg"
                                                placeholder="Enter a valid email address" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                                        </div>


                                        <div data-mdb-input-init className="form-outline ">
                                            <input type="password" id="form3Example4" className="form-control form-control-lg" autoComplete="on"
                                                placeholder="Enter password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">

                                            <span>
                                            </span>
                                            {/* <span className="text-white">Forgot password?</span> */}
                                        </div>

                                        <div className="text-center text-lg-start mt-1 pt-2">
                                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleLogin}
                                            >Login</button>
                                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <span
                                                className="link-danger" onClick={() => { SetStatus(false) }}>Register</span></p>
                                        </div>
                                    </div> :
                                    <div>
                                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3">
                                            <p className="lead fw-normal mb-0 me-3">Sign up </p>

                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-2">
                                            <input type="text" id="form3Example1" className="form-control form-control-lg"
                                                placeholder="Enter a username" onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
                                            <label className="form-label" htmlFor="form3Example1">Username </label>
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-2">
                                            <input type="email" id="form3Example2" className="form-control form-control-lg"
                                                placeholder="Enter a valid email address" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                                            <label className="form-label" htmlFor="form3Example2">Email address</label>
                                        </div>


                                        <div data-mdb-input-init className="form-outline mb-2">
                                            <input type="password" id="form3Example4" className="form-control form-control-lg" autoComplete="off"
                                                placeholder="Enter password" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                        </div>
                                        <div data-mdb-input-init className="form-outline ">
                                            <input type="password" id="form3Example5" className="form-control form-control-lg" autoComplete="off"
                                                placeholder="Enter confirm password" onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} />
                                            <label className="form-label" htmlFor="form3Example5"> Confirm Password</label>
                                        </div>



                                        <div className="text-center text-lg-start mt-2 pt-2">
                                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleRegister}
                                            >Sign up</button>
                                            <p className="small fw-bold mt-2 pt-1 mb-0">Login again? <span
                                                className="link-danger" onClick={() => { SetStatus(true) }}>Login</span></p>
                                        </div>
                                    </div>

                                }


                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary fixed-bottom d-none d-md-block">

                    <div className="text-white mb-3 mb-md-0 bg-primary ">
                        SocialSpot © 2024. All rights reserved.
                    </div>



                </div>
            </section>
        </div>
    )
}

export default Auth