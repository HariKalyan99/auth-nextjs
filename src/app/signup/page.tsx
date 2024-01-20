"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [loading, setLoading] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        }catch(error:any){
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="username" value={user.username} onChange={(e) => {
                setUser({...user, username: e.target.value})
        }} placeholder="enter your username" />


        <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="email" id="email" value={user.email} onChange={(e) => {
                setUser({...user, email: e.target.value})
        }} placeholder="enter your email" /> 




        <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} onChange={(e) => {
                setUser({...user, password: e.target.value})
        }} placeholder="enter your password" />


        <button className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" onClick={onSignup} >{buttonDisabled ? "NO Signup": "Signup here"}</button>
        <span>Already registered </span>
        <Link href={"/login"} style={{textDecoration: "underline", color: "red"}} >Login here</Link>
        </div>
    )
}