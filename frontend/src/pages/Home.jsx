import React from 'react'
import { useAuth } from '../context/Auth'

const Home = () => {
  let {name} = useAuth()
  return (
    <div className='bg-amber-200 text-4xl flex justify-around'>Welcome {name}</div>
  )
}

export default Home