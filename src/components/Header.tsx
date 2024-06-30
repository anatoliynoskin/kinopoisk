import { Link } from "react-router-dom"
import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.link} to={'/'}>Movies</Link>
    </header>
  )
}

export default Header