import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}

export default Header;
