"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  Building2,
  AlertCircle,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CIMENTERIES = {
  SK: "SOTACIB KAIROUAN",
  SCB: "LES CIMENTS DE BIZERTE",
  CAT: "CIMENT ARTIFICIEL TUNISIEN",
  CC: "CARTHAGE CEMENT",
  CJO: "CIMENT JBEL OUST",
  SCE: "SOCIETE DE CIMENT ENFIDHA",
  SCG: "SOCIETE DE CIMENT GABES",
  CIOK: "LES CIMENTS D'OUM EL KELLIL",
};

const PRODUCTS = ["CEM 42,5", "CEM || 32,5", "CEM 42,5 SR-3", "CHAUX"];

const REGIONS_DATA = {
  north: {
    title: "Nord",
    regions: [
      {
        id: "tunis",
        name: "Tunis",
        value: 85,
        trend: "+8%",
        visits: 156,
        marketShare: 32,
        competitors: [
          { name: "SCB", presence: true, mainProduct: "CEM 42,5", price: 182 },
          {
            name: "CAT",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 175,
          },
          { name: "CC", presence: true, mainProduct: "CEM 42,5", price: 178 },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 180,
            avgCompetitorPrice: 178,
            marketShare: 35,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 165,
            avgCompetitorPrice: 170,
            marketShare: 42,
          },
          {
            type: "CEM 42,5 SR-3",
            ourPrice: 195,
            avgCompetitorPrice: 192,
            marketShare: 28,
          },
        ],
        potentialClients: 42,
        activeClients: 35,
      },
      {
        id: "ariana",
        name: "Ariana",
        value: 78,
        trend: "+12%",
        visits: 132,
        marketShare: 28,
        competitors: [
          { name: "SCB", presence: true, mainProduct: "CEM 42,5", price: 181 },
          {
            name: "CC",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 176,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 179,
            avgCompetitorPrice: 181,
            marketShare: 38,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 168,
            avgCompetitorPrice: 172,
            marketShare: 45,
          },
        ],
        potentialClients: 38,
        activeClients: 29,
      },
      {
        id: "bizerte",
        name: "Bizerte",
        value: 72,
        trend: "+5%",
        visits: 98,
        marketShare: 25,
        competitors: [
          { name: "SCB", presence: true, mainProduct: "CEM 42,5", price: 179 },
          {
            name: "CAT",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 172,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 178,
            avgCompetitorPrice: 179,
            marketShare: 32,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 166,
            avgCompetitorPrice: 169,
            marketShare: 38,
          },
        ],
        potentialClients: 35,
        activeClients: 28,
      },
    ],
  },
  center: {
    title: "Centre",
    regions: [
      {
        id: "sousse",
        name: "Sousse",
        value: 92,
        trend: "+15%",
        visits: 178,
        marketShare: 45,
        competitors: [
          { name: "SCE", presence: true, mainProduct: "CEM 42,5", price: 180 },
          {
            name: "CJO",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 174,
          },
          { name: "CC", presence: true, mainProduct: "CEM 42,5", price: 177 },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 176,
            avgCompetitorPrice: 178,
            marketShare: 48,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 162,
            avgCompetitorPrice: 168,
            marketShare: 52,
          },
          {
            type: "CHAUX",
            ourPrice: 145,
            avgCompetitorPrice: 148,
            marketShare: 40,
          },
        ],
        potentialClients: 45,
        activeClients: 41,
      },
      {
        id: "monastir",
        name: "Monastir",
        value: 88,
        trend: "+10%",
        visits: 145,
        marketShare: 42,
        competitors: [
          { name: "SCE", presence: true, mainProduct: "CEM 42,5", price: 179 },
          {
            name: "CJO",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 173,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 175,
            avgCompetitorPrice: 177,
            marketShare: 45,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 164,
            avgCompetitorPrice: 169,
            marketShare: 48,
          },
        ],
        potentialClients: 38,
        activeClients: 34,
      },
      {
        id: "kairouan",
        name: "Kairouan",
        value: 95,
        trend: "+18%",
        visits: 195,
        marketShare: 58,
        competitors: [
          { name: "SCE", presence: true, mainProduct: "CEM 42,5", price: 182 },
          {
            name: "CJO",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 175,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 174,
            avgCompetitorPrice: 180,
            marketShare: 62,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 160,
            avgCompetitorPrice: 168,
            marketShare: 65,
          },
          {
            type: "CHAUX",
            ourPrice: 142,
            avgCompetitorPrice: 146,
            marketShare: 55,
          },
        ],
        potentialClients: 48,
        activeClients: 45,
      },
      {
        id: "mahdia",
        name: "Mahdia",
        value: 82,
        trend: "+8%",
        visits: 125,
        marketShare: 38,
        competitors: [
          { name: "SCE", presence: true, mainProduct: "CEM 42,5", price: 178 },
          {
            name: "CC",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 172,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 176,
            avgCompetitorPrice: 178,
            marketShare: 42,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 165,
            avgCompetitorPrice: 170,
            marketShare: 45,
          },
        ],
        potentialClients: 32,
        activeClients: 28,
      },
    ],
  },
  south: {
    title: "Sud",
    regions: [
      {
        id: "sfax",
        name: "Sfax",
        value: 75,
        trend: "+6%",
        visits: 112,
        marketShare: 28,
        competitors: [
          { name: "SCG", presence: true, mainProduct: "CEM 42,5", price: 176 },
          {
            name: "CIOK",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 170,
          },
          { name: "CC", presence: true, mainProduct: "CEM 42,5", price: 175 },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 178,
            avgCompetitorPrice: 175,
            marketShare: 25,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 166,
            avgCompetitorPrice: 168,
            marketShare: 30,
          },
        ],
        potentialClients: 52,
        activeClients: 38,
      },
      {
        id: "gabes",
        name: "Gabès",
        value: 68,
        trend: "+4%",
        visits: 95,
        marketShare: 22,
        competitors: [
          { name: "SCG", presence: true, mainProduct: "CEM 42,5", price: 174 },
          {
            name: "CIOK",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 168,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 177,
            avgCompetitorPrice: 174,
            marketShare: 20,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 165,
            avgCompetitorPrice: 167,
            marketShare: 25,
          },
        ],
        potentialClients: 45,
        activeClients: 32,
      },
      {
        id: "medenine",
        name: "Médenine",
        value: 62,
        trend: "+2%",
        visits: 85,
        marketShare: 18,
        competitors: [
          { name: "SCG", presence: true, mainProduct: "CEM 42,5", price: 175 },
          {
            name: "CIOK",
            presence: true,
            mainProduct: "CEM || 32,5",
            price: 169,
          },
        ],
        products: [
          {
            type: "CEM 42,5",
            ourPrice: 178,
            avgCompetitorPrice: 175,
            marketShare: 15,
          },
          {
            type: "CEM || 32,5",
            ourPrice: 167,
            avgCompetitorPrice: 168,
            marketShare: 20,
          },
        ],
        potentialClients: 42,
        activeClients: 28,
      },
    ],
  },
};

