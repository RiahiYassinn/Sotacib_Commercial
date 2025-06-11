"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Map,
  ClipboardList,
  Users,
  BarChart2,
  LogOut,
  Menu,
} from "lucide-react";

const menuItems = [
  { icon: Map, label: "Carte", href: "/map" },
  { icon: ClipboardList, label: "Visites", href: "/visits" },
  { icon: Users, label: "Points de vente", href: "/clients" },
  { icon: BarChart2, label: "Statistiques", href: "/statistics" },
];

const authPages = ["/login/", "/register/"];

export default function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const isAuthPage = authPages.includes(pathname);

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getPageTitle = () => {
    const currentPath = pathname.split("/")[1];
    switch (currentPath) {
      case "map":
        return "Carte";
      case "visits":
        return "Visites";
      case "clients":
        return "Points de ventes";
      case "statistics":
        return "Statistiques";
      default:
        return "SOTACIB";
    }
  };

  const handleMenuItemClick = (href) => {
    router.push(href);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isOpen) return;
      if (menuButtonRef.current?.contains(event.target)) return;
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with blur effect */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Blur backdrop for content above header */}
        <div className="absolute inset-x-0 -top-10 h-10 bg-white/80 backdrop-blur-md" />

        {/* Header content */}
        <div className="relative h-16 bg-white shadow-sm flex items-center px-4 backdrop-blur-md bg-white/80">
          <div className="flex-none w-10">
            {!isAuthPage && (
              <button
                ref={menuButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>
          <div className="flex-none w-10"></div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href + '/';
              return (
                <button
                  key={item.href}
                  onClick={() => handleMenuItemClick(item.href)}
                  className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                    isActive ? "bg-primary-50 text-primary-600 font-medium" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-primary-600" : "text-gray-400"
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 w-full"
            >
              <LogOut className="w-5 h-5 mr-3 text-gray-400" />
              Déconnexion
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div className="container mx-auto p-4">{children}</div>
      </main>
    </div>
  );
}
