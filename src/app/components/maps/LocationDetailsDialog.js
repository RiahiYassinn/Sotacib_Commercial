"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MapNewVisitDialog from "../visits/MapNewVisitDialog";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

export default function LocationDetailsDialog({
  open,
  onClose,
  location,
  customPins,
  setCustomPins,
}) {
  const [showNewVisitDialog, setShowNewVisitDialog] = useState(false);

  if (!open || !location) return null;

  const handleNewVisit = (visitData) => {
    if (!customPins || !setCustomPins) {
      console.error("Missing customPins or setCustomPins props");
      return;
    }

    const updatedPins = customPins.map((pin) => {
      if (
        pin.latitude === location.latitude &&
        pin.longitude === location.longitude
      ) {
        return {
          ...pin,
          visits: [...(pin.visits || []), visitData],
        };
      }
      return pin;
    });

    setCustomPins(updatedPins);
    setShowNewVisitDialog(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ zIndex: 1000 }}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        style={{ zIndex: 999 }}
      />
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
        style={{ zIndex: 1001 }}
      >
        {/* Header */}
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          {location.name}
        </h3>
        <p className="text-gray-600 mb-6">{location.description}</p>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <span className="text-gray-700">{location.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-500" />
            <div className="space-y-1">
              <div className="text-gray-700">{location.phone}</div>
              {location.mobile && (
                <div className="text-gray-700">{location.mobile}</div>
              )}
            </div>
          </div>

          {location.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <a
                href={`mailto:${location.email}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {location.email}
              </a>
            </div>
          )}
        </div>

        {/* Recent Visits */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Visites Récentes
          </h4>
          {location.visits && location.visits.length > 0 ? (
            <div className="space-y-2">
              {location.visits.slice(0, 3).map((visit, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="font-medium">
                    {new Date(visit.date).toLocaleString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {visit.observations && (
                    <div className="text-sm text-gray-600 mt-1">
                      Observations: {visit.observations}
                    </div>
                  )}
                  {visit.reclamations && (
                    <div className="text-sm text-gray-600 mt-1">
                      Réclamations: {visit.reclamations}
                    </div>
                  )}
                  {visit.products && visit.products.length > 0 && (
                    <div className="text-sm text-gray-600 mt-1">
                      Produits:{" "}
                      {visit.products
                        .map(
                          (p) => `${p.cimenterie} ${p.product} (${p.price}DT)`
                        )
                        .join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune visite récente</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Fermer
          </Button>
          <Button
            onClick={() => setShowNewVisitDialog(true)}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
          >
            Nouvelle Visite
          </Button>
        </div>

        {/* New Visit Dialog */}
        <MapNewVisitDialog
          open={showNewVisitDialog}
          onClose={() => setShowNewVisitDialog(false)}
          onSubmit={handleNewVisit}
          clientData={location}
        />
      </div>
    </div>
  );
}
