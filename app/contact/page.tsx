import type { Metadata } from "next";
import Contact from "../../components/pages/Contact";
export const metadata: Metadata = {
  title: "About Us",
  description: "Discover Everything manifold holding is about. ",
};

export default function ContactPage() {
  return <Contact />;
}
