import Image from "next/image";

export default function Legend() {
  const legendItems = [
    { icon: "/images/pin-green.png", label: "Clients actifs" },
    { icon: "/images/pin-blue.png", label: "Inactifs" },
    { icon: "/images/pin-red.png", label: "Prospects" },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200">
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Image
              src={item.icon}
              alt={item.label}
              width={20}
              height={48}
              className="object-contain"
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}