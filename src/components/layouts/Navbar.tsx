
"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const destinations = [
  { title: "COX'S BAZAR", image: "/coxs-bazar.jpg" },
  { title: "SREEMANGAL", image: "/srimangal.jpg" },
  { title: "SUNDARBANS", image: "/sundarbans.jpg" },
];

export default function Navbar() {
  const [active, setActive] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % destinations.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background */}
      <img
        src="/hero-beach.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Navbar (unchanged) */}
      <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-white text-xl font-bold">
          <div className="border-2 border-white p-2 rounded"><MapPin /></div>
            Explore<span className="text-yellow-400">BD</span>
        </div>

        <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 w-[400px]">
          <Search className="text-white mr-2" size={18} />
          <input
            type="text"
            placeholder="Search your Destination..."
            className="bg-transparent outline-none text-white placeholder:text-white/70 w-full"
          />
        </div>

        <div className="hidden md:flex gap-8 text-white">
          <a href="#">News</a>
          <a href="#">Destination</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>

        <button className="bg-yellow-400 px-6 py-2 rounded font-semibold">
          Login
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-20">

        {/* Left text same */}
        <div className="max-w-xl text-white">
          <h1 className="text-6xl font-extrabold mb-6">
            {destinations[active].title}
          </h1>
          <p className="text-white/80 leading-relaxed mb-8">
            Cox's Bazar is a city, fishing port, tourism centre and district
            headquarters in southeastern Bangladesh. It is famous mostly for
            its long natural sandy beach...
          </p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold">
            Booking →
          </button>
        </div>

        {/* 🔥 Carousel Cards */}
        <div className="relative w-[500px] h-[350px] flex items-center justify-center">

          {destinations.map((item, index) => {
            const position =
              index === active
                ? "center"
                : index === (active + 1) % destinations.length
                ? "right"
                : "left";

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out rounded-3xl overflow-hidden cursor-pointer
                ${
                  position === "center"
                    ? "w-[180px] h-[330px] scale-110 z-20 border-4 border-yellow-400"
                    : "w-[140px] h-[280px] scale-95 blur-[2px] opacity-60 z-10"
                }
                ${
                  position === "left"
                    ? "-translate-x-60"
                    : position === "right"
                    ? "translate-x-60"
                    : "translate-x-0"
                }
                `}
                onClick={() => setActive(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 text-white text-xl font-bold">
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slider buttons */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-20">
        <button
          onClick={prevSlide}
          className="bg-white rounded-full p-3"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="bg-white rounded-full p-3"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}