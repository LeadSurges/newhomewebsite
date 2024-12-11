import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { EmailSignUpForm } from "@/components/auth/EmailSignUpForm";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await signUp(email, password);
      navigate("/properties");
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="flex flex-col items-center justify-center px-4 min-h-[calc(100vh-64px)] py-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Create an Account</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Sign up to start exploring new homes
            </p>
          </div>

          <EmailSignUpForm onSubmit={handleSignUp} isLoading={isLoading} />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/signin" className="text-accent hover:text-accent/90 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;