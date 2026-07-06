import React from 'react'
import { MapPin, Phone, ExternalLink } from 'lucide-react'

interface Location {
  name?: string
  address?: string
  phone?: string
  mapLocation?: string
  id?: string
}

interface LocationsBlockProps {
  heading?: string
  description?: string
  locations?: Location[]
}

export function LocationsBlock({ heading, description, locations = [] }: LocationsBlockProps) {
  return (
    <section className="bg-[#fefccf] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {(heading || description) && (
          <div className="text-center mb-14">
            {heading && (
              <h2 className="font-heading text-3xl md:text-4xl text-[#1a0d05] mb-3">{heading}</h2>
            )}
            {description && (
              <p className="font-body text-base text-[#6b5a4e] max-w-lg mx-auto">{description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="bg-white border border-[#755b00]/10 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Map placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#755b00]/8 to-[#944925]/8 flex items-center justify-center border-b border-[#755b00]/10 relative">
                <MapPin size={32} className="text-[#755b00]/30" />
                {loc.mapLocation && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapLocation)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 flex items-center gap-1 font-body text-xs text-[#755b00] hover:text-[#944925] transition-colors"
                  >
                    Open in Maps
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-heading text-xl text-[#1a0d05] mb-4">{loc.name}</h3>

                {loc.address && (
                  <div className="flex gap-3 mb-3">
                    <MapPin size={16} className="text-[#944925] shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-[#2c1810]/75 leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                )}

                {loc.phone && (
                  <div className="flex gap-3">
                    <Phone size={16} className="text-[#944925] shrink-0 mt-0.5" />
                    <a
                      href={`tel:${loc.phone}`}
                      className="font-body text-sm text-[#2c1810]/75 hover:text-[#944925] transition-colors"
                    >
                      {loc.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
