import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ĐặtSân<span className="text-emerald-400">Nhanh</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nền tảng đặt sân bóng đá và tìm đối thủ giao hữu trực tuyến hàng đầu Việt Nam. Giữ sân tức thì, xác nhận tự động 24/7.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Uy tín 100%
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-emerald-400" /> Phản hồi 30s
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-emerald-400" /> Sân chuẩn FIFA
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Khám phá nhanh
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/san-bong" className="hover:text-emerald-400 transition-colors">
                  Danh sách sân bóng đá
                </Link>
              </li>
              <li>
                <Link to="/tim-doi-thu" className="hover:text-emerald-400 transition-colors">
                  Tìm bạn giao hữu / Bắt đối
                </Link>
              </li>
              <li>
                <Link to="/tai-khoan" className="hover:text-emerald-400 transition-colors">
                  Cài đặt tài khoản & Lịch sử đặt sân
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sân bóng theo khu vực */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Khu vực phổ biến
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Sân bóng đá Quận Đống Đa, Hà Nội</li>
              <li>Sân bóng đá Quận Cầu Giấy, Hà Nội</li>
              <li>Sân bóng đá Nam Từ Liêm, Hà Nội</li>
              <li>Sân bóng đá Quận Tân Bình, TP.HCM</li>
              <li>Sân bóng đá Quận Phú Nhuận, TP.HCM</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">0988 123 456</div>
                  <div className="text-xs text-slate-400">Hỗ trợ 24/7 (Cả ngày lễ & Tết)</div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@datsannhanh.vn</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-relaxed">
                  Tòa nhà Innovation Hub, 102 Cầu Giấy, Hà Nội
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Đặt Sân Nhanh (PitchBooking). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Điều khoản sử dụng</span>
            <span className="hover:text-white cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-white cursor-pointer">Quy định hoàn hủy cọc</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
