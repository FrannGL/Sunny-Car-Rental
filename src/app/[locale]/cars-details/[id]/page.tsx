import CarsDetails3 from "@/src/components/sections/CarDetail";
import { CONFIG } from "@/src/config/config-global";
import { getServerSession } from "@/src/util/auth/getServerSession";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const session = getServerSession();
  const token = session.token;

  if (!token) return { title: "", description: "" };

  const response = await fetch(
    `${CONFIG.site.serverUrl}/cars/${Number(params.id)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return { title: "", description: "" };
  }

  const car = await response.json();

  return {
    title: "Sunny Car Rental | " + car.model,
    description: "Sunny Car Rental | " + params.id,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = getServerSession();
  const token = session.token;

  if (!token) return null;

  const response = await fetch(
    `${CONFIG.site.serverUrl}/cars/${Number(params.id)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    notFound();
  }

  const car = await response.json();

  return <CarsDetails3 car={car} />;
}
