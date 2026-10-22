import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MapPin,
  Star,
  Phone,
  Clock,
  Calendar,
  CheckCircle,
  Share2,
  ShieldCheck,
  Info,
  Check,
  X,
  CreditCard,
  QrCode,
  DollarSign
} from 'lucide-react'
import { MOCK_PITCHES } from '../data/mockData'
import type { Pitch } from '../types'

interface Slot {
  id: string
  time: string
  period: 'Sáng' | 'Chiều' | 'Tối'
  price: number
  isBooked: boolean
}

export const PitchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const pitch: Pitch = MOCK_PITCHES.find((p) => p.id === id) || MOCK_PITCHES[0]

  const [selectedSubPitch, setSelectedSubPitch] = useState('Sân 7 - Sân số 1')
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Customer Form state
  const [customerName, setCustomerName] = useState('Nguyễn Văn Đạt')
  const [customerPhone, setCustomerPhone] = useState('0989 123 789')
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cash'>('qr')

  // Generate next 4 days for tabs
  const dates = [
    { label: 'Hôm nay', dateStr: '22/10' },
    { label: 'Ngày mai', dateStr: '23/10' },
    { label: 'Thứ Sáu', dateStr: '24/10' },
    { label: 'Thứ Bảy', dateStr: '25/10' },
  ]

  // Mock time slots
  const timeSlots: Slot[] = [
    { id: 'slot-1', time: '06:00 - 07:30', period: 'Sáng', price: 300000, isBooked: false },
    { id: 'slot-2', time: '07:30 - 09:00', period: 'Sáng', price: 350000, isBooked: true },
    { id: 'slot-3', time: '16:00 - 17:30', period: 'Chiều', price: 450000, isBooked: false },
    { id: 'slot-4', time: '17:30 - 19:00', period: 'Tối', price: 600000, isBooked: true },
    { id: 'slot-5', time: '19:00 - 20:30', period: 'Tối', price: 650000, isBooked: false },
    { id: 'slot-6', time: '20:30 - 22:00', period: 'Tối', price: 500000, isBooked: false },
  ]

  const subPitches = ['Sân 7 - Sân số 1', 'Sân 7 - Sân số 2', 'Sân 5 - Sân số 3']

  const handleSelectSlot = (slot: Slot) => {
    if (slot.isBooked) return
    setSelectedSlot(slot.id === selectedSlot?.id ? null : slot)
  }

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-600">Trang chủ</Link> /{' '}
        <Link to="/san-bong" className="hover:text-emerald-600">Sân bóng</Link> /{' '}
        <span className="text-slate-800 font-semibold">{pitch.name}</span>
      </nav>

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {pitch.types.map((type) => (
              <span key={type} className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-600 text-white">
                {type}
              </span>
            ))}
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{pitch.rating}</span>
              <span className="text-slate-400 font-normal">({pitch.reviewCount} đánh giá)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {pitch.name}
          </h1>

          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 mt-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{pitch.address}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${pitch.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors border border-slate-200"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Hotline: {pitch.phone}</span>
          </a>
          <button
            type="button"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200"
            title="Chia sẻ sân bóng"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Banner Image */}
      <div className="relative rounded-3xl overflow-hidden aspect-21/9 bg-slate-900 shadow-md">
        <img
          src={pitch.image}
          alt={pitch.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
          <div className="text-white text-xs sm:text-sm flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
              <Clock className="w-4 h-4 text-emerald-400" /> Giờ mở cửa: {pitch.openingHours}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Mức giá: {pitch.priceRange}
            </span>
          </div>
        </div>
      </div>

      {/* Main Booking Section: Grid + Sticky Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Booking Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Lịch Đặt Sân Trực Tuyến
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chọn ngày và khung giờ bạn muốn đặt để giữ chỗ ngay lập tức.
              </p>
            </div>

            {/* Date selection tabs */}
            <div>
              <div className="text-xs font-bold text-slate-600 mb-2">1. Chọn ngày thi đấu:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map((d, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedDateIndex(idx)
                      setSelectedSlot(null)
                    }}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedDateIndex === idx
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs">{d.label}</div>
                    <div className="text-sm font-extrabold">{d.dateStr}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-pitch selector */}
            <div>
              <div className="text-xs font-bold text-slate-600 mb-2">2. Chọn sân nhỏ:</div>
              <div className="flex flex-wrap gap-2">
                {subPitches.map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => {
                      setSelectedSubPitch(sp)
                      setSelectedSlot(null)
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSubPitch === sp
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md border border-slate-300 bg-white inline-block"></span>
                <span>Còn trống</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 inline-block"></span>
                <span>Đang chọn</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-200 border border-slate-300 inline-block"></span>
                <span>Đã có người đặt</span>
              </span>
            </div>

            {/* Time Slot Grid */}
            <div>
              <div className="text-xs font-bold text-slate-600 mb-2">3. Khung giờ thi đấu:</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.isBooked}
                      onClick={() => handleSelectSlot(slot)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        slot.isBooked
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                          : isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                          : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {slot.period}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>

                      <div className="font-extrabold text-sm">{slot.time}</div>

                      <div className={`text-xs mt-1 font-semibold ${
                        isSelected ? 'text-emerald-100' : 'text-emerald-600'
                      }`}>
                        {slot.price.toLocaleString('vi-VN')} đ
                      </div>

                      {slot.isBooked && (
                        <div className="absolute inset-0 bg-slate-200/50 backdrop-blur-2xs flex items-center justify-center rounded-xl font-bold text-xs text-slate-600">
                          Đã đặt
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Description & Amenities */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Giới thiệu & Tiện ích sân bóng</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pitch.description}
            </p>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Các tiện ích có sẵn
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {pitch.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
              <div className="font-bold text-slate-700">Quy định & Chính sách hủy sân:</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Vui lòng có mặt trước giờ thi đấu ít nhất 15 phút để khởi động và nhận sân.</li>
                <li>Hủy sân trước 12 tiếng sẽ được hoàn 100% tiền cọc.</li>
                <li>Không mang đồ uống có cồn và chất cháy nổ vào sân bóng.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Col: Booking Summary Card (Sticky) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md sticky top-20 space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Thông tin đặt sân</span>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </h3>

            {selectedSlot ? (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-500">
                    <span>Sân thi đấu:</span>
                    <strong className="text-slate-800">{pitch.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Sân nhỏ:</span>
                    <strong className="text-slate-800">{selectedSubPitch}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Ngày đá:</span>
                    <strong className="text-slate-800">
                      {dates[selectedDateIndex].label} ({dates[selectedDateIndex].dateStr})
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Khung giờ:</span>
                    <strong className="text-emerald-700 font-bold">{selectedSlot.time}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Tiền sân:</span>
                    <span>{selectedSlot.price.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cọc giữ sân (30%):</span>
                    <span className="font-semibold text-slate-800">
                      {(selectedSlot.price * 0.3).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Tổng tiền:</span>
                    <span className="text-emerald-600 text-base">
                      {selectedSlot.price.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                >
                  Xác nhận đặt & Giữ chỗ
                </button>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <Info className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">Vui lòng chọn 1 khung giờ bên cạnh để tiến hành đặt chỗ</p>
              </div>
            )}

            <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Cam kết giữ chỗ 100%
              </div>
              <p className="text-slate-600">
                Lịch đặt sẽ được gửi ngay cho ban quản lý sân và xác nhận qua tin nhắn SMS/Zalo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => {
                setShowBookingModal(false)
                setBookingSuccess(false)
              }}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Xác Nhận Đặt Sân Bóng</h3>
                <p className="text-xs text-slate-500">
                  {pitch.name} • {selectedSubPitch} • {selectedSlot?.time} ({dates[selectedDateIndex].dateStr})
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Họ và tên người đặt</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Số điện thoại nhận tin nhắn xác nhận</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phương thức thanh toán cọc</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('qr')}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                          paymentMethod === 'qr'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                            : 'border-slate-200'
                        }`}
                      >
                        <QrCode className="w-4 h-4 text-emerald-600" />
                        <span>Chuyển khoản QR</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                          paymentMethod === 'cash'
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                            : 'border-slate-200'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                        <span>Tại sân (0đ cọc)</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between items-center">
                  <span className="text-slate-600">Tổng thanh toán dự kiến:</span>
                  <span className="text-base font-black text-emerald-600">
                    {selectedSlot?.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Hoàn Tất Đặt Lịch
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Đặt Sân Thành Công!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Mã đặt sân: <strong className="text-slate-800">DSN-{Date.now().toString().slice(-6)}</strong>. Chúng tôi đã gửi SMS xác nhận đến số <strong>{customerPhone}</strong>.
                </p>
                <div className="pt-2 flex gap-2">
                  <Link
                    to="/tai-khoan"
                    className="flex-1 py-2 px-3 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                  >
                    Xem lịch sử đặt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingModal(false)
                      setBookingSuccess(false)
                      setSelectedSlot(null)
                    }}
                    className="py-2 px-3 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
