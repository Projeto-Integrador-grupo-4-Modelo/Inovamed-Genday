import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  LineChart,
} from "lucide-react";

const features = [
  {
    title: "Inova Med",
    description: "Simplificando sua gestão, potencializando seu atendimento.",
    image: "https://i.imgur.com/10wLWO0.png",
    icon: Activity,
  },
  {
    title: "Gestão Eficiente de Consultas",
    description:
      "Organize e gerencie consultas médicas com facilidade. Agende, reagende e acompanhe todos os compromissos em um só lugar.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1920",
    icon: Calendar,
  },
  {
    title: "Análise de Indicadores",
    description:
      "Tome decisões baseadas em dados com nossa análise completa de indicadores de performance da clínica.",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1920",
    icon: LineChart,
  },
  {
    title: "Monitoramento em Tempo Real",
    description:
      "Acompanhe o desempenho da sua clínica em tempo real, com métricas e indicadores atualizados instantaneamente.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920",
    icon: Activity,
  },
];

export function Carrossel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const Feature = features[currentSlide];
  const Icon = Feature.icon;

  return (
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <img
          src={Feature.image}
          alt={Feature.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Icon className="h-8 w-8" />
              <h2 className="text-3xl font-bold">{Feature.title}</h2>
            </div>
            <p className="text-lg mb-6">{Feature.description}</p>
            <div className="flex space-x-4"></div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <div className="flex space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
export default Carrossel;
