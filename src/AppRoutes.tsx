import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import BuilderProfile from "./pages/BuilderProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminProperties from "./pages/AdminProperties";
import AdminBuilders from "./pages/AdminBuilders";
import UploadProperty from "./pages/UploadProperty";
import Contact from "./pages/Contact";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/properties" element={<Properties />} />
    <Route path="/properties/:id" element={<PropertyDetails />} />
    <Route path="/properties/upload" element={<UploadProperty />} />
    <Route path="/builders/:id" element={<BuilderProfile />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/admin/properties" element={<AdminProperties />} />
    <Route path="/admin/builders" element={<AdminBuilders />} />
    <Route path="/admin/properties/new" element={<UploadProperty />} />
  </Routes>
);