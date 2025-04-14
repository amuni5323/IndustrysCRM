'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'Company',
    image: '/images/CompanyLogo.png',
    link: '/company',
  },
  {
    title: 'Employee',
    image: '/images/employeeLogo.png',
    link: '/employee',
  },
  {
    title: 'Customer',
    image: '/images/customerlogo.png',
    link: '/customer',
  },
]

export default function Cards() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-10">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="relative group bg-white shadow-xl rounded-2xl overflow-hidden transition"
        >
          <Image
            src={card.image}
            alt={card.title}
            width={500}
            height={300}
            className="w-full h-64 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </div>

          {/* Hover button from behind */}
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(card.link)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-5 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100"
          >
            Start
          </motion.button>
        </motion.div>
      ))}
    </div>
  )
}
