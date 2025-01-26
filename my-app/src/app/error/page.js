'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



export default function LoginError() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1>=0?prev-1:0);
        }, 1000);

        const redirect = setTimeout(() => {
            router.push('/login');
        }, 3000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Login Failed</h1>
                <p className="mb-4">Redirecting to login page in {countdown} seconds...</p>
                <button
                    onClick={() => router.push('/login')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Go to Login Now
                </button>
            </div>
        </div>
    );
}