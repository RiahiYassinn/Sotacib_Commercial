"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CIMENTERIES = ["SK", "SCB", "CAT", "CC", "CJO", "SCE", "SCG", "CIOK"];
const PRODUCTS = ["CEM 42,5", "CEM || 32,5", "CEM 42,5 SR-3", "CHAUX"];

const FloatingTimer = ({ startTime }) => {
  const [elapsed, setElapsed] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now - startTime;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      setElapsed({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-xl border-2 border-primary-500 p-4 animate-fade-in">
      <div className="flex items-center justify-center space-x-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20"></div>
          <Clock className="h-8 w-8 text-primary-600 relative z-10 animate-pulse" />
        </div>
        <div className="text-2xl font-bold text-primary-700 font-mono">
          {String(elapsed.hours).padStart(2, "0")}:
          {String(elapsed.minutes).padStart(2, "0")}:
          {String(elapsed.seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="text-xs text-primary-600 text-center mt-1 font-medium">
        Visite en cours
      </div>
    </div>
  );
};

function MapNewVisitDialog({ open, onClose, onSubmit, clientData = {} }) {
  const [formData, setFormData] = useState({
    date: "",
    observations: "",
    reclamations: "",
    products: [{ cimenterie: "", product: "", price: "" }],
  });

  const [visitStarted, setVisitStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const handleSetNow = () => {
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().slice(0, 16),
    }));
  };

  const handleProductChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { cimenterie: "", product: "", price: "" }],
    }));
  };

  const removeProductRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleStart = () => {
    setVisitStarted(true);
    setStartTime(new Date());
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().slice(0, 16),
    }));
  };

  const handleTerminer = () => {
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000 / 60);
    const hasSKProduct = formData.products.some((p) => p.cimenterie === "SK");

    onSubmit({
      ...formData,
      hasSKProduct,
      duration,
      date: new Date(formData.date),
    });

    setFormData({
      date: "",
      observations: "",
      reclamations: "",
      products: [{ cimenterie: "", product: "", price: "" }],
    });
    setVisitStarted(false);
    setStartTime(null);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      date: "",
      observations: "",
      reclamations: "",
      products: [{ cimenterie: "", product: "", price: "" }],
    });
    setVisitStarted(false);
    setStartTime(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={visitStarted ? undefined : handleClose}
      />

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">
          Nouvelle Visite {clientData.name ? `- ${clientData.name}` : ""}
        </h2>

        <div className="space-y-6">
          {/* Date and Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Date et heure
            </label>
            <div className="flex gap-2">
              <Input
                type="datetime-local"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                disabled={!visitStarted}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleSetNow}
                disabled={!visitStarted}
                className="bg-primary-600 hover:bg-primary-700 text-white w-10 h-10 p-0 flex items-center justify-center"
              >
                <Clock className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Produits
            </label>
            <div className="space-y-3">
              {formData.products.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[120px_140px_100px_40px] gap-2 items-center"
                >
                  <Select
                    value={product.cimenterie}
                    onValueChange={(value) =>
                      handleProductChange(index, "cimenterie", value)
                    }
                    disabled={!visitStarted}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Cimenterie" />
                    </SelectTrigger>
                    <SelectContent
                      className="select-content-full bg-white"
                      position="popper"
                    >
                      {CIMENTERIES.map((cim) => (
                        <SelectItem
                          key={cim}
                          value={cim}
                          className="select-item"
                        >
                          {cim}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={product.product}
                    onValueChange={(value) =>
                      handleProductChange(index, "product", value)
                    }
                    disabled={!visitStarted}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Produit" />
                    </SelectTrigger>
                    <SelectContent
                      className="select-content-full bg-white"
                      position="popper"
                    >
                      {PRODUCTS.map((prod) => (
                        <SelectItem
                          key={prod}
                          value={prod}
                          className="select-item"
                        >
                          {prod}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Prix"
                    value={product.price}
                    onChange={(e) =>
                      handleProductChange(index, "price", e.target.value)
                    }
                    disabled={!visitStarted}
                    className="w-full bg-white"
                  />

                  <div className="flex justify-center w-10">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeProductRow(index)}
                        disabled={!visitStarted}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-auto"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={addProductRow}
                disabled={!visitStarted}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center gap-2 h-10"
              >
                <Plus className="h-4 w-4" />
                Ajouter un produit
              </Button>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Observations
            </label>
            <Textarea
              value={formData.observations}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  observations: e.target.value,
                }))
              }
              disabled={!visitStarted}
              rows={3}
              placeholder="Vos observations..."
              className="bg-white"
            />
          </div>

          {/* Réclamations */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Réclamations
            </label>
            <Textarea
              value={formData.reclamations}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  reclamations: e.target.value,
                }))
              }
              disabled={!visitStarted}
              rows={3}
              placeholder="Détails des réclamations..."
              className="bg-white"
            />
          </div>

          {/* Form Buttons */}
          <div className="flex gap-3 pt-4">
            {!visitStarted && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Annuler
              </Button>
            )}
            {!visitStarted ? (
              <Button
                type="button"
                onClick={handleStart}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
              >
                Démarrer
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleTerminer}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Terminer
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Timer */}
      {visitStarted && startTime && <FloatingTimer startTime={startTime} />}
    </div>
  );
}

export default MapNewVisitDialog;