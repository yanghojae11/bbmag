'use client'

import { useState } from 'react'
import { User, Mail, Phone, Camera, Edit } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  })

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center h-96">
          <User className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            프로필을 보려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? '취소' : '프로필 편집'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">이름</Label>
                <div className="mt-1">
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{user.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">이메일</Label>
                <div className="mt-1">
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">전화번호</Label>
                <div className="mt-1">
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="전화번호를 입력하세요"
                    />
                  ) : (
                    <div className="flex items-center gap-3 py-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-500">
                        {formData.phone || '전화번호가 등록되지 않았습니다'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    저장하기
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    취소
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">계정 설정</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium">알림 설정</h3>
                  <p className="text-sm text-gray-600">예약 확인, 프로모션 등의 알림을 받습니다</p>
                </div>
                <Button variant="outline" size="sm">설정</Button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium">비밀번호 변경</h3>
                  <p className="text-sm text-gray-600">계정 보안을 위해 정기적으로 변경하세요</p>
                </div>
                <Button variant="outline" size="sm">변경</Button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium">계정 삭제</h3>
                  <p className="text-sm text-gray-600">계정과 모든 데이터가 영구 삭제됩니다</p>
                </div>
                <Button variant="destructive" size="sm">삭제</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
