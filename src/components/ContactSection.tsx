import { Clock, MapPin, Phone } from 'lucide-react'
import { restaurantDetails } from '../data/restaurant'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full max-w-full bg-stone-950 px-4 py-14 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl min-w-0 gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[0.18em] text-amber-200 uppercase sm:text-sm sm:tracking-[0.2em]">
            Visit us
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-4xl">
            {restaurantDetails.name}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-stone-300">
            We are ready for dine-in, pickup, and WhatsApp orders during opening
            hours.
          </p>
        </div>

        <div className="grid min-w-0 gap-3 sm:grid-cols-3">
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-4">
            <MapPin className="h-6 w-6 text-amber-200" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-white">Address</h3>
            <p className="mt-1 text-sm text-stone-300">
              {restaurantDetails.address}
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-4">
            <Phone className="h-6 w-6 text-amber-200" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-white">Phone</h3>
            <p className="mt-1 text-sm text-stone-300">
              {restaurantDetails.phone}
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/5 p-4">
            <Clock className="h-6 w-6 text-amber-200" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-white">Opening Hours</h3>
            <p className="mt-1 text-sm text-stone-300">
              {restaurantDetails.openingHours}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
