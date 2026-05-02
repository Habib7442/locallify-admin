import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Premium Web Design & Branding by Locallify",
  description: "Browse our diverse portfolio of premium websites, branding, and digital marketing results for local businesses, including restaurants, salons, and more.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
