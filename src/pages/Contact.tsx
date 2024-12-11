import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { GeneralContactForm } from "@/components/contact/GeneralContactForm";
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
          <GeneralContactForm />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Contact;