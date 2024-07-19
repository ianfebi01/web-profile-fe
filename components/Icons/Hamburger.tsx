'use client';
import '@/assets/scss/components/hamburger.scss'

const Hamburger = () => {

  return (
    <>

      <div className="menu cross menu--2">
        <label>
          <input
            type="checkbox"
          />
          <svg viewBox="25 25 50 50"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="line--1"
              d="M0 70l28-28c2-2 2-2 7-2h64"
            />
            <path className="line--2"
              d="M0 50h99"
            />
            <path className="line--3"
              d="M0 30l28 28c2 2 2 2 7 2h64"
            />
          </svg>
        </label>
      </div>

    </>
  )
}

export default Hamburger
