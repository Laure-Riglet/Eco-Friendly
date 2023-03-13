import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default function Page({ children }) {
  /**
   * Scrolltop :
   * Automatically positions the scroll bar at the top of the window at each page change
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  return <main className="main">{children}</main>;
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
