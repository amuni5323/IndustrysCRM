import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo and Name */}
        <div className="flex flex-col items-start space-y-2">
          <img  src="/images/CompanyLogo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-lg font-semibold">Industrial CRM</span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 justify-start">
          <FaFacebook className="hover:text-blue-500 cursor-pointer" />
          <FaTwitter className="hover:text-blue-300 cursor-pointer" />
          <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-zinc-400">
        &copy; {new Date().getFullYear()} Industrial CRM. All rights reserved.
      </div>
    </footer>
  )
}
