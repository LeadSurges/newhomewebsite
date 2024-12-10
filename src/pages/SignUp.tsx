import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-lg w-full p-2"
              required
            />
          </div>
          <button type="submit" className="bg-primary text-white rounded-lg px-4 py-2">
            Sign Up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
