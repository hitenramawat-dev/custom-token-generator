import { Link, useLocation } from "react-router-dom"
import { Wallet, Send, Plus, BookOpen } from "lucide-react"

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { href: "/", label: "Dashboard", icon: Wallet },
    { href: "/send", label: "Send SOL", icon: Send },
    { href: "/create-token", label: "Create Token", icon: Plus },
    { href: "/uri-guide", label: "URI Guide", icon: BookOpen },
  ]

  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white ">
           MintCraft
          </Link>

          <div className="flex space-x-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === href
                    ? "bg-gradient-to-r from-[#131212] to-[#c42e27f9] text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
