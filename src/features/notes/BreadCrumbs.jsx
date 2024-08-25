import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowIcon, CloseIcon } from '../../icons/icons';
import { isMobileDevice } from '../../utils/helpers';
import Button from '../../ui/Button';
import styles from './BreadCrumbs.module.css';

const BreadCrumbs = ({ folder, noteTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = noteTitle || 'New note';

  const renderBackButton = () => (
    <Button
      icon={<CloseIcon />}
      type="secondary"
      size="medium"
      onClick={() => {
        navigate({
          pathname: '/notes',
          search: searchParams.toString(),
        });
      }}
    />
  );

  const renderBreadcrumbs = () => {
    const crumbs = [
      { label: 'Notes', link: '/notes' },
      ...(folder
        ? [{ label: folder.name, link: `/notes?folders=${folder.id}` }]
        : []),
      { label: title },
    ];

    return crumbs.map((crumb, index) => (
      <React.Fragment key={index}>
        {crumb.link ? (
          <Link to={crumb.link} className={styles.linkCrumb}>
            {crumb.label}
          </Link>
        ) : (
          <span className={styles.crumb}>{crumb.label}</span>
        )}
        {index < crumbs.length - 1 && (
          <div className={styles.iconContainer}>
            <ArrowIcon className={styles.icon} />
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <nav className={styles.breadcrumbs}>
      {renderBackButton()}
      {isMobileDevice() ? (
        <span className={styles.crumb}>{title}</span>
      ) : (
        renderBreadcrumbs()
      )}
    </nav>
  );
};

export default BreadCrumbs;
