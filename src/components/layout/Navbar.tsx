import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Calendar, Users, Menu, X, PhoneCall, ShieldCheck, Shield } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: Trophy },
    { name: 'Danh sách sân bóng', path: '/san-bong', icon: Calendar },
    { name: 'Tìm bạn giao hữu', path: '/tim-doi-thu', icon: Users },
    { name: 'Đội bóng', path: '/doi-bong', icon: Shield },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                ĐặtSân<span className="text-emerald-600">Nhanh</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full ml-1.5 border border-emerald-200">
                PRO
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Action: Hotline + Circular User Avatar Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:0988123456"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-600 py-1.5 px-2.5 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hotline: 0988 123 456</span>
            </a>

            <Link
              to="/tai-khoan"
              className="flex items-center gap-2 p-0.5 sm:pl-1.5 sm:pr-3 sm:py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors border border-slate-200 hover:border-emerald-400"
              title="Cài đặt tài khoản"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500"
              />
              <span className="hidden sm:inline text-xs font-semibold">Văn Đạt</span>
            </Link>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Đặt sân trực tiếp & Bảo đảm giữ chỗ
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
