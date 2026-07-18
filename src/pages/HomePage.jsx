import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <div>Hello World</div>
      <nav>
        <Link to="/overview">Overview</Link>
        <Link to="/log">Log</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  )
}

export default HomePage
