"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  MapPin,
  User,
  Search,
  Trash,
  Filter,
  Calendar,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewVisitDialog from "../components/visits/NewVisitDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CustomSelect from "../../components/ui/CustomSelect";

const REGIONS = ["Sousse", "Monastir", "Mahdia", "Kairouan", "Sfax"];
const PRODUCTS = ["CEM 42,5", "CEM || 32,5", "CEM 42,5 SR-3", "CHAUX"];
const DURATION_CATEGORIES = [
  { label: "Toutes les durées", value: "all_durations" },
  { label: "Courte (<30 min)", value: "short" },
  { label: "Moyenne (30-60 min)", value: "medium" },
  { label: "Longue (>60 min)", value: "long" },
];

const initialMockVisits = [
  {
    id: 1,
    date: new Date(2024, 11, 7, 14, 30),
    client: "Comptoir Hammami",
    duration: 45,
    distance: 2.3,
    region: "Sousse",
    products: ["CEM 42,5", "CEM || 32,5"],
    observations: "Client satisfait, intéressé par une commande importante",
    reclamations: null,
  },
  {
    id: 2,
    date: new Date(2024, 11, 7, 16, 0),
    client: "COMAF",
    duration: 30,
    distance: 1.8,
    region: "Monastir",
    products: ["CEM 42,5"],
    observations: "Stock faible",
    reclamations: "Délai de livraison trop long",
  },
  {
    id: 3,
    date: new Date(2024, 11, 6, 9, 15),
    client: "Dépôt Central Sahel",
    duration: 55,
    distance: 3.2,
    region: "Mahdia",
    products: ["CHAUX", "CEM 42,5 SR-3"],
    observations: "Nouveau point de vente potentiel",
    reclamations: null,
  },
];

export default function VisitsPage() {
  const [visits, setVisits] = useState(initialMockVisits);
  const [isNewVisitOpen, setIsNewVisitOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

const [selectedRegion, setSelectedRegion] = useState("Toutes les régions");
const [selectedProduct, setSelectedProduct] = useState("Tous les produits");
const [selectedClient, setSelectedClient] = useState("Tous les clients");
  const [selectedDuration, setSelectedDuration] = useState("all_durations");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [hasReclamations, setHasReclamations] = useState(false);

  const uniqueClients = useMemo(() => {
    return Array.from(new Set(visits.map((visit) => visit.client)));
  }, [visits]);

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const matchesSearch =
        visit.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.observations?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === "Toutes les régions" ||
        visit.region === selectedRegion;

      const matchesProduct =
        selectedProduct === "Tous les produits" ||
        visit.products.includes(selectedProduct);

      const matchesClient =
        selectedClient === "Tous les clients" ||
        visit.client === selectedClient;

      const matchesDuration =
        selectedDuration === "all_durations" ||
        (selectedDuration === "short" && visit.duration < 30) ||
        (selectedDuration === "medium" &&
          visit.duration >= 30 &&
          visit.duration <= 60) ||
        (selectedDuration === "long" && visit.duration > 60);

      const matchesReclamations =
        !hasReclamations || visit.reclamations !== null;

      const visitDate = new Date(visit.date);
      const fromDate = dateRange.from ? new Date(dateRange.from) : null;
      const toDate = dateRange.to ? new Date(dateRange.to) : null;

      const matchesDateRange =
        (!fromDate || visitDate >= fromDate) &&
        (!toDate || visitDate <= toDate);

      return (
        matchesSearch &&
        matchesRegion &&
        matchesProduct &&
        matchesClient &&
        matchesDuration &&
        matchesReclamations &&
        matchesDateRange
      );
    });
  }, [
    visits,
    searchQuery,
    selectedRegion,
    selectedProduct,
    selectedClient,
    selectedDuration,
    dateRange,
    hasReclamations,
  ]);

  const handleAddVisit = (completedVisit) => {
    const visitWithId = {
      ...completedVisit,
      id: visits.length + 1,
    };
    setVisits((prev) => [visitWithId, ...prev]);
  };

  const handleDeleteVisit = (visitId) => {
    setVisits((prev) => prev.filter((visit) => visit.id !== visitId));
  };

  const renderVisitCard = (visit) => (
    <div
      key={visit.id}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-primary-200 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {visit.client}
          </h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <MapPin className="h-4 w-4" />
            <span>{visit.region}</span>
            <span className="text-gray-300">·</span>
            <span>{visit.distance} km</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDeleteVisit(visit.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {format(visit.date, "EEEE d MMMM yyyy", { locale: fr })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {format(visit.date, "HH:mm")} · {visit.duration} min
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-1">
          {visit.products.map((product, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
            >
              {product}
            </div>
          ))}
        </div>

        {(visit.observations || visit.reclamations) && (
          <div className="mt-2 space-y-2">
            {visit.observations && (
              <div className="text-sm text-gray-600">{visit.observations}</div>
            )}
            {visit.reclamations && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <span>{visit.reclamations}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container max-w-2xl mx-auto p-4">
      {/* Search and Filters Header */}
      <div className="sticky top-16 bg-white border-b border-gray-200 p-4 shadow-sm z-10 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher une visite..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button
            variant="outline"
            className={`w-10 h-10 p-0 flex items-center justify-center ${
              showFilters ? "bg-primary-50 text-primary-600" : ""
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setIsNewVisitOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white w-10 h-10 p-0 flex items-center justify-center"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="space-y-3 pt-3 animate-in slide-in-from-top duration-200">
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Du</label>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, from: e.target.value }))
                  }
                  className="w-full bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Au</label>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, to: e.target.value }))
                  }
                  className="w-full bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <CustomSelect
                options={["Tous les clients", ...uniqueClients]}
                value={selectedClient}
                onChange={(value) => setSelectedClient(value)}
                placeholder="Client"
              />
              <CustomSelect
                options={["Toutes les régions", ...REGIONS]}
                value={selectedRegion}
                onChange={(value) => setSelectedRegion(value)}
                placeholder="Région"
              />
              <CustomSelect
                options={["Tous les produits", ...PRODUCTS]}
                value={selectedProduct}
                onChange={(value) => setSelectedProduct(value)}
                placeholder="Produit"
              />
            </div>

            <Button
              variant={hasReclamations ? "default" : "outline"}
              className={`w-full flex items-center justify-center gap-2 ${
                hasReclamations ? "bg-primary-600 text-white" : ""
              }`}
              onClick={() => setHasReclamations(!hasReclamations)}
            >
              <AlertCircle className="h-4 w-4" />
              Réclamations
            </Button>
          </div>
        )}
      </div>

      {/* Visits List */}
      <div className="mt-6 space-y-4">
        {filteredVisits.map(renderVisitCard)}

        {filteredVisits.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune visite trouvée
            </h3>
            <p className="text-gray-500">
              {searchQuery || showFilters
                ? "Aucune visite ne correspond à vos critères"
                : "Commencez par ajouter une nouvelle visite"}
            </p>
          </div>
        )}
      </div>

      {/* New Visit Dialog */}
      <NewVisitDialog
        open={isNewVisitOpen}
        onClose={() => setIsNewVisitOpen(false)}
        onSubmit={handleAddVisit}
      />
    </div>
  );
}