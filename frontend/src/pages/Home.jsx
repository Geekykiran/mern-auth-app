import React from 'react'
import { useAuth } from '../context/Auth'

const Home = () => {
  let { user, token, logout } = useAuth()
  console.log(user);
  console.log(token);
  return (
    <>
      <div className="bg-amber-200 text-4xl flex justify-around"><p>Welcome {user?.username}</p>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl border-4"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </>
  )
}

export default Home