import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import RadioSelector from "@/components/RadioSelector"
import Cards from '@/components/Cards'
import RoleCard from '@/components/RoleCard'
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
  
      <div className="flex-1 p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to IndustryCRM</h1>
        <p className="text-zinc-600 mb-8">
          Manage your industrial operations with ease.
        </p>

        {/* <RadioSelector /> */}
        <div className="flex flex-col items-center mt-10 space-y-10">
      <h2 className="text-2xl font-bold">Choose your role to get started</h2>
      <div className="flex space-x-8">
        <RoleCard
          role="company"
          imageSrc="/images/CompanyLogo.png"
          label="Company"
        />
        <RoleCard
          role="employee"
          imageSrc="/images/employeeLogo.png"
          label="Employee"
        />
        <RoleCard
          role="customer"
          imageSrc="/images/customerlogo.png"
          label="Customer"
        />
      </div>
    </div>
       {/* About section */}
<section
  id="about"
  className="mt-20 max-w-3xl mx-auto text-left p-6 rounded-2xl shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg bg-white/60 backdrop-blur-md"
>
  <h2 className="text-3xl font-bold mb-4 text-blue-800">About Us</h2>
  <p className="text-zinc-700 leading-relaxed text-base">
    IndustryCRM helps businesses streamline customer, employee, and operations management. 
    Our goal is to digitize industrial workflows with modern tech and simple interfaces.
  </p>
</section>

{/* Contact section */}
<section
  id="contact"
  className="mt-10 max-w-3xl mx-auto text-left p-6 rounded-2xl shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg bg-white/60 backdrop-blur-md"
>
  <h2 className="text-3xl font-bold mb-4 text-blue-800">Contact Us</h2>
  <p className="text-zinc-700 mb-1">📧 Email: info@industrycrm.com</p>
  <p className="text-zinc-700">📞 Phone: +1 (800) 123-4567</p>
</section>

      </div>
      <Footer />
    </main>
  )
}
