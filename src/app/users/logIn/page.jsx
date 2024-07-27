"use client";
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

const logIn = () => {
    const [User, setUser] = useState({
        email: '',
        password: '',
    });

    const params = useParams();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value });
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

        if (!User.name) {
            errors.name = "Username is required";
        }
        if (!User.password) {
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
            body: JSON.stringify(User),
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
                    type="email"
                    name='email'
                    onChange={handleChange}
                    value={User.email}
                    placeholder='E-mail'
                    required />

                <input className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
                    type="password"
                    name='password'
                    onChange={handleChange}
                    value={User.password}
                    placeholder='Password'
                    required />

                <button className='bg-green-600 text-white font-semibold px-8 py-2 rounded-lg self-center w-full'>Log In</button>
            </form>
        </div>
    )
}

export default logIn
