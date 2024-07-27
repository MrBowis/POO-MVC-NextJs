"use client";
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

const signUp = () => {

  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const params = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    await createUser();
    router.push("/");
  };

  const validate = () => {
    let errors = {};

    if (!newUser.name) {
      errors.name = "Username is required";
    }
    if (!newUser.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const createUser = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      const data = await res.json();
      setErrors(data.errors);
    }
  }
  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center w-full">
      <form onSubmit={handleSubmit} className='max-w-xs'>
        <input className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          type="text"
          name='name'
          onChange={handleChange}
          value={newUser.name}
          placeholder='Name'
          required />

        <input className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          type="text"
          name='lastname'
          onChange={handleChange}
          value={newUser.lastname}
          placeholder='Last Name'
          required />

        <input className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          type="email"
          name='email'
          onChange={handleChange}
          value={newUser.email}
          placeholder='E-mail'
          required />

        <input className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          type="password"
          name='password'
          onChange={handleChange}
          value={newUser.password}
          placeholder='Password'
          required />

        <button className='bg-green-600 text-white font-semibold px-8 py-2 rounded-lg self-center w-full'>Sign Up</button>
      </form>
    </div>
  )
}

export default signUp
