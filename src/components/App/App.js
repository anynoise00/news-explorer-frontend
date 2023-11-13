import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import InfoModal from '../InfoModal/InfoModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(undefined);
  const [savedArticles, setSavedArticles] = useState([]);

  function handleLogin() {
    setLoggedIn(true);
    closeModal();
  }

  function handleLogout() {
    setLoggedIn(false);
    navigate('/');
  }

  function handleRegister() {
    setModal(
      <InfoModal
        onClose={closeModal}
        header={'Cadastro concluído com sucesso!'}
        info={
          <Link className='link' onClick={openLoginModal}>
            Entrar
          </Link>
        }
      />
    );
  }

  function openErrorModal(error) {
    setModal(<InfoModal onClose={closeModal} header={error} />);
  }

  function openLoginModal() {
    setModal(
      <LoginModal
        onSubmit={handleLogin}
        onClose={closeModal}
        onLinkClick={openRegisterModal}
      />
    );
  }

  function openRegisterModal() {
    setModal(
      <RegisterModal
        onSubmit={handleRegister}
        onClose={closeModal}
        onLinkClick={openLoginModal}
      />
    );
  }

  function closeModal() {
    setModal(undefined);
  }

  function saveArticle(article) {
    const articles = [article, ...savedArticles];
    storeSavedArticles(articles);
  }

  function removeSavedArticle(article) {
    const articles = savedArticles.filter((a) => a.url !== article.url);
    storeSavedArticles(articles);
  }

  function storeSavedArticles(articles) {
    localStorage.setItem('savedArticles', JSON.stringify(articles));
    setSavedArticles(articles);
  }

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('savedArticles'));
    setSavedArticles(storedArticles ?? []);
  }, []);

  useEffect(() => {
    const escClose = (ev) => {
      if (ev.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', escClose);

    return () => {
      document.removeEventListener('keydown', escClose);
    };
  });

  return (
    <div className='page'>
      <Header
        loggedIn={loggedIn}
        onLogin={openLoginModal}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path='/saved-news'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedNews
                savedArticles={savedArticles}
                onRemoveSavedArticle={removeSavedArticle}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <Main
              loggedIn={loggedIn}
              onLoginClick={openLoginModal}
              onError={openErrorModal}
              savedArticles={savedArticles}
              onSaveArticle={saveArticle}
              onRemoveSavedArticle={removeSavedArticle}
            />
          }
        />
      </Routes>
      <Footer />

      {modal && modal}
    </div>
  );
}

export default App;
