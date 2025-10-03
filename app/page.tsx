"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Cloud, Sun, CloudRain } from "lucide-react"
import { useEffect, useState } from "react"

// Helper function to calculate Easter date
function getEasterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

export default function QRLandingPage() {
  const [greeting, setGreeting] = useState({
    timeGreeting: "Hello",
    seasonEmoji: "🌍",
    weatherIcon: Sun,
  })

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date()
      const hour = now.getHours()
      const month = now.getMonth() // 0-based (0 = January)
      const day = now.getDate()

      // Time-based greeting
      let timeGreeting = "Hello"
      if (hour >= 5 && hour < 12) timeGreeting = "Good Morning"
      else if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon"
      else if (hour >= 17 && hour < 22) timeGreeting = "Good Evening"
      else timeGreeting = "Good Night"

      // Holiday detection (takes priority over seasonal emojis)
      let seasonEmoji = "🌍"
      let isHoliday = false

      // Christmas Season (December 20-26)
      if (month === 11 && day >= 20 && day <= 26) {
        seasonEmoji = "🎄"
        timeGreeting = "Merry Christmas"
        isHoliday = true
      }
      // New Year Season (December 31 - January 2)
      else if ((month === 11 && day === 31) || (month === 0 && day <= 2)) {
        seasonEmoji = "🎊"
        timeGreeting = "Happy New Year"
        isHoliday = true
      }
      // Valentine's Day (February 14)
      else if (month === 1 && day === 14) {
        seasonEmoji = "💝"
        timeGreeting = "Happy Valentine's Day"
        isHoliday = true
      }
      // Easter Season (varies, but approximate for March/April)
      else if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) {
        const easter = getEasterDate(now.getFullYear())
        if (Math.abs(now.getTime() - easter.getTime()) <= 3 * 24 * 60 * 60 * 1000) {
          seasonEmoji = "🐰"
          timeGreeting = "Happy Easter"
          isHoliday = true
        }
      }
      // Mother's Day (Second Sunday in May)
      else if (month === 4 && day >= 8 && day <= 14 && now.getDay() === 0) {
        seasonEmoji = "🌸"
        timeGreeting = "Happy Mother's Day"
        isHoliday = true
      }
      // Father's Day (Third Sunday in June)
      else if (month === 5 && day >= 15 && day <= 21 && now.getDay() === 0) {
        seasonEmoji = "👔"
        timeGreeting = "Happy Father's Day"
        isHoliday = true
      }
      // Halloween (October 31)
      else if (month === 9 && day === 31) {
        seasonEmoji = "🎃"
        timeGreeting = "Happy Halloween"
        isHoliday = true
      }

      // If not a holiday, use regular seasonal emojis (Tanzanian tropical climate)
      if (!isHoliday) {
        if ((month >= 3 && month <= 5) || (month >= 10 && month <= 12))
          seasonEmoji = "🌧️" // Long rains (March-May) & Short rains (Oct-Dec)
        else if (month >= 6 && month <= 9)
          seasonEmoji = "☀️" // Dry season (June-September)
        else if (month >= 1 && month <= 2)
          seasonEmoji = "🌤️" // Warm dry season (Jan-Feb)
        else seasonEmoji = "🌍" // Default
      }

      // Weather simulation based on Tanzanian climate patterns
      let weatherOptions = [Sun, Cloud]
      if ((month >= 3 && month <= 5) || (month >= 10 && month <= 12)) {
        // Rainy seasons - more chance of rain and clouds
        weatherOptions = [CloudRain, CloudRain, Cloud, Sun]
      } else if (month >= 6 && month <= 9) {
        // Dry season - mostly sunny with some clouds
        weatherOptions = [Sun, Sun, Sun, Cloud]
      } else {
        // Warm dry season - sunny and partly cloudy
        weatherOptions = [Sun, Sun, Cloud]
      }
      const weatherIcon = weatherOptions[Math.floor(Math.random() * weatherOptions.length)]

      setGreeting({ timeGreeting, seasonEmoji, weatherIcon })
    }

    updateGreeting()
  }, [])

  const WeatherIcon = greeting.weatherIcon

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          {/* Dynamic Greeting */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <WeatherIcon className="h-6 w-6" />
            <span className="text-lg font-medium">
              {greeting.timeGreeting} {greeting.seasonEmoji}
            </span>
          </div>

          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-24 flex items-center justify-center">
              <img src="/evmak-logo.png" alt="EvMak Logo" className="w-32 h-24" />
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              Empowering African SMEs with Nuvia Business Tool
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              From Tanzania to across Africa, EvMak's Nuvia helps small businesses manage finances, accept payments, and
              grow with confidence.
            </p>
          </div>

          <Card className="w-full p-8 space-y-6 bg-accent/5">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Download Nuvia Today</h3>
              <p className="text-muted-foreground">Get started with Africa's leading business management tool</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* App Store Button */}
              <a 
                href="https://apps.apple.com/tz/app/nuvia-business-tool/id6747385832" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 min-w-[200px]"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-lg font-semibold leading-tight">App Store</div>
                  </div>
                </div>
              </a>

              {/* Google Play Button */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.evmak.businesstool" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 min-w-[200px]"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="text-lg font-semibold leading-tight">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
          </Card>
        </div>

        {/* <div className="mt-16 max-w-2xl mx-auto">
          <Card className="p-8 space-y-6 text-center bg-primary text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold text-balance">
              Join the financial revolution for African SMEs
            </h3>
            <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed">
              Nuvia by EvMak provides digital payments, business financing, and financial management tools designed
              specifically for small and medium enterprises across Africa.
            </p>
            <div className="pt-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-base font-semibold"
                onClick={() => window.open('https://nuvia.co.tz', '_blank')}
              >
                Learn More About Nuvia
              </Button>
            </div>
          </Card>
        </div> */}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 all rights reserved. Powered by Evmak Tanzania.</p>
        </div>
      </footer>
    </div>
  )
}
