import React, { useState } from 'react'
import { reSendOtp, userOtpVerify } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function VerifyOtp() {
    const navigate=useNavigate()
    const [otpcode,SetOtpCode]= useState('')
    const handleOtp=async()=>{
        const {first,second,third,fourth} =otpcode
        console.log(first,second,third,fourth);
        if (first=="" || second=="" || third=="" || fourth=="") {
            alert("invalid input")
        } else {
            const otp=Number(first+second+third+fourth)
            
            // console.log(typeof(otp));
            const id=sessionStorage.getItem("id")
            // console.log(id,otp);
            const result = await userOtpVerify({userId:id,otp})
            if (result.status==200) {
                toast.success("verified")
                navigate('/')
                sessionStorage.clear()
            } else {
                alert(result.response.data)
            }
            
        }
    }
    const resend = async()=>{
        const id=sessionStorage.getItem("id")
        const email=sessionStorage.getItem("email")
        const result= await reSendOtp({userId:id,email})
        if (result.status==200) {
            toast.success(result.data.message)
        } else {
            toast.error("can't send otp")
        }
    }
    return (
        <>
            <div class="container vh-100 d-flex justify-content-center align-items-center">
                <div class="w-50 ">
                    <div class="text-center">
                        <h6 className='p-3'>Please enter the one time password  to verify your account</h6>
                        <div> 
                            <span>A code has been sent to your</span> <small>email</small>
                        </div>
                        <div id="otp" class="inputs d-flex flex-row justify-content-center pt-2">
                            <input class="m-2 text-center form-control rounded border border-dark" type="text" id="first" maxLength="1" onChange={(e)=>{SetOtpCode({...otpcode,first:e.target.value})}}/>
                            <input class="m-2 text-center form-control rounded border border-dark" type="text" id="second" maxLength="1" onChange={(e)=>{SetOtpCode({...otpcode,second:e.target.value})}}/>
                            <input class="m-2 text-center form-control rounded border border-dark" type="text" id="third" maxLength="1" onChange={(e)=>{SetOtpCode({...otpcode,third:e.target.value})}}/>
                            <input class="m-2 text-center form-control rounded border border-dark" type="text" id="fourth" maxLength="1" onChange={(e)=>{SetOtpCode({...otpcode,fourth:e.target.value})}}/>
                        </div>
                        <div class="p-3">
                            <button class="btn btn-danger px-4 validate" onClick={handleOtp}>Validate</button>
                        </div>
                    </div>
                    <div class="card-2">
                        <div class="content d-flex justify-content-center align-items-center"> <span>Didn't get the code?</span>
                            <span class="text-decoration-none ms-2 text-danger" onClick={resend}>Resend</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyOtp