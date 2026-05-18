import type { Metadata } from "next";
import { WireframeHeader } from "@/components/wireframe/WireframeHeader";
import { WireframeFooter } from "@/components/wireframe/WireframeFooter";

export const metadata: Metadata = {
  title: "empmags.com — Wireframe",
  description:
    "Mid-fi wireframe of the proposed Electro Magnetic Products website. Not final design.",
};

export default function WireframeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wireframe-root">
      <WireframeHeader />
      <main className="wf-main">{children}</main>
      <WireframeFooter />
    </div>
  );
}
