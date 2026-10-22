import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, MapPin, Trophy, ArrowUpDown, RotateCcw } from 'lucide-react'
import { MOCK_PITCHES } from '../data/mockData'
import { PitchCard } from '../components/pitch/PitchCard'
import type { PitchType } from '../types'

export const PitchesPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialCity = searchParams.get('city') || 'Tất cả'
  const initialType = searchParams.get('type') || 'Tất cả'

  const [keyword, setKeyword] = useState('')
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả')
  const [selectedType, setSelectedType] = useState(initialType)
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc'>('rating')

  // Filter districts based on city
  const availableDistricts = useMemo(() => {
    if (selectedCity === 'Hà Nội') return ['Tất cả', 'Đống Đa', 'Cầu Giấy', 'Nam Từ Liêm']
    if (selectedCity === 'TP. Hồ Chí Minh') return ['Tất cả', 'Tân Bình', 'Phú Nhuận']
    return ['Tất cả', 'Đống Đa', 'Cầu Giấy', 'Nam Từ Liêm', 'Tân Bình', 'Phú Nhuận']
  }, [selectedCity])

  const filteredPitches = useMemo(() => {
    return MOCK_PITCHES.filter((pitch) => {
      // Keyword
      const matchKeyword =
        !keyword ||
        pitch.name.toLowerCase().includes(keyword.toLowerCase()) ||
        pitch.address.toLowerCase().includes(keyword.toLowerCase())

      // City
      const matchCity = selectedCity === 'Tất cả' || pitch.city === selectedCity

      // District
      const matchDistrict = selectedDistrict === 'Tất cả' || pitch.district === selectedDistrict

      // Type
      const matchType =
        selectedType === 'Tất cả' || pitch.types.includes(selectedType as PitchType)

      return matchKeyword && matchCity && matchDistrict && matchType
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price_asc') return a.minPrice - b.minPrice
      if (sortBy === 'price_desc') return b.minPrice - a.minPrice
      return 0
    })
  }, [keyword, selectedCity, selectedDistrict, selectedType, sortBy])

  const handleReset = () => {
    setKeyword('')
    setSelectedCity('Tất cả')
    setSelectedDistrict('Tất cả')
    setSelectedType('Tất cả')
    setSortBy('rating')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <nav className="text-xs text-slate-500 mb-2">
          <span>Trang chủ</span> / <span className="text-slate-800 font-semibold">Danh sách sân bóng đá</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Danh Sách Sân Bóng Đá
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Khám phá và đặt sân bóng đá chất lượng cao, cập nhật lịch biểu mới nhất mỗi ngày.
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top search & Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sân bóng hoặc địa chỉ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-slate-50 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-emerald-500 focus:bg-white"
            />
          </div>

          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-emerald-500 focus:bg-white"
            >
              <option value="rating">Đánh giá cao nhất</option>
              <option value="price_asc">Giá từ thấp đến cao</option>
              <option value="price_desc">Giá từ cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Detailed Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* City */}
          <div>
            <label className="block font-bold text-slate-500 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" /> Tỉnh/Thành phố
            </label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value)
                setSelectedDistrict('Tất cả')
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
            >
              <option value="Tất cả">Tất cả thành phố</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block font-bold text-slate-500 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" /> Quận/Huyện
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block font-bold text-slate-500 mb-1 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-emerald-600" /> Loại sân
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
            >
              <option value="Tất cả">Tất cả loại sân</option>
              <option value="Sân 5">Sân 5 người</option>
              <option value="Sân 7">Sân 7 người</option>
              <option value="Sân 11">Sân 11 người</option>
            </select>
          </div>

          {/* Reset button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleReset}
              className="w-full p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Tìm thấy <strong className="text-slate-800">{filteredPitches.length}</strong> sân bóng phù hợp
        </div>
      </div>

      {/* Pitches Grid */}
      {filteredPitches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPitches.map((pitch) => (
            <PitchCard key={pitch.id} pitch={pitch} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Filter className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Không tìm thấy sân bóng phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm đặt lại bộ lọc để xem toàn bộ danh sách.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-4 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  )
}
