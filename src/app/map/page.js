"use client";

import dynamic from "next/dynamic";

const CurrentLocationMap = dynamic(
  () => import("../components/maps/CurrentLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    ),
  }
);

export default function MapPage() {
  return <CurrentLocationMap />;
}