// components/layout/main-layout.tsx
'use client'

import React, { useState, createContext, useContext } from 'react'
import { Sidebar } from './sidebar'
import { Switch } from "@/components/ui/switch"
import { Globe } from 'lucide-react'
import { cn } from "@/lib/utils"

export const LanguageContext = createContext<{
  language: 'en' | 'sw'
  setLanguage: (lang: 'en' | 'sw') => void
}>({
  language: 'en',
  setLanguage: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

interface MainLayoutProps {
  children: React.ReactNode
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    alerts: 'Alerts',
    safetyMap: 'Safety Map',
    communityReports: 'Community Reports',
    calendar: 'Calendar',
    settings: 'Settings',
    help: 'Help',
    disasterAlert: 'Disaster Alert',
    chatbot: 'AI Assistant',
    resources: 'Resources'
  },
  sw: {
    dashboard: 'Dashibodi',
    alerts: 'Tahadhari',
    safetyMap: 'Ramani ya Usalama',
    communityReports: 'Ripoti za Jamii',
    calendar: 'Kalenda',
    settings: 'Mipangilio',
    help: 'Msaada',
    disasterAlert: 'Tahadhari ya Maafa',
    chatbot: 'Msaidizi wa AI',
    resources: 'Rasilimali'
  }
}

export function MainLayout({ children }: MainLayoutProps) {
  const [language, setLanguage] = useState<'en' | 'sw'>('en')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sw' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="flex h-screen bg-white">
        <Sidebar 
          translations={translations[language]}
          onCollapse={setIsSidebarCollapsed}
        />
        <div className="flex-1 overflow-auto">
          <div className="p-4 border-b">
            <div className="flex justify-end items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>{language === 'en' ? 'EN' : 'SW'}</span>
              <Switch
                checked={language === 'sw'}
                onCheckedChange={toggleLanguage}
              />
            </div>
          </div>
          <div className={cn(
            "transition-all",
            isSidebarCollapsed ? "ml-0" : "ml-0"
          )}>
            {children}
          </div>
        </div>
      </div>
    </LanguageContext.Provider>
  )
}