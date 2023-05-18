import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#333] text-white px-4 md:px-8 py-4 flex flex-wrap justify-between items-center">
      <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
        <a
          href="https://www.vodafone.com.tr/web-sitesi-kullanimi-hukum-ve-sartlari"
          target="_blank"
          rel="noreferrer"
          className="underline text-xs md:text-base"
        >
          Web Sitesi Kullanımı Hüküm ve Şartları
        </a>
        <span className="hidden md:block border-l border-white h-4"></span>
        <a
          href="https://www.vodafone.com.tr/VodafoneHakkinda/gizlilik-ve-guvenlik-politikalari"
          target="_blank"
          rel="noreferrer"
          className="text-xs md:text-base underline"
        >
          Gizlilik Politikası
        </a>
      </div>
      <div className="mt-2 md:mt-0 text-xs md:text-base">
        &copy; 2023 Vodafone Türkiye
      </div>
    </div>
  )
}

export default Footer
