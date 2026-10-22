import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Phone, CheckCircle, ArrowRight } from 'lucide-react'
import type { Pitch } from '../../types'

interface PitchCardProps {
  pitch: Pitch
}

export const PitchCard: React.FC<PitchCardProps> = ({ pitch }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group">
      {/* Thumbnail */}
      <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
        <img
          src={pitch.image}
          alt={pitch.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pitch.types.map((type) => (
            <span
              key={type}
              className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-sm"
            >
              {type}
            </span>
          ))}
          {pitch.isFeatured && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-sm">
              Nổi bật
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm text-xs font-bold text-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{pitch.rating}</span>
          <span className="text-slate-400 font-normal">({pitch.reviewCount})</span>
        </div>

        {/* Price Tag in Thumbnail bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md font-semibold text-emerald-300">
            {pitch.priceRange}
          </span>
        </div>
      </div>

      {/* Body content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link to={`/chi-tiet-san/${pitch.id}`}>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {pitch.name}
            </h3>
          </Link>

          <p className="flex items-start gap-1.5 text-xs text-slate-500 mt-1 line-clamp-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{pitch.address}</span>
          </p>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5">
          {pitch.amenities.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
            >
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              {item}
            </span>
          ))}
          {pitch.amenities.length > 3 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{pitch.amenities.length - 3} tiện ích
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={`tel:${pitch.phone.replace(/\s+/g, '')}`}
            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
            title={`Gọi ${pitch.phone}`}
          >
            <Phone className="w-4 h-4" />
          </a>

          <Link
            to={`/chi-tiet-san/${pitch.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <span>Đặt sân & Xem giờ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
