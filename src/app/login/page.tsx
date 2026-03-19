import Link from 'next/link';
import Header from '@/components/Header';
import AppLogo from '@/components/ui/AppLogo';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="min-h-screen flex items-center justify-center bg-white pt-24">
        <div className="w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-8 bg-white">
          <div className="flex flex-col items-center text-center">
            <AppLogo size={44} />
            <h1 className="mt-5 text-2xl font-display font-800 text-foreground">
              Login to ManageMySalon
            </h1>
            <p className="mt-2 text-sm text-muted">
              Enter your credentials to continue.
            </p>
          </div>

          <form className="mt-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-6 rounded-lg bg-green-800 text-white py-3 font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>

            <div className="mt-4 flex items-center justify-between text-sm">
              <Link href="#" className="text-primary hover:underline">
                Forgot password
              </Link>
              <Link href="/homepage" className="text-muted hover:text-foreground hover:underline">
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

