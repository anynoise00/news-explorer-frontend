import { useState } from 'react';
import Search from '../Search/Search';
import News from '../News/News';
import Preloader from '../Preloader/Preloader';
import NewsNotFound from '../NewsNotFound/NewsNotFound';
import NewsError from '../NewsError/NewsError';
import About from '../About/About';

import newsApi from '../../utils/NewsApi';

function Main(props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(undefined);

  function formatDate(date) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleDateString('pt-br', options);
  }

  function search(q) {
    if (q === '') {
      props.onError('Por favor, insira uma palavra-chave');
      return;
    }

    setQuery(q);
    setLoading(true);

    newsApi
      .getNews(q)
      .then((data) => {
        const keyword = q[0].toUpperCase() + q.slice(1).toLowerCase();

        const filteredArticles = data.articles.filter(
          (a) => a.title !== '[Removed]'
        );

        const formattedArticles = filteredArticles.map((a) => {
          const formatted = {
            keyword,
            title: a.title,
            text: a.description,
            date: formatDate(new Date(a.publishedAt)),
            source: a.source.name,
            link: a.url,
            image: a.urlToImage,
          };

          return formatted;
        });

        setArticles(formattedArticles);
      })
      .catch((err) => {
        setArticles(undefined);
      })
      .finally((_) => setLoading(false));
  }

  return (
    <>
      <Search onSearch={search} />

      {query !== '' &&
        (loading ? (
          <Preloader />
        ) : articles ? (
          articles.length > 0 ? (
            <News articles={articles} query={query} {...props} />
          ) : (
            <NewsNotFound />
          )
        ) : (
          <NewsError />
        ))}

      <About />
    </>
  );
}

export default Main;
