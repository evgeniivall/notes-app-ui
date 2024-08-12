import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styles from './NavItem.module.css';

function NavItem({ icon, label, to, query }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const getClassName = ({ isActive }) => {
    let className = styles.navItem + ' ';
    if (isActive) {
      const hasNoSearchParams = !searchParams.get('filter');
      const isQueryMatch = query && searchParams.get(query.key) === query.value;

      if ((hasNoSearchParams && !query) || isQueryMatch) {
        className += styles.active;
      }
    }

    return className;
  };

  const newSearchParams = new URLSearchParams(location.search);

  if (query) {
    newSearchParams.set(query.key, query.value);
  } else {
    newSearchParams.delete('filter');
  }

  return (
    <NavLink
      to={{ pathname: to, search: newSearchParams.toString() }}
      className={getClassName}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
}

export default NavItem;
