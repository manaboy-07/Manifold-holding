import type { Metadata } from "next";
import { MCLPage } from "@/components/subsidiaries/Subsidiaries";

export const metadata: Metadata = {
  title: "Manifold Computers Limited | Manifold Holdings",
  description:
    "Enterprise infrastructure, networks, datacentres, end-user computing, enterprise software and managed services.",
};

export default function Page() {
  return <MCLPage />;
}
