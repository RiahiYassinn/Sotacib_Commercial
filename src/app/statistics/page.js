"use client";

import React, { useState } from "react";
import CommandCenter from "../components/statistics/CommandCenter";
import RegionalAnalysis from "../components/statistics/RegionalAnalysis";
import CommercialPerformance from "../components/statistics/CommercialPerformance";

export default function StatisticsPage() {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderBackButton = () => (
    <div className="sticky top-0 bg-white border-b p-4 z-10">
      <button
        onClick={() => setCurrentView("dashboard")}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        ← Retour au tableau de bord
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "dashboard" && (
        <CommandCenter
          onRegionalClick={() => setCurrentView("regional")}
          onPerformanceClick={() => setCurrentView("performance")}
        />
      )}
      {currentView === "regional" && (
        <div>
          {renderBackButton()}
          <RegionalAnalysis />
        </div>
      )}
      {currentView === "performance" && (
        <div>
          {renderBackButton()}
          <CommercialPerformance />
        </div>
      )}
    </div>
  );
}