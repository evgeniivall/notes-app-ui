import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../../icons/icons';
import { isMobileDevice } from '../../utils/helpers';
import Button from '../../ui/Button';
import styles from './BreadCrumbs.module.css';

const BreadCrumbs = ({ folder, noteTitle }) => {
  const navigate = useNavigate();

  const renderBackButton = () => (
    <Button
      icon={<ArrowIcon style={{ transform: 'rotate(180deg)' }} />}
      type="secondary"
      size="medium"
      onClick={() => navigate(-1)}
    />
  );

  const renderBreadcrumbs = () => {
    const crumbs = [
      { label: 'Notes', link: '/notes' },
      ...(folder
        ? [{ label: folder.name, link: `/notes?folders=${folder.id}` }]
        : []),
      { label: noteTitle },
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
        <span className={styles.crumb}>{noteTitle}</span>
      ) : (
        renderBreadcrumbs()
      )}
    </nav>
  );
};

export default BreadCrumbs;
