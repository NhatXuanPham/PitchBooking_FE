import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, Trophy, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react'
import { MOCK_PITCHES, MOCK_MATCH_REQUESTS } from '../data/mockData'
import { PitchCard } from '../components/pitch/PitchCard'
import { MatchCard } from '../components/match/MatchCard'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState('Hà Nội')
  const [selectedType, setSelectedType] = useState('Tất cả')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/san-bong?city=${encodeURIComponent(selectedCity)}&type=${encodeURIComponent(selectedType)}`)
  }

  const featuredPitches = MOCK_PITCHES.slice(0, 3)
  const recentMatches = MOCK_MATCH_REQUESTS.slice(0, 2)

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white overflow-hidden py-16 sm:py-24">
        {/* Background glow & subtle pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>Nền tảng đặt sân & kết nối đối thủ số 1</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Tìm Sân Nhanh Chóng, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                Bắt Đối Giao Hữu
              </span>{' '}
              Dễ Dàng!
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hơn 200+ cụm sân cỏ nhân tạo khắp Hà Nội & TP.HCM. Cập nhật khung giờ trống thời gian thực, giữ chỗ 100% không lo trùng giờ.
            </p>
          </div>

          {/* Quick Search Card */}
          <div className="mt-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200/50 text-slate-800">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Khu vực
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-emerald-500 focus:bg-white"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Ngày đá
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-emerald-500 focus:bg-white"
                />
              </div>

              {/* Pitch Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Loại sân
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-emerald-500 focus:bg-white"
                >
                  <option value="Tất cả">Tất cả loại sân</option>
                  <option value="Sân 5">Sân 5 người</option>
                  <option value="Sân 7">Sân 7 người</option>
                  <option value="Sân 11">Sân 11 người</option>
                </select>
              </div>

              {/* Submit */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Tìm sân ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Pitches Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-3.5 h-3.5" /> Sân bóng nổi bật
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Sân Bóng Được Đánh Giá Cao Nhất
            </h2>
          </div>
          <Link
            to="/san-bong"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>Xem tất cả danh sách sân</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPitches.map((pitch) => (
            <PitchCard key={pitch.id} pitch={pitch} />
          ))}
        </div>
      </section>

      {/* Match Finder Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Cộng đồng bóng đá phủi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Tìm Bạn Giao Hữu & Bắt Đối</h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Đội bạn đã có sân nhưng thiếu đối? Hoặc chưa có sân muốn tìm đội đá chung chia tiền? Đăng kèo ngay để ghép trận trong 5 phút!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/tim-doi-thu"
                className="py-2.5 px-5 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Xem tất cả kèo giao hữu
              </Link>
              <Link
                to="/tim-doi-thu"
                className="py-2.5 px-5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                + Đăng tin tìm đối
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Trải Nghiệm Đặt Sân Tối Ưu
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Giải pháp đặt sân thông minh, hiện đại loại bỏ hoàn toàn việc gọi điện thoại hỏi giờ nhiều lần.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Giữ Chỗ Tức Thì 24/7</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Xem trực tiếp khung giờ còn trống của từng sân con theo thời gian thực và xác nhận booking ngay lập tức.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Đảm Bảo Quyền Lợi 100%</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Thông tin minh bạch, giá tiền niêm yết rõ ràng, hỗ trợ hoàn hủy linh hoạt theo chính sách từng cụm sân.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Cộng Đồng Giao Lưu Lớn</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dễ dàng kết nối giao lưu với hàng ngàn đội bóng phong trào, từ sinh viên, văn phòng đến bán chuyên.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
