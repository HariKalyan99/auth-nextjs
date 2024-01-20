"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Success");
            router.push("/profile");
        }catch(error:any){
            console.log("Login failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
        <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="email" id="email" value={user.email} onChange={(e) => {
                setUser({...user, email: e.target.value})
        }} placeholder="enter your email" /> 




        <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} onChange={(e) => {
                setUser({...user, password: e.target.value})
        }} placeholder="enter your password" />


        <button className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" onClick={onLogin} >Login</button>
        <span>If you have not registered </span>
        <Link href={"/signup"} style={{color: "red", textDecoration: "underline"}}>Signup</Link>
        </div>
    )
}