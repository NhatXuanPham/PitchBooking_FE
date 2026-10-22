export type PitchType = 'Sân 5' | 'Sân 7' | 'Sân 11'

export interface Pitch {
  id: string
  name: string
  address: string
  district: string
  city: string
  priceRange: string
  minPrice: number
  maxPrice: number
  rating: number
  reviewCount: number
  image: string
  types: PitchType[]
  amenities: string[]
  phone: string
  openingHours: string
  description: string
  isFeatured?: boolean
}

export interface TimeSlot {
  id: string
  time: string
  price: number
  status: 'available' | 'booked'
  subPitchName: string
}

export type MatchLevel = 'Yếu / Mới tập' | 'Trung bình yếu' | 'Trung bình' | 'Khá' | 'Bán chuyên'
export type BetType = '5-5 tiền sân' | 'Thua trả tiền sân' | 'Giao lưu vui vẻ'

export interface MatchRequest {
  id: string
  teamName: string
  contactPerson: string
  phone: string
  level: MatchLevel
  time: string
  date: string
  pitchName: string
  district: string
  city: string
  pitchType: PitchType
  betType: BetType
  note: string
  createdAt: string
  status: 'finding' | 'matched'
}

export interface BookingHistory {
  id: string
  bookingCode: string
  pitchName: string
  subPitch: string
  date: string
  time: string
  totalPrice: number
  status: 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export interface UserProfile {
  fullName: string
  phone: string
  email: string
  city: string
  district: string
  teamName: string
  preferredPosition: string
  avatarUrl: string
}

export type TeamMemberRole = 'captain' | 'vice_captain' | 'member'
export type PlayerPosition = 'Thủ môn' | 'Hậu vệ' | 'Tiền vệ' | 'Tiền đạo' | 'Tự do'
export type AttendanceStatus = 'going' | 'absent' | 'tentative' | 'unconfirmed'

export interface TeamMember {
  id: string
  name: string
  phone: string
  avatar: string
  role: TeamMemberRole
  position: PlayerPosition
  jerseyNumber: number
  joinedDate: string
  attendance?: AttendanceStatus
}

export interface TeamScheduleMatch {
  id: string
  title: string
  type: 'friendly' | 'internal' | 'tournament'
  opponentName?: string
  pitchName: string
  pitchAddress: string
  date: string
  time: string
  estimatedFee: number
  status: 'upcoming' | 'finished' | 'cancelled'
  result?: string
  goingCount: number
  absentCount: number
  userStatus?: AttendanceStatus
}

export interface TeamFundTransaction {
  id: string
  type: 'income' | 'expense'
  title: string
  amount: number
  date: string
  person: string
  note?: string
}

export interface Team {
  id: string
  name: string
  shortName: string
  slogan: string
  logo: string
  coverImage: string
  establishedYear: string
  homePitch: string
  district: string
  city: string
  level: MatchLevel
  preferredPitchType: PitchType
  primaryKitColor: string
  secondaryKitColor: string
  membersCount: number
  matchesPlayed: number
  winRate: number
  fundBalance: number
  captainName: string
  captainPhone: string
  inviteCode: string
  members: TeamMember[]
  schedules: TeamScheduleMatch[]
  funds: TeamFundTransaction[]
}
