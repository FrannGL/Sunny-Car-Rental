import Layout from "@/src/components/layout/Layout";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
