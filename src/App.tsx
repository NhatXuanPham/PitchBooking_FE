import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { PitchesPage } from './pages/PitchesPage'
import { PitchDetailPage } from './pages/PitchDetailPage'
import { MatchFinderPage } from './pages/MatchFinderPage'
import { ProfilePage } from './pages/ProfilePage'
import { TeamPage } from './pages/TeamPage'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* 1. Trang chủ */}
            <Route path="/" element={<HomePage />} />
            <Route path="/trang-chu.html" element={<HomePage />} />

            {/* 2. Danh sách sân bóng đá */}
            <Route path="/san-bong" element={<PitchesPage />} />
            <Route path="/san-bong-noi-bat.html" element={<PitchesPage />} />

            {/* 3. Chi tiết sân bóng */}
            <Route path="/chi-tiet-san/:id" element={<PitchDetailPage />} />
            <Route path="/chi-tiet-san-57.html" element={<PitchDetailPage />} />

            {/* 4. Tìm bạn giao hữu / Bắt đối */}
            <Route path="/tim-doi-thu" element={<MatchFinderPage />} />
            <Route path="/tim-ban-giao-huu.html" element={<MatchFinderPage />} />

            {/* 5. Quản lý đội bóng / Nhóm thể thao */}
            <Route path="/doi-bong" element={<TeamPage />} />
            <Route path="/quan-ly-doi-bong.html" element={<TeamPage />} />

            {/* 6. Cài đặt tài khoản & Lịch sử đặt sân */}
            <Route path="/tai-khoan" element={<ProfilePage />} />
            <Route path="/cai-dat-tai-khoan.html" element={<ProfilePage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
