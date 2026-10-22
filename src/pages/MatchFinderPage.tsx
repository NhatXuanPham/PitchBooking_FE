import React, { useState, useMemo } from 'react'
import { Plus, Swords, Trophy, MapPin, X } from 'lucide-react'
import { MOCK_MATCH_REQUESTS } from '../data/mockData'
import { MatchCard } from '../components/match/MatchCard'
import type { MatchRequest, MatchLevel, BetType, PitchType } from '../types'

export const MatchFinderPage: React.FC = () => {
  const [matches, setMatches] = useState<MatchRequest[]>(MOCK_MATCH_REQUESTS)
  const [selectedLevel, setSelectedLevel] = useState<string>('Tất cả')
  const [selectedCity, setSelectedCity] = useState<string>('Tất cả')
  const [selectedBetType, setSelectedBetType] = useState<string>('Tất cả')

  // Modal create match
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newContactPerson, setNewContactPerson] = useState('Nguyễn Văn Đạt')
  const [newPhone, setNewPhone] = useState('0989 123 789')
  const [newLevel, setNewLevel] = useState<MatchLevel>('Trung bình')
  const [newTime, setNewTime] = useState('19:00 - 20:30')
  const [newDate, setNewDate] = useState('Tối nay')
  const [newPitchName, setNewPitchName] = useState('Sân Chùa Láng')
  const [newDistrict, setNewDistrict] = useState('Đống Đa')
  const [newCity, setNewCity] = useState('Hà Nội')
  const [newPitchType, setNewPitchType] = useState<PitchType>('Sân 7')
  const [newBetType, setNewBetType] = useState<BetType>('5-5 tiền sân')
  const [newNote, setNewNote] = useState('Đội đá vui vẻ cọ xát, không chơi xấu, nước nôi đầy đủ.')

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const matchLevel = selectedLevel === 'Tất cả' || m.level === selectedLevel
      const matchCity = selectedCity === 'Tất cả' || m.city === selectedCity
      const matchBet = selectedBetType === 'Tất cả' || m.betType === selectedBetType
      return matchLevel && matchCity && matchBet
    })
  }, [matches, selectedLevel, selectedCity, selectedBetType])

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeamName) return

    const newMatchItem: MatchRequest = {
      id: `match-${Date.now()}`,
      teamName: newTeamName,
      contactPerson: newContactPerson,
      phone: newPhone,
      level: newLevel,
      time: newTime,
      date: newDate,
      pitchName: newPitchName,
      district: newDistrict,
      city: newCity,
      pitchType: newPitchType,
      betType: newBetType,
      note: newNote,
      createdAt: 'Vừa xong',
      status: 'finding',
    }

    setMatches([newMatchItem, ...matches])
    setShowCreateModal(false)
    setNewTeamName('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-xs text-slate-500 mb-2">
            <span>Trang chủ</span> / <span className="text-slate-800 font-semibold">Tìm bạn giao hữu</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Swords className="w-7 h-7 text-emerald-600" />
            Tìm Bạn Giao Hữu & Bắt Đối Thể Thao
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Giao lưu kết nối giữa các đội bóng đá phong trào. Tìm đối cùng trình độ, thỏa thuận kèo rõ ràng.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Đăng tin tìm đối thủ</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* City Filter */}
        <div>
          <label className="block font-bold text-slate-500 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Khu vực
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
          >
            <option value="Tất cả">Tất cả khu vực</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label className="block font-bold text-slate-500 mb-1 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Trình độ
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
          >
            <option value="Tất cả">Tất cả trình độ</option>
            <option value="Yếu / Mới tập">Yếu / Mới tập</option>
            <option value="Trung bình yếu">Trung bình yếu</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khá">Khá</option>
            <option value="Bán chuyên">Bán chuyên</option>
          </select>
        </div>

        {/* Bet Type */}
        <div>
          <label className="block font-bold text-slate-500 mb-1 flex items-center gap-1">
            <Swords className="w-3.5 h-3.5 text-amber-500" /> Thỏa thuận kèo
          </label>
          <select
            value={selectedBetType}
            onChange={(e) => setSelectedBetType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
          >
            <option value="Tất cả">Tất cả các kèo</option>
            <option value="5-5 tiền sân">5-5 tiền sân</option>
            <option value="Thua trả tiền sân">Thua trả tiền sân</option>
            <option value="Giao lưu vui vẻ">Giao lưu vui vẻ</option>
          </select>
        </div>
      </div>

      {/* Match Request List */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span>
            Có <strong className="text-slate-800">{filteredMatches.length}</strong> bài đăng tìm đối
          </span>
        </div>

        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Swords className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Không tìm thấy bài đăng phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Chưa có đội nào đăng tìm đối thủ theo tiêu chí này. Bạn có thể là người đầu tiên tạo kèo!
            </p>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="py-2 px-4 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Đăng tin tìm đối ngay
            </button>
          </div>
        )}
      </div>

      {/* Create Match Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Đăng Tin Tìm Đối Thủ Giao Hữu</h3>
            <p className="text-xs text-slate-500">
              Điền thông tin đội bóng và chi tiết trận đấu để các đội khác dễ dàng kết nối.
            </p>

            <form onSubmit={handleCreateMatch} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tên đội bóng *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: FC Hà Nội Trẻ"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Người liên hệ *</label>
                  <input
                    type="text"
                    required
                    value={newContactPerson}
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ *</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trình độ đội *</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as MatchLevel)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  >
                    <option value="Yếu / Mới tập">Yếu / Mới tập</option>
                    <option value="Trung bình yếu">Trung bình yếu</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Khá">Khá</option>
                    <option value="Bán chuyên">Bán chuyên</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ngày thi đấu</label>
                  <input
                    type="text"
                    placeholder="VD: Tối nay (22/10)"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khung giờ đá</label>
                  <input
                    type="text"
                    placeholder="VD: 19:00 - 20:30"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sân bóng dự kiến</label>
                  <input
                    type="text"
                    placeholder="VD: Sân Thủy Lợi"
                    value={newPitchName}
                    onChange={(e) => setNewPitchName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khu vực</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quận / Huyện</label>
                <input
                  type="text"
                  placeholder="VD: Đống Đa"
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Loại sân</label>
                  <select
                    value={newPitchType}
                    onChange={(e) => setNewPitchType(e.target.value as PitchType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  >
                    <option value="Sân 5">Sân 5</option>
                    <option value="Sân 7">Sân 7</option>
                    <option value="Sân 11">Sân 11</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Thỏa thuận kèo</label>
                  <select
                    value={newBetType}
                    onChange={(e) => setNewBetType(e.target.value as BetType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  >
                    <option value="5-5 tiền sân">5-5 tiền sân</option>
                    <option value="Thua trả tiền sân">Thua trả tiền sân</option>
                    <option value="Giao lưu vui vẻ">Giao lưu vui vẻ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lời nhắn / Ghi chú</label>
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Đăng Kèo Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
