import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as "builder" | "agent";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <ContactForm type={type} />
      </main>
    </div>
  );
};

export default Contact;