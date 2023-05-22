import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function InternalPage () {
  return (
      <div className="hero h-4/5 bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
            <Link to="/app/cardboard"><button className="btn bg-base-100 btn-outline">Get Started</button></Link>
        </div>
      </div>
    </div>
  )
}

export default InternalPage
