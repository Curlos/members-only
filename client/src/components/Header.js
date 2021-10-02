import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div class="headerContainer">
      <span>OnlyVaxxed 💉</span>
      <span class="right">
        <Link to="/login">Log In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </span>
    </div>
  )
}

export default Header;