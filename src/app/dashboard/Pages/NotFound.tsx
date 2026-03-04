'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Optional: Log the 404 route for analytics
    // console.error('404 Error: User attempted to access non-existent route:', pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-8xl font-extrabold mb-4 text-gray-800 dark:text-gray-100 animate-bounce">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Maybe you were looking for one of our tours or your dashboard?
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition-colors duration-200"
      >
        Go to Dashboard
      </Link>
      <Link
        href="/"
        className="mt-3 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 underline"
      >
        Or Return to Home
      </Link>
    </div>
  );
};

export default NotFound;