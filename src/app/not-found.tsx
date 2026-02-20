import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | EduPlan360',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[3rem] p-10 md:p-16 text-center transform hover:scale-[1.01] transition-transform duration-500">
        <div className="mb-8 relative inline-block">
          <h1 className="text-8xl md:text-[9rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 tracking-tighter drop-shadow-sm">
            404
          </h1>
          <div className="absolute -bottom-4 right-0 transform translate-x-1/2 rotate-12 text-6xl shadow-sm">
            👀
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
          Oops. Page not found.
        </h2>
        
        <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed font-medium">
          Looks like you navigated to a page that doesn&apos;t exist. Maybe it moved, or maybe it&apos;s just a glitch in the matrix.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            Take me Home
          </Link>
          <Link
            href="/portal/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 font-semibold rounded-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95"
          >
            Student Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
