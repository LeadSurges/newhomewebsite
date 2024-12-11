import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import PropertyDetails from "@/pages/PropertyDetails";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Favorites from "@/pages/Favorites";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminBuilders from "@/pages/admin/AdminBuilders";
import BuilderProfile from "@/pages/BuilderProfile";
import UploadProperty from "@/pages/UploadProperty";
import { AdminRoute } from "@/components/auth/AdminRoute";

export const AppRoutes = () => {

Let's clean up the URL structure for property details to make it simpler while maintaining SEO benefits. We'll modify the routes to make the URL more user-friendly.

<lov-code>
Let's update the AppRoutes.tsx file to simplify the URL structure while maintaining the SEO benefits of the slug:

<lov-write file_path="src/AppRoutes.tsx">
import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Properties from "@/pages/Properties";
import PropertyDetails from "@/pages/PropertyDetails";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Favorites from "@/pages/Favorites";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminBuilders from "@/pages/admin/AdminBuilders";
import BuilderProfile from "@/pages/BuilderProfile";
import UploadProperty from "@/pages/UploadProperty";
import { AdminRoute } from "@/components/auth/AdminRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:location" element={<Properties />} />
      <Route path="/property/:slug" element={<PropertyDetails />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route
        path="/admin/properties"
        element={
          <AdminRoute>
            <AdminProperties />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/builders"
        element={
          <AdminRoute>
            <AdminBuilders />
          </AdminRoute>
        }
      />
      <Route path="/builders/:id" element={<BuilderProfile />} />
      <Route
        path="/upload-property"
        element={
          <AdminRoute>
            <UploadProperty />
          </AdminRoute>
        }
      />
    </Routes>
  );
};