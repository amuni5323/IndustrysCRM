'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

interface RoleCardProps {
  role: 'company' | 'employee' | 'customer'
  imageSrc: string
  label: string
}

export default function RoleCard({ role, imageSrc, label }: RoleCardProps) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    router.push(`/${role}`)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="cursor-pointer w-72 rounded-xl overflow-hidden shadow-lg relative bg-white transition-transform hover:scale-105"
    >
      <Image
        src={imageSrc}
        alt={label}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-sm text-gray-600">
          Click here to start with your choice
        </p>
      </div>
      {hovered && (
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-md shadow hover:bg-zinc-700"
        >
          Start
        </button>
      )}
    </div>
  )
}