const RegionalAnalysis = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [expandedRegions, setExpandedRegions] = useState({});
  const [expandedMetrics, setExpandedMetrics] = useState({});

  const toggleRegionExpand = (regionId) => {
    setExpandedMetrics((prev) => ({
      ...prev,
      [regionId]: !prev[regionId],
    }));
  };

  const getStatusColor = (value) => {
    if (value >= 70) return "bg-green-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const renderCompetitorAnalysis = (competitors) => (
    <div className="mt-4 bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Analyse Concurrentielle
      </h4>
      <div className="space-y-3">
        {competitors.map((competitor, index) => (
          <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">
                  {CIMENTERIES[competitor.name]}
                </div>
                <div className="text-sm text-gray-500">
                  Produit principal: {competitor.mainProduct}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">
                  {competitor.price} DT
                </div>
                <div className="text-sm text-gray-500">Prix moyen</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductAnalysis = (products) => (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Analyse des Prix par Produit
      </h4>
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">{product.type}</span>
              <span className="text-sm text-gray-500">
                Part de marché: {product.marketShare}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="text-sm text-gray-500">Notre Prix</div>
                <div className="font-medium text-gray-900">
                  {product.ourPrice} DT
                </div>
                <div className="text-xs text-gray-500">
                  {product.ourPrice < product.avgCompetitorPrice ? (
                    <span className="text-green-600">
                      -
                      {(product.avgCompetitorPrice - product.ourPrice).toFixed(
                        1
                      )}{" "}
                      DT vs concurrent
                    </span>
                  ) : (
                    <span className="text-red-600">
                      +
                      {(product.ourPrice - product.avgCompetitorPrice).toFixed(
                        1
                      )}{" "}
                      DT vs concurrent
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="text-sm text-gray-500">
                  Prix Moyen Concurrents
                </div>
                <div className="font-medium text-gray-900">
                  {product.avgCompetitorPrice} DT
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMetricsCard = (region) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{region.name}</h3>
          <div className="text-sm text-gray-500">
            {region.activeClients} clients actifs sur {region.potentialClients}{" "}
            potentiels
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${getStatusColor(
              region.marketShare
            )}`}
          />
          <span
            className={`text-sm ${
              region.trend.includes("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {region.trend}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Part de Marché</div>
          <div className="text-xl font-semibold text-gray-900">
            {region.marketShare}%
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Visites</div>
          <div className="text-xl font-semibold text-gray-900">
            {region.visits}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Concurrents</div>
          <div className="text-xl font-semibold text-gray-900">
            {region.competitors.length}
          </div>
        </div>
      </div>

      {expandedMetrics[region.id] && (
        <>
          {renderProductAnalysis(region.products)}
          {renderCompetitorAnalysis(region.competitors)}
        </>
      )}

      <button
        onClick={() => toggleRegionExpand(region.id)}
        className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        {expandedMetrics[region.id] ? "Voir moins" : "Voir plus"}
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${
            expandedMetrics[region.id] ? "rotate-180" : ""
          }`}
        />
      </button>
    </motion.div>
  );

  return (
    <div className="p-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-3 md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Performance Globale</h3>
              <p className="text-sm text-gray-500">Toutes régions confondues</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">67%</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>+5.2% vs mois dernier</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-3 md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-50">
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Points de Vente</h3>
              <p className="text-sm text-gray-500">Couverture nationale</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">234</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>+12 nouveaux</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-3 md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Zones Critiques</h3>
              <p className="text-sm text-gray-500">Nécessitant attention</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
          <div className="flex items-center gap-1 text-sm text-red-600">
            <ArrowUpRight className="h-4 w-4" />
            <span>+1 cette semaine</span>
          </div>
        </motion.div>
      </div>

      {/* Regions Grid */}
      <div className="space-y-6">
        {Object.entries(REGIONS_DATA).map(([key, zone]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <button
              onClick={() => setSelectedZone(selectedZone === key ? null : key)}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium text-gray-900">
                  {zone.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {zone.regions.length} régions
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transform transition-transform ${
                  selectedZone === key ? "rotate-180" : ""
                }`}
              />
            </button>

            {selectedZone === key && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-4"
              >
                {zone.regions.map((region) => (
                  <div key={region.id} className="pl-4">
                    {renderMetricsCard(region)}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RegionalAnalysis;
