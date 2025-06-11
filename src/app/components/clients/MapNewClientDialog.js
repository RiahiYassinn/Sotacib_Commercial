"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MapNewVisitDialog from "../visits/MapNewVisitDialog";

export default function MapNewClientDialog({
  open,
  onClose,
  onSubmit,
  location = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    responsible: "",
    email: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [showVisitDialog, setShowVisitDialog] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setShowVisitDialog(true);
  };

  useEffect(() => {
    if (open && location) {
      setFormData({
        name: "",
        responsible: "",
        email: "",
        phone: "",
        address: "",
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
      });
      setShowVisitDialog(false);
    }
  }, [open, location]);

  const handleClose = () => {
    setFormData({
      name: "",
      responsible: "",
      email: "",
      phone: "",
      address: "",
      latitude: "",
      longitude: "",
    });
    setShowVisitDialog(false);
    onClose();
  };

  const handleVisitSubmit = (visitData) => {
    const finalData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      pinType: visitData.hasSKProduct ? "green" : "red",
      firstVisit: visitData,
    };
    onSubmit(finalData);
    setFormData({
      name: "",
      responsible:"",
      email: "",
      phone: "",
      address: "",
      latitude: "",
      longitude: "",
    });
    setShowVisitDialog(false);
    handleClose();
  };

  return (
    <>
      {showVisitDialog ? (
        <MapNewVisitDialog
          open={showVisitDialog}
          onClose={() => setShowVisitDialog(false)}
          onSubmit={handleVisitSubmit}
          clientData={formData}
        />
      ) : (
        open && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleClose}
            />
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
              <h3 className="text-lg font-bold mb-4">Nouveau point de vente</h3>

              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full bg-white"
                    placeholder="Nom du client"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsable
                  </label>
                  <Input
                    value={formData.responsible}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        responsible: e.target.value,
                      }))
                    }
                    className="w-full bg-white"
                    placeholder="Nom du responsable"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full bg-white"
                    placeholder="email@exemple.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full bg-white"
                    placeholder="12 345 678"
                    required
                    maxLength="8"
                    pattern="[0-9]{8}"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full bg-white"
                    placeholder="Adresse du client"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    Suivant
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )
      )}
    </>
  );
}