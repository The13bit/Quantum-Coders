'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Show success message briefly before redirecting
        localStorage.setItem('success', 'true');
        const timer = setTimeout(() => {
            router.push('/');
            window.location.reload();
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 text-center">
                <h1 className="text-2xl text-green-600 mb-4">Login Successful!</h1>
                <p>Redirecting to homepage...</p>
            </div>
        </div>
    );
}