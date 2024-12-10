import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as "builder" | "agent" | null;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {type ? (
          <ContactForm type={type} />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground mb-6">
              We would love to hear from you! Please reach out with any questions or comments.
            </p>
            <ContactForm type="builder" />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Contact;