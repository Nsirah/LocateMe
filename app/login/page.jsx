'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {

const router = useRouter();

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {

e.preventDefault();

try{

setIsLoading(true);

await signInWithEmailAndPassword(

auth,

email,

password

);
console.log(auth.currentUser);

alert("Login Successful!");

router.push("/");

}catch(error){

alert(error.message);

}

finally{

setIsLoading(false);

}

};
return (

<div className="min-h-screen flex flex-col">

<Navbar />

<div className="flex-1 flex items-center justify-center bg-muted/30 py-12">

<div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md p-8">

<h1 className="text-3xl font-bold text-center mb-2">

Welcome Back

</h1>

<p className="text-center text-muted-foreground mb-8">

Sign in to continue using LocateMe.

</p>

<form
onSubmit={handleLogin}
className="space-y-5"
>

<div>

<label className="block text-sm font-semibold mb-2">

Email Address

</label>

<input

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="example@gmail.com"

required

className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"

/>

</div>

<div>

<label className="block text-sm font-semibold mb-2">

Password

</label>

<input

type="password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

placeholder="Enter your password"

required

className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"

/>

</div>

<Button

type="submit"

disabled={isLoading}

className="w-full"

>

{isLoading ? "Signing In..." : "Login"}

</Button>

<p className="text-center text-sm text-muted-foreground">

Don't have an account?

<Link

href="/register"

className="text-primary font-semibold ml-1 hover:underline"

>

Register

</Link>

</p>

</form>

</div>

</div>

<Footer />

</div>

)

}