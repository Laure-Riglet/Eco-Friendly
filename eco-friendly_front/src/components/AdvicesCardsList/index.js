/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '../Card';

import './styles.scss';

function AdvicesCardsList({ advices }) {
  return (
    <div className="advices">
      <h2 className="advices-sentence">Suivez vos conseils</h2>
      <div className="advices-list">
        {advices.map((advice) => (
          <Link
            to={`/conseils/${advice.slug}`}
            key={advice.id}
            className="advice-card"
          >
            <Card
              title={advice.title}
              category={advice.category}
              content={advice.content}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

AdvicesCardsList.propTypes = {
  advices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.object.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AdvicesCardsList;
