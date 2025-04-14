'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const roles = [
  {
    value: 'company',
    label: 'Company',
    image: '/images/CompanyLogo.png',
    description: 'Manage your industrial profile and services.',
  },
  {
    value: 'employee',
    label: 'Employee',
    image: '/images/employeeLogo.png',
    description: 'Access tools and view assigned projects.',
  },
  {
    value: 'customer',
    label: 'Customer',
    image: '/images/customerlogo.png',
    description: 'Explore services and make service requests.',
  },
]

export default function RadioCardSelector() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleStart = () => {
    if (selectedRole) {
      router.push(`/${selectedRole}`)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-10">
      {roles.map((role) => (
        <motion.div
          key={role.value}
          whileHover={{ scale: 1.05 }}
          className={`relative border-2 rounded-2xl overflow-hidden shadow-md cursor-pointer transition ${
            selectedRole === role.value ? 'border-zinc-800' : 'border-gray-300'
          }`}
          onClick={() => setSelectedRole(role.value)}
        >
          <Image
            src={role.image}
            alt={role.label}
            width={500}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">{role.label}</h3>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>

          {selectedRole === role.value && (
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={handleStart}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-5 py-2 rounded-md shadow-lg hover:bg-zinc-700"
            >
              Start
            </motion.button>
          )}
        </motion.div>
      ))}
    </div>
  )
}
