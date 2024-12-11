import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | LuxuryHomes"
        description="Read our privacy policy to understand how we collect, use, and protect your personal information."
      />
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy for LuxuryHomes</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-4">Effective Date: December 11th, 2024</p>
          
          <p className="mb-6">
            LuxuryHomes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our practices regarding your personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">a. Personal Information</h3>
          <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
            <li>Any other information you choose to provide through forms or account creation.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Non-Personal Information</h3>
          <p>We may collect non-personal information about your interactions with our Site, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages viewed and time spent on the Site</li>
            <li>Referring website addresses</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Cookies and Tracking Technologies</h3>
          <p>We use cookies, web beacons, and other tracking technologies to collect data about your browsing activities. You can manage your cookie preferences through your browser settings.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and improve our Site's functionality and user experience.</li>
            <li>Respond to inquiries and fulfill your requests.</li>
            <li>Send you updates, promotional materials, and other communications (with your consent).</li>
            <li>Analyze usage trends and gather demographic data.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Share Your Information</h2>
          <p>We do not sell your personal information. However, we may share your information in the following circumstances:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">a. Service Providers</h3>
          <p>We may share your information with third-party vendors and service providers who perform services on our behalf, such as hosting, data analysis, and customer support.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Legal Compliance</h3>
          <p>We may disclose your information if required by law or if we believe it is necessary to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Protect our rights or property.</li>
            <li>Investigate fraud or security issues.</li>
            <li>Comply with a legal obligation or government request.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Business Transfers</h3>
          <p>In the event of a merger, sale, or transfer of all or part of our business, your information may be transferred to the acquiring entity.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Choices</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">a. Access and Update Your Information</h3>
          <p>You can access, correct, or update your personal information by contacting us through our contact page.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">b. Opt-Out of Communications</h3>
          <p>You may opt-out of receiving promotional emails by following the unsubscribe instructions in those emails or contacting us directly.</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">c. Cookies</h3>
          <p>You can manage or disable cookies through your browser settings. However, disabling cookies may affect the functionality of the Site.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>We use administrative, technical, and physical measures to protect your information from unauthorized access, loss, or misuse. However, no security measures are completely foolproof.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Children's Privacy</h2>
          <p>The Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child under 13, we will take steps to delete it.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Links</h2>
          <p>The Site may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. The "Effective Date" at the top of this page indicates when the policy was last revised. Your continued use of the Site after changes are posted signifies your acceptance of the updated policy.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us from our contact us page.</p>

          <p className="mt-8">Thank you for visiting LuxuryHomes. Your privacy is important to us.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;