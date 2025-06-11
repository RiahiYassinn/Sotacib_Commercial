"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import MapNewClientDialog from "../clients/MapNewClientDialog";
import { initialPins } from "./initialPins";
import { Geolocation } from "@capacitor/geolocation";

const MapComponent = dynamic(
  () => import("./MapComponent").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[85vh] flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    ),
  }
);

export default function CurrentLocationMap() {
  const defaultPosition = { lat: 36.8967, lng: 10.1932 };
  const [position, setPosition] = useState(defaultPosition);
  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [customPins, setCustomPins] = useState(initialPins);
  const [isPositionClicked, setIsPositionClicked] = useState(false);

   const handleGetLocation = async () => {
     setLoading(true);
     try {
       const permissionStatus = await Geolocation.checkPermissions();

       if (permissionStatus.location === "denied") {
         await Geolocation.requestPermissions();
       }

       const position = await Geolocation.getCurrentPosition({
         enableHighAccuracy: true,
         timeout: 10000,
       });

       const newPosition = {
         lat: position.coords.latitude,
         lng: position.coords.longitude,
       };

       setPosition(newPosition);
       setIsPositionClicked(true);
       setLocationInfo(
         `Position actuelle - Latitude: ${newPosition.lat.toFixed(
           6
         )}, Longitude: ${newPosition.lng.toFixed(6)}`
       );
     } catch (error) {
       console.error("Error getting location:", error);
       setLocationInfo("Erreur lors de la récupération de la position");
     } finally {
       setLoading(false);
     }
   };

  const handleLocationSelect = (location) => {
    setSelectedLocation({
      latitude: location.lat,
      longitude: location.lng,
    });
    setShowNewClientDialog(true);
  };

  const handleClientSubmit = (clientData) => {
    console.log("Client data before adding to pins:", clientData);
    const newPin = {
      ...clientData,
      latitude: parseFloat(clientData.latitude),
      longitude: parseFloat(clientData.longitude),
      visits: [clientData.firstVisit],
      name: clientData.name,
    };
    console.log("New pin being added:", newPin);
    setCustomPins((prev) => [...prev, newPin]);
    setShowNewClientDialog(false);
    setSelectedLocation(null);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGetLocation}
        disabled={loading}
        className={`flex items-center justify-center w-full px-4 py-2 text-white rounded-md transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary-600 hover:bg-primary-700"
        }`}
      >
        <MapPin className="w-5 h-5 mr-2" />
        {loading ? "Localisation en cours..." : "Ma position actuelle"}
      </button>

      {locationInfo && (
        <div className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">{locationInfo}</p>
        </div>
      )}

      <div className="h-[85vh] rounded-lg overflow-hidden shadow-md">
        <MapComponent
          position={position}
          onLocationSelect={handleLocationSelect}
          customPins={customPins}
          setCustomPins={setCustomPins}
          isPositionClicked={isPositionClicked}
        />
      </div>

      <MapNewClientDialog
        open={showNewClientDialog}
        onClose={() => setShowNewClientDialog(false)}
        onSubmit={handleClientSubmit}
        location={selectedLocation}
      />
    </div>
  );
}
