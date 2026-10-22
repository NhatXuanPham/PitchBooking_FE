import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, Shield, Swords, CheckCircle2 } from 'lucide-react'
import type { MatchRequest } from '../../types'

interface MatchCardProps {
  match: MatchRequest
  onAcceptMatch?: (match: MatchRequest) => void
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onAcceptMatch }) => {
  const [accepted, setAccepted] = useState(match.status === 'matched')

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Yếu / Mới tập':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Trung bình yếu':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200'
      case 'Trung bình':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'Khá':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Bán chuyên':
        return 'bg-rose-100 text-rose-700 border-rose-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const handleAccept = () => {
    setAccepted(true)
    if (onAcceptMatch) {
      onAcceptMatch(match)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-white font-bold text-lg shadow-xs">
            {match.teamName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">{match.teamName}</h3>
            <p className="text-xs text-slate-500">
              Đại diện: <span className="font-medium text-slate-700">{match.contactPerson}</span> • {match.createdAt}
            </p>
          </div>
        </div>

        {/* Level badge */}
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getLevelBadgeColor(
            match.level
          )}`}
        >
          {match.level}
        </span>
      </div>

      {/* Match details grid */}
      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{match.date}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{match.time}</span>
        </div>
        <div className="col-span-2 flex items-start gap-2 text-slate-700">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-900">{match.pitchName}</strong> ({match.district}, {match.city})
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Loại: <strong className="text-slate-800">{match.pitchType}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Swords className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Kèo: <strong className="text-amber-700">{match.betType}</strong></span>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-slate-600 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
        &ldquo;{match.note}&rdquo;
      </p>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
        <a
          href={`tel:${match.phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>{match.phone}</span>
        </a>

        {accepted ? (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã kết nối kèo</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Nhận kèo giao lưu</span>
          </button>
        )}
      </div>
    </div>
  )
}
