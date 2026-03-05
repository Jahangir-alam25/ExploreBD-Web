'use client'

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tours = [
  {
    id: 1,
    title: "Cox's Bazar Sea Beach Tour",
    slug: "coxs-bazar-tour",
    location: "Cox's Bazar",
    duration: "3 Days 2 Nights",
    price: 120,
    image: "/images/coxs.jpg"
  },
  {
    id: 2,
    title: "Sajek Valley Adventure",
    slug: "sajek-valley-tour",
    location: "Rangamati",
    duration: "2 Days 1 Night",
    price: 90,
    image: "/images/sajek.jpg"
  },
  {
    id: 3,
    title: "Sundarbans Wildlife Tour",
    slug: "sundarbans-tour",
    location: "Khulna",
    duration: "3 Days",
    price: 150,
    image: "/images/sundarbans.jpg"
  },
  {
    id: 4,
    title: "Saint Martin Island Trip",
    slug: "saint-martin-tour",
    location: "Cox's Bazar",
    duration: "2 Days",
    price: 110,
    image: "/images/saintmartin.jpg"
  }
]

export default function AllToursPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        All Tour Packages
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {tours.map((tour) => (

          <Card key={tour.id} className="overflow-hidden">

            <Image
              src={tour.image}
              alt={tour.title}
              width={400}
              height={250}
              className="w-full h-[200px] object-cover"
            />

            <CardContent className="p-4 space-y-2">

              <h2 className="text-lg font-semibold">
                {tour.title}
              </h2>

              <p className="text-sm text-gray-500">
                📍 {tour.location}
              </p>

              <p className="text-sm">
                ⏳ {tour.duration}
              </p>

              <p className="font-semibold text-blue-600">
                ${tour.price}
              </p>

              <div className="flex gap-3 pt-2">

                <Link href={`/tours/${tour.slug}`}>
                  <Button variant="outline">
                    Details
                  </Button>
                </Link>

                <Link href={`/book/${tour.slug}`}>
                  <Button>
                    Book Now
                  </Button>
                </Link>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  )
}