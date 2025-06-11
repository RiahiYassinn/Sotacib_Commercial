import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import LocationDetailsDialog from "./LocationDetailsDialog";
import { Plus, X, Layers } from "lucide-react";
import Legend from "./Legend";

function ChangeMapView({ position }) {
  const map = useMap();
  map.setView([position.lat, position.lng], 13);
  return null;
}

function MapClickHandler({ isAddingLocation, onMapClick }) {
  const map = useMap();

  useEffect(() => {
    if (isAddingLocation) {
      map.on("click", onMapClick);
    } else {
      map.off("click", onMapClick);
    }

    return () => {
      map.off("click", onMapClick);
    };
  }, [isAddingLocation, map, onMapClick]);

  return null;
}

const getCustomIcon = (pinType = "green") => {
  return L.icon({
    iconUrl: `/images/pin-${pinType}.png`,
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });
};

export default function MapComponent({
  position = { lat: 36.8967, lng: 10.1932 },
  onLocationSelect,
  customPins,
  setCustomPins,
  isPositionClicked = false,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (selectedLocation) {
      const updatedPin = customPins.find(
        (pin) =>
          pin.latitude === selectedLocation.latitude &&
          pin.longitude === selectedLocation.longitude
      );
      if (updatedPin) {
        setSelectedLocation(updatedPin);
      }
    }
  }, [customPins]);

  const currentPositionIcon = L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative">
        <div class="ping-animation"></div>
        <div class="static-dot"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const handleCustomPinClick = (pin) => {
    setSelectedLocation({
      ...pin,
      visits: pin.visits || [],
      description: pin.description || `Client: ${pin.name}`,
      hours: {
        weekdays: "Sur rendez-vous",
        saturday: "Sur rendez-vous",
        sunday: "Fermé",
      },
    });
    setDialogOpen(true);
  };

  const CIRCLE_RADIUS = 1000;
  const CLICK_RADIUS = 1000;

  const handleMapClick = (e) => {
    if (!isAddingLocation) return;

    const clickedPoint = e.latlng;
    const centerPoint = L.latLng(position.lat, position.lng);
    const distanceInMeters = clickedPoint.distanceTo(centerPoint);

    if (distanceInMeters > CLICK_RADIUS) {
      console.log("Click outside radius, ignoring...");
      return;
    }

    const newLocation = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };
    onLocationSelect?.(newLocation);
    setIsAddingLocation(false);
  };

  const determinePinType = (pin) => {
    if (pin.firstVisit && pin.firstVisit.products) {
      const hasSKProduct = pin.firstVisit.products.some(
        (p) => p.cimenterie === "SK"
      );
      return hasSKProduct ? "green" : "red";
    }
    return "red";
  };

  return (
    <div className="relative">
      <style>
        {`
          .ping-animation {
            position: absolute;
            width: 12px;
            height: 12px;
            background: rgb(255, 0, 0, 0.5);
            border-radius: 50%;
            animation: pulse 1.5s infinite;
          }
          .static-dot {
            position: absolute;
            width: 12px;
            height: 12px;
            background: #ff0000;
            border-radius: 50%;
          }
          @keyframes pulse {
            0% {
              transform: scale(0.8);
              opacity: 1;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
        `}
      </style>

      <MapContainer
        center={[position.lat, position.lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "85vh", width: "100%" }}
        className="rounded-xl shadow-lg"
      >
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isPositionClicked) return;
              setIsAddingLocation(!isAddingLocation);
            }}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors shadow-lg ${
              !isPositionClicked
                ? "bg-gray-400 cursor-not-allowed"
                : isAddingLocation
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isAddingLocation ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-gray-100 text-gray-700 transition-colors shadow-lg"
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current position marker and circle */}
        <Marker
          position={[position.lat, position.lng]}
          icon={currentPositionIcon}
        >
          <Popup>
            <div className="text-sm">
              <strong>Position actuelle</strong>
              <br />
              Lat: {position.lat.toFixed(4)}
              <br />
              Lng: {position.lng.toFixed(4)}
            </div>
          </Popup>
        </Marker>

        {isPositionClicked && (
          <Circle
            center={[position.lat, position.lng]}
            radius={CIRCLE_RADIUS}
            pathOptions={{
              fillColor: "#3b82f6",
              fillOpacity: 0.2,
              color: "#2563eb",
              weight: 2,
            }}
          />
        )}

        {customPins.map((pin, index) => (
          <Marker
            key={index}
            position={[parseFloat(pin.latitude), parseFloat(pin.longitude)]}
            icon={getCustomIcon(determinePinType(pin))}
            eventHandlers={{
              click: () => handleCustomPinClick(pin),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{pin.name}</strong>
              </div>
            </Popup>
          </Marker>
        ))}

        <ChangeMapView position={position} />
        <MapClickHandler
          isAddingLocation={isAddingLocation}
          onMapClick={handleMapClick}
        />

        {showLegend && <Legend />}
      </MapContainer>

      <LocationDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        location={selectedLocation}
        customPins={customPins}
        setCustomPins={setCustomPins}
      />
    </div>
  );
}