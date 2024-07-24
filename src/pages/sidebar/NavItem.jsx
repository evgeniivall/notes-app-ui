import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './NavItem.module.css';

function NavItem({ icon, label, to, query }) {
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

  return (
    <NavLink
      to={to + (query ? `?${query.key}=${query.value}` : '')}
      className={getClassName}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
}

export default NavItem;
