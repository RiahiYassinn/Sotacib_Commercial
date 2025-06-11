"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Mail,
  Phone,
  Edit,
  Trash,
  User,
  Building2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NewClientDialog from "../components/clients/NewClientDialog";

const mockClients = [
  {
    id: 1,
    name: "Comptoir Hammami",
    responsible: "Mohamed Hammami",
    email: "contact@comptoir-hammami.com",
    phone: "50350392",
    address: "123 Rue de Tunis",
    distance: 0.8,
    lastVisit: "2024-12-05",
    totalVisits: 12,
  },
  {
    id: 2,
    name: "COMAF",
    responsible: "Ahmed Ben Abdelafou",
    email: "info@comaf.tn",
    phone: "20054540",
    address: "456 Avenue de Carthage",
    distance: 1.2,
    lastVisit: "2024-12-07",
    totalVisits: 8,
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  const handleAddClient = (newClient) => {
    setClients((prev) => [
      ...prev,
      {
        ...newClient,
        id: prev.length + 1,
        lastVisit: null,
        totalVisits: 0,
      },
    ]);
  };

  const handleEditClient = (updatedClient) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === updatedClient.id
          ? {
              ...updatedClient,
              lastVisit: client.lastVisit,
              totalVisits: client.totalVisits,
            }
          : client
      )
    );
    setEditingClient(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients((prev) => prev.filter((client) => client.id !== clientId));
  };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      {/* Header with search and add button */}
      <div className="sticky top-16 bg-white border-b border-gray-200 p-4 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher un client..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button
            onClick={() => setShowNewClientDialog(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white w-10 h-10 p-0 flex items-center justify-center"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Clients List */}
      <div className="mt-6 space-y-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:border-primary-200 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {client.name}
                  </h3>
                  {client.lastVisit && (
                    <span className="text-xs text-gray-500">
                      Dernière visite:{" "}
                      {new Date(client.lastVisit).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {client.responsible}
                  </span>
                  {client.totalVisits > 0 && (
                    <span className="text-xs text-gray-500">
                      · {client.totalVisits} visites
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingClient(client)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-2 h-auto"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClient(client.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-auto"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${client.email}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {client.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${client.phone}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {client.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 sm:col-span-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{client.address}</span>
                <span className="ml-auto text-sm text-gray-400">
                  {client.distance.toFixed(1)} km
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun client trouvé
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? "Aucun client ne correspond à votre recherche"
                : "Commencez par ajouter un nouveau client"}
            </p>
          </div>
        )}
      </div>

      {/* New/Edit Client Dialog */}
      <NewClientDialog
        open={showNewClientDialog || !!editingClient}
        onClose={() => {
          setShowNewClientDialog(false);
          setEditingClient(null);
        }}
        onSubmit={editingClient ? handleEditClient : handleAddClient}
        initialData={editingClient}
      />
    </div>
  );
}