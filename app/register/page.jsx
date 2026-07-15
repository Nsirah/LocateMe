'use client'

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {

    setIsLoading(true);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {

      fullName: formData.fullName,

      email: formData.email,

      role: "user",

      createdAt: serverTimestamp(),

      photoURL: ""

    });

    alert("Account created successfully!");

    router.push("/login");

  } catch (error) {

    alert(error.message);

  } finally {

    setIsLoading(false);

  }

};

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <div className="flex-1 flex items-center justify-center bg-muted/30 py-12">

        <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md p-8">

          <h1 className="text-3xl font-bold text-center mb-2">
            Create an Account
          </h1>

          <p className="text-center text-muted-foreground mb-8">
            Join LocateMe to report missing persons and submit sightings.
          </p>

         <form
  onSubmit={handleRegister}
  className="space-y-5"
> 
   
            {/* Full Name */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Full Name
  </label>

  <input
    type="text"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    placeholder="Enter your full name"
    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    required
  />
</div>

{/* Email */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Email Address
  </label>

  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="example@gmail.com"
    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    required
  />
</div>

{/* Password */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Password
  </label>

  <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter your password"
    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    required
  />
</div>

{/* Confirm Password */}
<div>
  <label className="block text-sm font-semibold mb-2">
    Confirm Password
  </label>

  <input
    type="password"
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm your password"
    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
    required
  />
</div>
<Button
  type="submit"
  disabled={isLoading}
  className="w-full py-3"
>
  {isLoading ? "Creating Account..." : "Create Account"}
</Button>

<p className="text-center text-sm text-muted-foreground">

  Already have an account?

  <Link
    href="/login"
    className="text-primary font-semibold ml-1 hover:underline"
  >
    Login
  </Link>

</p>
    </form>

        </div>

      </div>

      <Footer />

    </div>

  )

}