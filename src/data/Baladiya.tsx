'use client'

import citiesData from './algerianCities.json'

interface BaladiyaProps {
  wilaya: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export default function Baladiya({ 
  wilaya, 
  value, 
  onChange, 
  placeholder = "اختر البلدية...", 
  required = false,
  className = "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A38151] focus:border-transparent"
}: BaladiyaProps) {
  const baladiyas = citiesData[wilaya as keyof typeof citiesData] || []

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">البلدية</label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        disabled={!wilaya}
      >
        <option value="">{placeholder}</option>
        {baladiyas.map((baladiya) => (
          <option key={baladiya} value={baladiya}>
            {baladiya}
          </option>
        ))}
      </select>
    </div>
  )
}
