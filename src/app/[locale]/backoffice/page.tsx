"use client";

import CarTable from "@/src/components/CarTable";
import Layout from "@/src/components/layout/Layout";
import { useCarStore } from "@/src/store/useCarStore";

export default function Page() {
  const { cars } = useCarStore();

  return (
    <Layout>
      <CarTable cars={cars} />
    </Layout>
  );
}
