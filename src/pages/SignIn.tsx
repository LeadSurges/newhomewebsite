import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
