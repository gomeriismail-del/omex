'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import NotificationModal from '@/components/NotificationModal'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح'
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const response = await fetch('https://dmtart.pro/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log('Login response:', data)

      if (response.ok && data.token) {
        // Store token and user info in both localStorage and cookie
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userInfo', JSON.stringify(data.user))
        
        // Set cookie for middleware
        document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`
        
        setModalMessage('تم تسجيل الدخول بنجاح!')
        setIsError(false)
        setShowModal(true)
        
        // Redirect to dashboard after modal
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1500)
      } else {
        setModalMessage(data.message || 'فشل تسجيل الدخول')
        setIsError(true)
        setShowModal(true)
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setModalMessage('حدث خطأ أثناء تسجيل الدخول')
      setIsError(true)
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <>
      {/* Notification Modal */}
      <NotificationModal 
        show={showModal} 
        message={modalMessage}
        isError={isError}
        onClose={() => setShowModal(false)}
      />
      
      <div className="min-h-screen mt-10 bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="floating-circle floating-circle-1"></div>
        <div className="floating-circle floating-circle-2"></div>
        <div className="floating-circle floating-circle-3"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Back to home */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </Link>

          <div className="max-w-md mx-auto">
            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-amber-100 p-8 animate-fadeIn">
              {/* Logo/Brand */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بعودتك</h1>
                <p className="text-gray-600">سجل دخولك لحسابك</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pr-10 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

              
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري تسجيل الدخول...</span>
                    </div>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </button>
              </form>

             

             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
