import React from 'react';

import LinksList from './linkslist';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// Stateless Functional Component
export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links"/>
        <div className="page-content">
          <LinksListFilters/>
          <AddLink/>
          <LinksList/>
        </div>
    </div>
  );
};
