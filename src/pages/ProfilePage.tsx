import React, { useState } from 'react'
import {
  User,
  Calendar,
  Lock,
  Bell,
  Camera,
  Save,
  CheckCircle2,
  Shield,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { MOCK_USER_PROFILE, MOCK_BOOKING_HISTORY } from '../data/mockData'
import type { UserProfile, BookingHistory } from '../types'

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER_PROFILE)
  const [activeTab, setActiveTab] = useState<'info' | 'bookings' | 'password' | 'notifications'>('info')
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Booking history state
  const [bookings] = useState<BookingHistory[]>(MOCK_BOOKING_HISTORY)

  // Password state
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordSuccess(true)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  const getStatusBadge = (status: BookingHistory['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Đã xác nhận
          </span>
        )
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Đã hoàn thành
          </span>
        )
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Đã hủy
          </span>
        )
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <nav className="text-xs text-slate-500 mb-2">
          <span>Trang chủ</span> / <span className="text-slate-800 font-semibold">Cài đặt tài khoản</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quản Lý Tài Khoản & Lịch Sử
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Cập nhật hồ sơ cầu thủ, kiểm tra các lịch đặt sân và tùy chỉnh thông báo.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-md"
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-md"
            title="Đổi ảnh đại diện"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">{profile.fullName}</h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 self-center sm:self-auto">
              <Shield className="w-3 h-3" /> Thành viên tin cậy
            </span>
          </div>

          <p className="text-xs text-slate-500 flex flex-wrap justify-center sm:justify-start gap-3 pt-1">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> {profile.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {profile.email}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.district}, {profile.city}
            </span>
          </p>

          <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
              Đội bóng: <strong>{profile.teamName}</strong>
            </span>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
              Vị trí: <strong>{profile.preferredPosition}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Settings Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'info'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Thông tin cá nhân</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'bookings'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Lịch sử đặt sân ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'password'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Đổi mật khẩu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeTab === 'notifications'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Cài đặt thông báo</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-3">
          {/* TAB 1: Profile Info */}
          {activeTab === 'info' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Cập Nhật Thông Tin Cá Nhân</h3>
                <p className="text-xs text-slate-500">
                  Thông tin này sẽ hiển thị khi bạn liên hệ bắt đối hoặc đặt sân bóng.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đã lưu thay đổi thông tin thành công!</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Địa chỉ Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tỉnh / Thành phố</label>
                    <select
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Đội bóng đang sinh hoạt</label>
                    <input
                      type="text"
                      value={profile.teamName}
                      onChange={(e) => setProfile({ ...profile, teamName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Vị trí sở trường</label>
                    <input
                      type="text"
                      value={profile.preferredPosition}
                      onChange={(e) => setProfile({ ...profile, preferredPosition: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Bookings History */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Lịch Sử Đặt Sân Của Bạn</h3>
                <p className="text-xs text-slate-500">
                  Xem lại toàn bộ các lần giữ chỗ và trạng thái thanh toán.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-bold">Mã Đặt</th>
                      <th className="p-3 font-bold">Sân Bóng & Khung Giờ</th>
                      <th className="p-3 font-bold">Ngày Đá</th>
                      <th className="p-3 font-bold">Tổng Tiền</th>
                      <th className="p-3 font-bold">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-700">{b.bookingCode}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{b.pitchName}</div>
                          <div className="text-[11px] text-slate-500">
                            {b.subPitch} • {b.time}
                          </div>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">{b.date}</td>
                        <td className="p-3 font-extrabold text-emerald-600">
                          {b.totalPrice.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="p-3">{getStatusBadge(b.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Change Password */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 max-w-lg">
              <div>
                <h3 className="text-base font-bold text-slate-900">Đổi Mật Khẩu Đăng Nhập</h3>
                <p className="text-xs text-slate-500">
                  Nên sử dụng mật khẩu mạnh gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                </p>
              </div>

              {passwordSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đổi mật khẩu thành công!</span>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Lưu Mật Khẩu Mới
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Cài Đặt Nhận Thông Báo</h3>
                <p className="text-xs text-slate-500">
                  Tùy chỉnh các kênh nhận tin khi có biến động lịch sân hoặc có đội bắt kèo.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800">Thông báo SMS khi đặt sân thành công</div>
                    <div className="text-slate-500 text-[11px]">Nhận mã vé và hướng dẫn nhận sân qua số điện thoại</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800">Thông báo khi có đội nhận kèo giao hữu</div>
                    <div className="text-slate-500 text-[11px]">Gửi thông báo đẩy và email khi bài đăng tìm đối có phản hồi</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div>
                    <div className="font-bold text-slate-800">Khuyến mãi & Khung giờ vàng giảm giá</div>
                    <div className="text-slate-500 text-[11px]">Cập nhật các chương trình ưu đãi từ các cụm sân quen thuộc</div>
                  </div>
                  <input type="checkbox" className="w-4 h-4 accent-emerald-600" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
