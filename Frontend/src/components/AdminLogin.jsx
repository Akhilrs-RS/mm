import { useState } from 'react';
import logImg from '../assets/log.png';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const apiHost = window.location.hostname;
      const response = await fetch(`http://${apiHost}:5005/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin_is_logged_in', 'true');
        localStorage.setItem('admin_username', data.username);
        onLoginSuccess();
      } else {
        setError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the administration server. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 relative select-none font-sans overflow-hidden">
      {/* Dynamic abstract ambient backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-900/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <img src={logImg} alt="MM Jewellery Logo" className="h-10 w-auto object-contain mb-1" />
          <span className="font-serif text-sm tracking-[0.2em] text-gold-400 font-semibold whitespace-nowrap">
            MM Jewellery
          </span>
          <p className="text-neutral-450 text-[10px] uppercase tracking-[0.15em] font-light mt-1">
            Administration Portal
          </p>
        </div>

        {/* Login Glassmorphism Box */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/80 relative">
          {/* Subtle gold top border light */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>

          <h2 className="font-serif text-xl text-white font-medium mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-950/40 border border-red-500/20 text-red-300 rounded-lg p-3 text-xs leading-relaxed mb-6 font-light">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={isLoading}
                className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-400/50 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLoading}
                className="w-full bg-black/60 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold-400/50 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#aa7c11] hover:bg-gold-500 text-white font-medium text-sm tracking-widest uppercase py-3.5 rounded-lg shadow-lg hover:shadow-gold-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Access Portal'
              )}
            </button>
          </form>

          {/* Go Back Link */}
          <div className="text-center mt-6">
            <a href="/" className="text-neutral-500 hover:text-neutral-300 text-xs tracking-wider transition-colors">
              &larr; Return to main site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
