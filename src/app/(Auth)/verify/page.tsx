import React from 'react';

export default function Page() {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-4xl font-bold text-gray-900 mb-8">Verify Page</div>
      <div className="text-xl text-gray-700">
        Click on the link in your email to verify your account. Once verified, you can log in with your credentials.
      </div>
      <div className="text-lg text-gray-600 mt-4">
        If you did not receive the email, check your spam folder or resend the verification link.
      </div>
    </div>
 );
}
