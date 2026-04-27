import { Clock, MapPin, Phone } from 'lucide-react'
import { restaurantDetails } from '../data/restaurant'

const heroImage =
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=85'

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[62vh] items-end overflow-hidden bg-stone-950 px-4 py-10 text-white sm:px-6 lg:px-8"
    >
      <img
        src={heroImage}
        alt="Restaurant table with freshly prepared dishes"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/20" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl pb-4">
          <p className="mb-3 text-sm font-semibold tracking-[0.24em] text-amber-200 uppercase">
            Freshly prepared every day
          </p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {restaurantDetails.name} Menu
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-100 sm:text-lg">
            Browse chef-selected dishes, build your order, and send it straight
            to us on WhatsApp.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-lg bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-800"
            >
              View Menu
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Contact
            </a>
          </div>
        </div>

        <dl className="grid gap-3 border-t border-white/20 pt-5 text-sm text-stone-100 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-200" aria-hidden="true" />
            <div>
              <dt className="font-semibold text-white">Hours</dt>
              <dd>{restaurantDetails.openingHours}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-amber-200" aria-hidden="true" />
            <div>
              <dt className="font-semibold text-white">Phone</dt>
              <dd>{restaurantDetails.phone}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-amber-200" aria-hidden="true" />
            <div>
              <dt className="font-semibold text-white">Address</dt>
              <dd>{restaurantDetails.address}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  )
}
