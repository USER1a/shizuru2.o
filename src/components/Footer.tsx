import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800 mt-auto py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block w-fit">
              <Image
                src="/icons/favicon-32x32.png"
                alt="Shizuru Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for anime and manga. Experience seamless streaming with our modern, fast, and intuitive platform designed for the community.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-lg font-semibold">Navigation</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/discover" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Discover</Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Schedule</Link>
              </li>
              <li>
                <Link href="/manga" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">Manga</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white text-lg font-semibold">Community</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link 
                  href="https://dcd.gg/shizuru" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-purple-400 transition-colors"
                >
                  <span>Discord</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-purple-400 transition-colors"
                >
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-purple-400 transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Shizuru. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}