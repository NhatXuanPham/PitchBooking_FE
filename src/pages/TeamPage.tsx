import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  Users,
  Calendar,
  Wallet,
  Plus,
  Share2,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Trophy,
  Swords,
  Copy,
  Check,
  UserPlus,
  Shirt,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Settings,
  Sparkles,
  Award,
} from 'lucide-react'
import { MOCK_MY_TEAM } from '../data/mockData'
import type {
  Team,
  TeamMember,
  TeamScheduleMatch,
  TeamFundTransaction,
  MatchLevel,
  PitchType,
  PlayerPosition,
  AttendanceStatus,
} from '../types'

export const TeamPage: React.FC = () => {
  const [team, setTeam] = useState<Team>(MOCK_MY_TEAM)
  const [activeTab, setActiveTab] = useState<'members' | 'schedules' | 'funds' | 'settings'>('members')
  const [copiedCode, setCopiedCode] = useState(false)

  // Modals state
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false)
  const [showAddFundModal, setShowAddFundModal] = useState(false)

  // Quick Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // --- Form: Create New Team ---
  const [formTeamName, setFormTeamName] = useState('')
  const [formShortName, setFormShortName] = useState('')
  const [formSlogan, setFormSlogan] = useState('')
  const [formHomePitch, setFormHomePitch] = useState('Sân Cầu Giấy Star')
  const [formDistrict, setFormDistrict] = useState('Cầu Giấy')
  const [formCity, setFormCity] = useState('Hà Nội')
  const [formLevel, setFormLevel] = useState<MatchLevel>('Trung bình')
  const [formPitchType, setFormPitchType] = useState<PitchType>('Sân 7')
  const [formKitPrimary, setFormKitPrimary] = useState('Xanh Dương')
  const [formKitSecondary, setFormKitSecondary] = useState('Trắng')

  const handleCreateNewTeam = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTeamName.trim()) return

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: formTeamName,
      shortName: formShortName || formTeamName.substring(0, 4).toUpperCase(),
      slogan: formSlogan || 'Đam mê dẫn lối - Đoàn kết chiến thắng',
      logo: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=300&q=80',
      coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      establishedYear: new Date().getFullYear().toString(),
      homePitch: formHomePitch,
      district: formDistrict,
      city: formCity,
      level: formLevel,
      preferredPitchType: formPitchType,
      primaryKitColor: formKitPrimary,
      secondaryKitColor: formKitSecondary,
      membersCount: 1,
      matchesPlayed: 0,
      winRate: 100,
      fundBalance: 0,
      captainName: 'Nguyễn Văn Đạt',
      captainPhone: '0989 123 789',
      inviteCode: `FC-${Math.floor(1000 + Math.random() * 9000)}`,
      members: [
        {
          id: `m-${Date.now()}`,
          name: 'Nguyễn Văn Đạt',
          phone: '0989 123 789',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          role: 'captain',
          position: 'Tiền vệ',
          jerseyNumber: 10,
          joinedDate: 'Vừa xong',
          attendance: 'going',
        },
      ],
      schedules: [],
      funds: [],
    }

    setTeam(newTeam)
    setShowCreateTeamModal(false)
    showToast(`Đã tạo thành công đội bóng "${newTeam.name}"!`)
  }

  // --- Form: Add Member manually ---
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberPhone, setNewMemberPhone] = useState('')
  const [newMemberPos, setNewMemberPos] = useState<PlayerPosition>('Tiền đạo')
  const [newMemberNum, setNewMemberNum] = useState<number>(7)

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMemberName.trim()) return

    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: newMemberName,
      phone: newMemberPhone || '0900 000 000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'member',
      position: newMemberPos,
      jerseyNumber: Number(newMemberNum) || 12,
      joinedDate: 'Vừa xong',
      attendance: 'unconfirmed',
    }

    setTeam({
      ...team,
      membersCount: team.membersCount + 1,
      members: [...team.members, newMember],
    })
    setNewMemberName('')
    setNewMemberPhone('')
    setShowInviteModal(false)
    showToast(`Đã thêm thành viên ${newMember.name} vào đội!`)
  }

  // --- Form: Add Schedule Match ---
  const [schTitle, setSchTitle] = useState('')
  const [schType, setSchType] = useState<'friendly' | 'internal' | 'tournament'>('friendly')
  const [schOpponent, setSchOpponent] = useState('')
  const [schPitch, setSchPitch] = useState('Cụm Sân Bóng Đá Chùa Láng')
  const [schAddress, setSchAddress] = useState('112 Chùa Láng, Đống Đa, Hà Nội')
  const [schDate, setSchDate] = useState('Thứ Sáu, 25/10/2026')
  const [schTime, setSchTime] = useState('19:00 - 20:30')
  const [schFee, setSchFee] = useState<number>(600000)

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!schTitle.trim()) return

    const newSchedule: TeamScheduleMatch = {
      id: `sch-${Date.now()}`,
      title: schTitle,
      type: schType,
      opponentName: schType === 'friendly' ? schOpponent || 'FC Đối tác' : undefined,
      pitchName: schPitch,
      pitchAddress: schAddress,
      date: schDate,
      time: schTime,
      estimatedFee: Number(schFee) || 0,
      status: 'upcoming',
      goingCount: 1,
      absentCount: 0,
      userStatus: 'going',
    }

    setTeam({
      ...team,
      schedules: [newSchedule, ...team.schedules],
    })
    setSchTitle('')
    setSchOpponent('')
    setShowAddScheduleModal(false)
    showToast('Đã lên lịch trận và mở điểm danh cho anh em!')
  }

  // --- Form: Add Fund Transaction ---
  const [fundType, setFundType] = useState<'income' | 'expense'>('income')
  const [fundTitle, setFundTitle] = useState('')
  const [fundAmount, setFundAmount] = useState<number>(200000)
  const [fundPerson, setFundPerson] = useState('Nguyễn Văn Đạt')
  const [fundNote, setFundNote] = useState('')

  const handleAddFund = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fundTitle.trim()) return

    const amountNum = Number(fundAmount) || 0
    const newFund: TeamFundTransaction = {
      id: `fund-${Date.now()}`,
      type: fundType,
      title: fundTitle,
      amount: amountNum,
      date: new Date().toLocaleDateString('vi-VN'),
      person: fundPerson,
      note: fundNote,
    }

    const newBalance =
      fundType === 'income' ? team.fundBalance + amountNum : team.fundBalance - amountNum

    setTeam({
      ...team,
      fundBalance: newBalance,
      funds: [newFund, ...team.funds],
    })
    setFundTitle('')
    setFundNote('')
    setShowAddFundModal(false)
    showToast(
      fundType === 'income'
        ? `Đã ghi nhận thu quỹ +${amountNum.toLocaleString('vi-VN')}đ!`
        : `Đã ghi nhận chi quỹ -${amountNum.toLocaleString('vi-VN')}đ!`
    )
  }

  // --- Interaction: Attendance voting ---
  const handleVoteAttendance = (matchId: string, status: AttendanceStatus) => {
    const updatedSchedules = team.schedules.map((match) => {
      if (match.id === matchId) {
        let goingDelta = 0
        let absentDelta = 0

        if (match.userStatus === 'going') goingDelta -= 1
        if (match.userStatus === 'absent') absentDelta -= 1

        if (status === 'going') goingDelta += 1
        if (status === 'absent') absentDelta += 1

        return {
          ...match,
          userStatus: status,
          goingCount: Math.max(0, match.goingCount + goingDelta),
          absentCount: Math.max(0, match.absentCount + absentDelta),
        }
      }
      return match
    })

    setTeam({ ...team, schedules: updatedSchedules })
    showToast(
      status === 'going'
        ? 'Bạn đã điểm danh THAM GIA trận này!'
        : status === 'absent'
        ? 'Bạn đã báo VẮNG trận này!'
        : 'Bạn đã chọn CHƯA CHẮC'
    )
  }

  const copyInviteCode = () => {
    navigator.clipboard?.writeText(team.inviteCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
    showToast(`Đã sao chép mã mời đội "${team.inviteCode}"!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-xs text-slate-500 mb-2">
            <span>Trang chủ</span> / <span className="text-slate-800 font-semibold">Quản lý đội bóng</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-emerald-600" />
            Đội Bóng & Quản Lý Nhóm Thể Thao
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Không gian gắn kết anh em: Lập đội, quản lý thành viên, chia sẻ lịch đá bóng, điểm danh và quỹ đội.
          </p>
        </div>

        {/* Global Action: Create New Team */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCreateTeamModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo đội bóng mới</span>
          </button>
        </div>
      </div>

      {/* TEAM HERO BANNER */}
      <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Cover Image */}
        <div className="h-44 sm:h-56 w-full relative overflow-hidden bg-slate-900">
          <img
            src={team.coverImage}
            alt={team.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

          {/* Quick Stats on banner desktop */}
          <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Thành lập: {team.establishedYear}</span>
          </div>
        </div>

        {/* Team Profile Row */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          {/* Logo & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative group">
              <img
                src={team.logo}
                alt={team.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white uppercase tracking-wider">
                {team.level}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {team.name}
                </h2>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {team.shortName}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {team.preferredPitchType}
                </span>
              </div>

              <p className="text-xs text-slate-600 italic max-w-xl">
                &ldquo;{team.slogan}&rdquo;
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Sân nhà: <strong className="text-slate-800">{team.homePitch} ({team.district})</strong>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Shirt className="w-3.5 h-3.5 text-blue-600" />
                  Áo: <strong className="text-slate-800">{team.primaryKitColor} / {team.secondaryKitColor}</strong>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Đội trưởng: <strong className="text-slate-800">{team.captainName}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons on hero */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 self-center md:self-end">
            <button
              type="button"
              onClick={() => setShowInviteModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-emerald-600" />
              <span>Tuyển & Mời thành viên</span>
            </button>

            <Link
              to="/tim-doi-thu"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              <Swords className="w-4 h-4" />
              <span>Mang đội đi bắt đối</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards in Banner Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-slate-200 bg-slate-50/70 divide-x divide-y md:divide-y-0 divide-slate-200 text-center">
          <div className="p-3.5 sm:p-4">
            <div className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-600" /> Thành viên
            </div>
            <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {team.members.length} cầu thủ
            </div>
          </div>

          <div className="p-3.5 sm:p-4">
            <div className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Số trận đã đá
            </div>
            <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {team.matchesPlayed} trận
            </div>
          </div>

          <div className="p-3.5 sm:p-4">
            <div className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> Tỉ lệ thắng
            </div>
            <div className="text-lg sm:text-xl font-black text-emerald-600 mt-0.5">
              {team.winRate}%
            </div>
          </div>

          <div className="p-3.5 sm:p-4">
            <div className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-purple-500" /> Quỹ đội hiện tại
            </div>
            <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {team.fundBalance.toLocaleString('vi-VN')}đ
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'members'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh sách thành viên ({team.members.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('schedules')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'schedules'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Lịch đấu & Điểm danh ({team.schedules.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('funds')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'funds'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Quỹ đội & Thu chi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Cài đặt đội bóng</span>
          </button>
        </div>

        {/* Tab specific action button */}
        {activeTab === 'schedules' && (
          <button
            type="button"
            onClick={() => setShowAddScheduleModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo lịch trận mới</span>
          </button>
        )}

        {activeTab === 'funds' && (
          <button
            type="button"
            onClick={() => setShowAddFundModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ghi thu / chi quỹ</span>
          </button>
        )}
      </div>

      {/* ================= TAB 1: MEMBERS ROSTER ================= */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Quick invite link card */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-sm flex items-center justify-center sm:justify-start gap-2">
                <Share2 className="w-4 h-4" />
                Mời anh em vào đội bóng qua Mã tham gia
              </h3>
              <p className="text-xs text-emerald-100">
                Gửi mã này vào nhóm Zalo hoặc Messenger để thành viên nhập vào và tham gia ngay.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
              <span className="font-mono text-sm font-black px-3 py-1 bg-white text-slate-900 rounded-lg">
                {team.inviteCode}
              </span>
              <button
                type="button"
                onClick={copyInviteCode}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white font-mono text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-white">
                      {member.jerseyNumber}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{member.name}</h4>
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Shirt className="w-3 h-3 text-emerald-600" />
                      <span>{member.position}</span>
                    </p>

                    <div className="pt-0.5">
                      {member.role === 'captain' && (
                        <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          👑 Đội trưởng
                        </span>
                      )}
                      {member.role === 'vice_captain' && (
                        <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          ⭐ Đội phó
                        </span>
                      )}
                      {member.role === 'member' && (
                        <span className="inline-block text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          Thành viên
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> {member.phone}
                  </span>
                  <span>Gia nhập: {member.joinedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: SCHEDULES & ATTENDANCE ================= */}
      {activeTab === 'schedules' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Lịch Trận & Điểm Danh Đội Hình</h3>
              <p className="text-xs text-slate-500">
                Thành viên bấm nút điểm danh để đội trưởng chốt danh sách đi đá đúng giờ.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddScheduleModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm lịch trận</span>
            </button>
          </div>

          <div className="space-y-4">
            {team.schedules.map((match) => (
              <div
                key={match.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                  match.status === 'upcoming'
                    ? 'border-emerald-200 hover:border-emerald-400'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Match Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          match.type === 'friendly'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : match.type === 'internal'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {match.type === 'friendly'
                          ? 'Giao hữu đối ngoại'
                          : match.type === 'internal'
                          ? 'Đá tập nội bộ'
                          : 'Giải đấu'}
                      </span>

                      {match.status === 'upcoming' ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Đang mở điểm danh
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          Đã kết thúc {match.result && `(${match.result})`}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{match.title}</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          Thời gian: <strong className="text-slate-800">{match.date} ({match.time})</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          Địa điểm: <strong className="text-slate-800">{match.pitchName}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          Kinh phí dự kiến: <strong className="text-slate-800">{match.estimatedFee.toLocaleString('vi-VN')}đ</strong> (chia đều)
                        </span>
                      </div>
                      {match.opponentName && (
                        <div className="flex items-center gap-1.5">
                          <Swords className="w-3.5 h-3.5 text-rose-500" />
                          <span>
                            Đối thủ: <strong className="text-slate-800">{match.opponentName}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Attendance Voting Bar */}
                  {match.status === 'upcoming' && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3 min-w-[240px]">
                      <div className="text-center w-full">
                        <div className="text-xs font-semibold text-slate-500">Trạng thái của bạn:</div>
                        <div className="mt-1 flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleVoteAttendance(match.id, 'going')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              match.userStatus === 'going'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                            }`}
                          >
                            ✓ Tham gia
                          </button>

                          <button
                            type="button"
                            onClick={() => handleVoteAttendance(match.id, 'tentative')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              match.userStatus === 'tentative'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300'
                            }`}
                          >
                            ? Chưa chắc
                          </button>

                          <button
                            type="button"
                            onClick={() => handleVoteAttendance(match.id, 'absent')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              match.userStatus === 'absent'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-rose-300'
                            }`}
                          >
                            ✕ Báo bận
                          </button>
                        </div>
                      </div>

                      {/* Attendance Stats badge */}
                      <div className="flex items-center gap-3 text-xs w-full justify-center pt-2 sm:pt-0 lg:pt-2 border-t sm:border-t-0 lg:border-t border-slate-200">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Có mặt: {match.goingCount}
                        </span>
                        <span className="text-rose-600 font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Vắng: {match.absentCount}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: TEAM FUND ================= */}
      {activeTab === 'funds' && (
        <div className="space-y-6">
          {/* Top balance summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Số dư quỹ hiện tại</span>
              <div className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                <span>{team.fundBalance.toLocaleString('vi-VN')}</span>
                <span className="text-sm font-bold text-slate-500">VNĐ</span>
              </div>
              <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Quỹ minh bạch & thủ quỹ cập nhật
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Tổng thu gần nhất</span>
              <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5" />
                <span>+2.900.000</span>
                <span className="text-sm font-bold text-slate-500">VNĐ</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">Từ đóng quỹ tháng & giải thưởng</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Tổng chi gần nhất</span>
              <div className="text-2xl font-black text-rose-500 mt-1 flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                <span>-480.000</span>
                <span className="text-sm font-bold text-slate-500">VNĐ</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">Tiền sân giao hữu & nước uống</div>
            </div>
          </div>

          {/* Transactions History */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Nhật Ký Thu Chi Quỹ Đội</h4>
                <p className="text-xs text-slate-500">Mọi khoản chi tiêu đều được lưu vết minh bạch</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddFundModal(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                + Ghi khoản mới
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {team.funds.map((fund) => (
                <div key={fund.id} className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        fund.type === 'income'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {fund.type === 'income' ? (
                        <ArrowDownRight className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{fund.title}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Bởi: {fund.person}</span>
                        <span>•</span>
                        <span>{fund.date}</span>
                        {fund.note && (
                          <>
                            <span>•</span>
                            <span className="italic text-slate-400">{fund.note}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`text-xs sm:text-sm font-black whitespace-nowrap ${
                      fund.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {fund.type === 'income' ? '+' : '-'}
                    {fund.amount.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SETTINGS ================= */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-3xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Cài Đặt Hồ Sơ Đội Bóng</h3>
            <p className="text-xs text-slate-500">Chỉnh sửa thông tin hiển thị trên cộng đồng</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              showToast('Đã lưu thông tin cài đặt đội bóng!')
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tên đội bóng</label>
              <input
                type="text"
                value={team.name}
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Khẩu hiệu / Slogan</label>
              <input
                type="text"
                value={team.slogan}
                onChange={(e) => setTeam({ ...team, slogan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Sân nhà (ruột)</label>
                <input
                  type="text"
                  value={team.homePitch}
                  onChange={(e) => setTeam({ ...team, homePitch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quận / Huyện</label>
                <input
                  type="text"
                  value={team.district}
                  onChange={(e) => setTeam({ ...team, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= MODAL: CREATE TEAM ================= */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Tạo Đội Bóng Mới</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateTeamModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên Đội Bóng (FC...) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: FC Bách Khoa All Stars"
                  value={formTeamName}
                  onChange={(e) => setFormTeamName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tên viết tắt</label>
                  <input
                    type="text"
                    placeholder="VD: FC BK"
                    value={formShortName}
                    onChange={(e) => setFormShortName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trình độ thi đấu</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as MatchLevel)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  >
                    <option value="Yếu / Mới tập">Yếu / Mới tập</option>
                    <option value="Trung bình yếu">Trung bình yếu</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Khá">Khá</option>
                    <option value="Bán chuyên">Bán chuyên</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Khẩu hiệu / Slogan</label>
                <input
                  type="text"
                  placeholder="VD: Đoàn kết là sức mạnh"
                  value={formSlogan}
                  onChange={(e) => setFormSlogan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sân nhà thường đá</label>
                  <input
                    type="text"
                    value={formHomePitch}
                    onChange={(e) => setFormHomePitch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Thể thức sở trường</label>
                  <select
                    value={formPitchType}
                    onChange={(e) => setFormPitchType(e.target.value as PitchType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  >
                    <option value="Sân 5">Sân 5 người</option>
                    <option value="Sân 7">Sân 7 người</option>
                    <option value="Sân 11">Sân 11 người</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quận / Huyện</label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Màu áo chính</label>
                  <input
                    type="text"
                    value={formKitPrimary}
                    onChange={(e) => setFormKitPrimary(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Màu áo phụ</label>
                  <input
                    type="text"
                    value={formKitSecondary}
                    onChange={(e) => setFormKitSecondary(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateTeamModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/30 cursor-pointer"
                >
                  Xác nhận tạo đội
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: INVITE / ADD MEMBER ================= */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Mời / Thêm Thành Viên</h3>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Share Code */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
              <span className="text-xs text-slate-500 font-medium">Mã mời nhanh vào đội bóng:</span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-lg font-black text-emerald-600 bg-white px-4 py-1 rounded-xl border border-emerald-200">
                  {team.inviteCode}
                </span>
                <button
                  type="button"
                  onClick={copyInviteCode}
                  className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                  title="Sao chép mã"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-slate-400 text-xs">Hoặc thêm trực tiếp</span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên cầu thủ *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Trần Văn Bình"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Số điện thoại</label>
                <input
                  type="text"
                  placeholder="0988 xxx xxx"
                  value={newMemberPhone}
                  onChange={(e) => setNewMemberPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vị trí sở trường</label>
                  <select
                    value={newMemberPos}
                    onChange={(e) => setNewMemberPos(e.target.value as PlayerPosition)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  >
                    <option value="Thủ môn">Thủ môn</option>
                    <option value="Hậu vệ">Hậu vệ</option>
                    <option value="Tiền vệ">Tiền vệ</option>
                    <option value="Tiền đạo">Tiền đạo</option>
                    <option value="Tự do">Tự do</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số áo</label>
                  <input
                    type="number"
                    value={newMemberNum}
                    onChange={(e) => setNewMemberNum(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
                >
                  Thêm thành viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD SCHEDULE ================= */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Lên Lịch Trận Mới & Mở Điểm Danh</h3>
              <button
                type="button"
                onClick={() => setShowAddScheduleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiêu đề trận *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Giao lưu tuần này với FC Bạn Bè"
                  value={schTitle}
                  onChange={(e) => setSchTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hình thức</label>
                  <select
                    value={schType}
                    onChange={(e) => setSchType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  >
                    <option value="friendly">Giao hữu bắt đối</option>
                    <option value="internal">Đá tập nội bộ</option>
                    <option value="tournament">Trận đấu giải</option>
                  </select>
                </div>

                {schType === 'friendly' && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tên đội đối thủ</label>
                    <input
                      type="text"
                      placeholder="VD: FC Dịch Vọng"
                      value={schOpponent}
                      onChange={(e) => setSchOpponent(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ngày thi đấu</label>
                  <input
                    type="text"
                    value={schDate}
                    onChange={(e) => setSchDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khung giờ</label>
                  <input
                    type="text"
                    value={schTime}
                    onChange={(e) => setSchTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sân bóng</label>
                <input
                  type="text"
                  value={schPitch}
                  onChange={(e) => setSchPitch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa chỉ sân</label>
                <input
                  type="text"
                  value={schAddress}
                  onChange={(e) => setSchAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kinh phí dự kiến (tiền sân)</label>
                <input
                  type="number"
                  value={schFee}
                  onChange={(e) => setSchFee(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddScheduleModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
                >
                  Lưu & Mở Điểm Danh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD FUND ================= */}
      {showAddFundModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Ghi Chép Thu / Chi Quỹ</h3>
              <button
                type="button"
                onClick={() => setShowAddFundModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFund} className="space-y-3 text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFundType('income')}
                  className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                    fundType === 'income'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ArrowDownRight className="w-4 h-4" /> Thu tiền quỹ (+)
                </button>

                <button
                  type="button"
                  onClick={() => setFundType('expense')}
                  className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                    fundType === 'expense'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" /> Chi tiêu quỹ (-)
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung thu/chi *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Thu quỹ tháng 11, hoặc Mua nước chanh muối"
                  value={fundTitle}
                  onChange={(e) => setFundTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Số tiền (VNĐ) *</label>
                <input
                  type="number"
                  required
                  step={10000}
                  value={fundAmount}
                  onChange={(e) => setFundAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Người phụ trách / Người nộp</label>
                <input
                  type="text"
                  value={fundPerson}
                  onChange={(e) => setFundPerson(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi chú thêm</label>
                <input
                  type="text"
                  placeholder="Ghi chú chi tiết nếu có"
                  value={fundNote}
                  onChange={(e) => setFundNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddFundModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
                >
                  Xác nhận lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
