"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  TrendingUp,
  MapPin,
  Activity,
  Users,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
};

const CommandCenter = ({ onRegionalClick, onPerformanceClick }) => {
  const visitCount = useCounter(1234);
  const marketShare = useCounter(23);

  const metrics = [
    {
      title: "Visites Aujourd'hui",
      value: visitCount,
      trend: "+12%",
      isPositive: true,
      icon: Activity,
      color: "bg-blue-500",
    },
    {
      title: "Part de Marché",
      value: `${marketShare}%`,
      trend: "+2.3%",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Points de Vente",
      value: "89",
      trend: "+5",
      isPositive: true,
      icon: MapPin,
      color: "bg-indigo-500",
    },
    {
      title: "Commerciaux Actifs",
      value: "12",
      trend: "En ligne",
      isPositive: true,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

 return (
   <div className="min-h-screen bg-white">
     <motion.div
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       className="relative p-6"
     >
       <div className="flex justify-between items-center mb-8">
         <p className="text-gray-500">
           {format(new Date(), "EEEE d MMMM yyyy", {
             locale: fr,
           }).toUpperCase()}
         </p>
         <motion.div
           className="flex items-center gap-3"
           whileHover={{ scale: 1.02 }}
         >
           <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
           <span className="text-sm text-gray-500">Données en temps réel</span>
         </motion.div>
       </div>

       {/* Metrics Grid */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         {metrics.map((metric, index) => (
           <motion.div
             key={metric.title}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
             className="relative group"
           >
             <div className="relative rounded-xl bg-white shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-2">
                 <div
                   className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}
                 >
                   <metric.icon
                     className={`h-5 w-5 ${metric.color.replace(
                       "bg-",
                       "text-"
                     )}`}
                   />
                 </div>
                 <motion.div
                   className="flex items-center gap-1 text-sm"
                   initial={{ opacity: 0.8 }}
                   whileHover={{ opacity: 1 }}
                 >
                   {metric.isPositive ? (
                     <ArrowUpRight className="h-4 w-4 text-green-600" />
                   ) : (
                     <ArrowDownRight className="h-4 w-4 text-red-600" />
                   )}
                   <span
                     className={
                       metric.isPositive ? "text-green-600" : "text-red-600"
                     }
                   >
                     {metric.trend}
                   </span>
                 </motion.div>
               </div>

               <div className="space-y-1">
                 <h3 className="text-gray-600 text-sm font-medium">
                   {metric.title}
                 </h3>
                 <p className="text-2xl font-bold text-gray-900 tracking-tight">
                   {metric.value}
                 </p>
               </div>
             </div>
           </motion.div>
         ))}
       </div>

       {/* Alerts Section */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-8"
       >
         <div className="bg-white border border-red-100 rounded-xl p-4 shadow-sm">
           <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-red-50">
               <AlertTriangle className="h-5 w-5 text-red-500" />
             </div>
             <div>
               <h3 className="text-red-600 font-medium">Points d'attention</h3>
               <p className="text-sm text-gray-600">
                 3 zones nécessitent votre attention
               </p>
             </div>
           </div>
         </div>
       </motion.div>

       {/* Main Features */}
       <motion.div
         className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5 }}
       >
         <div
           onClick={onRegionalClick}
           className="bg-white border border-gray-100 rounded-xl p-6 cursor-pointer group relative shadow-sm hover:shadow-md transition-shadow"
         >
           <div className="relative z-10">
             <h3 className="text-lg font-medium text-gray-900 mb-2">
               Analyse Régionale
             </h3>
             <p className="text-sm text-gray-600 mb-4">
               Explorer la performance par région
             </p>
             <motion.button
               whileHover={{ x: 5 }}
               className="flex items-center gap-2 text-blue-600"
             >
               Explorer <ChevronRight className="h-4 w-4" />
             </motion.button>
           </div>
         </div>

         <div
           onClick={onPerformanceClick}
           className="bg-white border border-gray-100 rounded-xl p-6 cursor-pointer group relative shadow-sm hover:shadow-md transition-shadow"
         >
           <div className="relative z-10">
             <h3 className="text-lg font-medium text-gray-900 mb-2">
               Performance Commerciale
             </h3>
             <p className="text-sm text-gray-600 mb-4">
               Analyser l'activité des commerciaux
             </p>
             <motion.button
               whileHover={{ x: 5 }}
               className="flex items-center gap-2 text-blue-600"
             >
               Explorer <ChevronRight className="h-4 w-4" />
             </motion.button>
           </div>
         </div>
       </motion.div>

       {/* Real-time Activity Stream */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.7 }}
         className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
       >
         <h3 className="text-lg font-medium text-gray-900 mb-4">
           Activité en temps réel
         </h3>
         <div className="space-y-4">
           {[1, 2, 3].map((_, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: index * 0.1 }}
               className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
             >
               <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
               <div className="flex-1">
                 <p className="text-gray-900 text-sm">
                   Commercial #{index + 1} en visite
                 </p>
                 <p className="text-xs text-gray-600">
                   Point de vente: Location {index + 1}
                 </p>
               </div>
               <span className="text-xs text-gray-500">il y a 2min</span>
             </motion.div>
           ))}
         </div>
       </motion.div>
     </motion.div>
   </div>
 );
};

export default CommandCenter;
