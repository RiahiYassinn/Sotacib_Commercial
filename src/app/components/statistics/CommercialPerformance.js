"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
  Search,
  ChevronDown,
  Building2,
  Map,
  Timer,
  Activity,
} from "lucide-react";

const MOCK_AGENTS = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    visits: 145,
    visitsDuration: 42,
    coverage: 8,
    performance: 92,
    status: "online",
    recentActivity: [
      {
        date: "2024-12-07",
        visits: [
          {
            time: "09:15",
            client: "Point de Vente Alpha",
            duration: 45,
            products: ["CEM 42,5", "CEM || 32,5"],
          },
          {
            time: "11:00",
            client: "Dépôt Central Beta",
            duration: 35,
            products: ["CEM 42,5"],
          },
          {
            time: "14:30",
            client: "Magasin Delta",
            duration: 40,
            products: ["CHAUX", "CEM || 32,5"],
          },
        ],
        totalDistance: 75,
        regions: ["Sousse", "Monastir"],
      },
      {
        date: "2024-12-06",
        visits: [
          {
            time: "08:30",
            client: "Entrepôt Gamma",
            duration: 50,
            products: ["CEM 42,5 SR-3"],
          },
          {
            time: "10:45",
            client: "Centre Commercial Epsilon",
            duration: 30,
            products: ["CEM 42,5"],
          },
        ],
        totalDistance: 45,
        regions: ["Kairouan"],
      },
    ],
    monthlyStats: {
      totalClients: 48,
      newClients: 5,
      averageVisitDuration: 42,
      mostVisitedRegion: "Sousse",
      topProduct: "CEM 42,5",
      visitEfficiency: 94,
    },
  },
];

const CommercialPerformance = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("month");

  const renderAgentMetricsCard = (metric) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {metric.icon}
        <span className="text-sm text-gray-600">{metric.title}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
      <div
        className={`text-sm ${
          metric.highlight ? "text-green-600" : "text-gray-500"
        }`}
      >
        {metric.subtitle}
      </div>
    </div>
  );

  const renderAgentActivity = (activity) => (
    <div className="space-y-4">
      {activity.map((day, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-gray-900">
              {new Date(day.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-sm text-gray-500">
              {day.visits.length} visites · {day.totalDistance} km
            </div>
          </div>

          <div className="space-y-3">
            {day.visits.map((visit, vIndex) => (
              <div
                key={vIndex}
                className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="min-w-[60px] text-sm text-gray-500">
                  {visit.time}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {visit.client}
                  </div>
                  <div className="text-sm text-gray-500">
                    {visit.duration} min · {visit.products.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Régions visitées: {day.regions.join(", ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAgentPerformance = (agent) => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Visites",
            value: agent.visits,
            subtitle: "+12% ce mois",
            icon: <Calendar className="h-4 w-4 text-blue-500" />,
            highlight: true,
          },
          {
            title: "Durée Moyenne",
            value: `${agent.visitsDuration} min`,
            subtitle: "Efficace",
            icon: <Timer className="h-4 w-4 text-purple-500" />,
            highlight: true,
          },
          {
            title: "Zones Couvertes",
            value: agent.coverage,
            subtitle: `Sur 12 zones`,
            icon: <Map className="h-4 w-4 text-indigo-500" />,
            highlight: false,
          },
          {
            title: "Performance",
            value: `${agent.performance}%`,
            subtitle: "Excellent",
            icon: <Activity className="h-4 w-4 text-green-500" />,
            highlight: true,
          },
        ].map((metric, index) => (
          <div key={index}>{renderAgentMetricsCard(metric)}</div>
        ))}
      </div>

      {/* Monthly Performance Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Aperçu Mensuel
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Clients Totaux</div>
            <div className="text-xl font-semibold text-gray-900">
              {agent.monthlyStats.totalClients}
            </div>
            <div className="text-sm text-green-600">
              +{agent.monthlyStats.newClients} nouveaux
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Zone Principale</div>
            <div className="text-xl font-semibold text-gray-900">
              {agent.monthlyStats.mostVisitedRegion}
            </div>
            <div className="text-sm text-gray-500">45% des visites</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Produit Principal</div>
            <div className="text-xl font-semibold text-gray-900">
              {agent.monthlyStats.topProduct}
            </div>
            <div className="text-sm text-gray-500">38% des ventes</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Activité Récente
        </h4>
        {renderAgentActivity(agent.recentActivity)}
      </div>
    </>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Performance Commerciale
          </h2>
          <p className="text-gray-500">Suivi des activités et performances</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un commercial..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
          </select>
        </div>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        {MOCK_AGENTS.filter((agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() =>
                setSelectedAgent(selectedAgent === agent.id ? null : agent.id)
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      agent.status === "online" ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span className="font-medium text-gray-900">
                    {agent.name}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transform transition-transform ${
                    selectedAgent === agent.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {selectedAgent === agent.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-100 p-4"
              >
                {renderAgentPerformance(agent)}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommercialPerformance;