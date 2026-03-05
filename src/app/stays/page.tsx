'use client'

import Image from "next/image"

const stays = [
  {
    id: 1,
    title: "Light bright airy stylish apt & safe peaceful stay",
    image: "/coxs-bazar.jpg",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.9,
    reviews: 20,
    price: 34
  },
  {
    id: 2,
    title: "Apartment in Lost Panorama",
    image: "/coxs-bazar.jpg",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.8,
    reviews: 10,
    price: 52
  },
  {
    id: 3,
    title: "AR Lounge & Pool (r&r + b&b)",
    image: "/coxs-bazar.jpg",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.9,
    reviews: 25,
    price: 44
  }
]

export default function StaysPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <p className="text-sm text-gray-500 mb-1">
        252 stays Apr 13-17 3 guests
      </p>

      <h1 className="text-2xl font-semibold mb-6">
        Stay in Cox’s Bazar
      </h1>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT SIDE LISTINGS */}
        <div className="col-span-7 space-y-6">

          {stays.map((stay) => (

            <div
              key={stay.id}
              className="flex gap-4 border-b pb-6"
            >

              <Image
                src={stay.image}
                alt={stay.title}
                width={300}
                height={200}
                className="rounded-lg object-cover w-[220px] h-[160px]"
              />

              <div className="flex flex-col justify-between">

                <div>
                  <h3 className="font-medium text-lg">
                    {stay.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {stay.guests} guests · {stay.bedrooms} bedrooms · {stay.beds} beds · {stay.baths} baths
                  </p>

                  <p className="text-sm text-gray-500">
                    Wifi Air conditioning Kitchen
                  </p>

                  <p className="text-sm text-gray-500">
                    Cancellation flexibility available
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">

                  <p className="text-sm">
                    ⭐ {stay.rating} ({stay.reviews})
                  </p>

                  <p className="font-semibold">
                    ${stay.price}
                    <span className="text-gray-500 text-sm">
                      /night
                    </span>
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* RIGHT SIDE MAP */}
        <div className="col-span-5">

          <div className="sticky top-6 h-[600px] rounded-xl overflow-hidden">

            <iframe
              src="https://maps.google.com/maps?q=cox%20bazar&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />

          </div>

        </div>

      </div>

    </div>
  )
}