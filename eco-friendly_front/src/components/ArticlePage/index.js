/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Page from '../Page';
import AdvicesCardsList from '../AdvicesCardsList';
import Loader from '../Loader';
import { findItem } from '../../utils';

// import Button from '../Button';

import './styles.scss';

function ArticlePage() {
  const { slug } = useParams();

  const article = useSelector((state) => findItem(state.articles.data, slug));

  const advices = useSelector((state) => state.advices.data);

  return (
    <Page>
      {article ? (
        <div className="article-page">
          <div className="article">
            <div className="article-elements">
              <img
                src={article.picture}
                alt="titre"
                className="article-elements-img"
              />
              <div className="article-elements-top">
                <h2 className="article-title">{article.title}</h2>
                <span className="article-author">
                  {article.author.nickname}
                </span>
                <time className="article-date" dateTime="2023-03-13">
                  {article.created_at}
                </time>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="article-elements-text inner-html"
              />
            </div>

            {/* <Button
            type="button"
            className="article-button-return"
            // onClick="" aller à la page catégorie précédente
          /> */}
          </div>

          <AdvicesCardsList advices={advices} />
        </div>
      ) : (
        <Loader />
      )}
    </Page>
  );
}

export default ArticlePage;
