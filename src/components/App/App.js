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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/MainApi';
import {
  MSG_INVALID_CREDENTIALS,
  MSG_SUCCESSFUL_REGISTER,
  MSG_FAILED_REGISTER,
  MSG_ARTICLE_SAVE_FAIL,
  MSG_ARTICLE_DELETE_FAIL,
} from '../../utils/constants';
import { getAuthorization } from '../../utils/helpers';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  const [infoModal, setInfoModal] = useState(undefined);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [modalFormError, setModalFormError] = useState('');

  const [username, setUsername] = useState('Usuário');
  const [savedArticles, setSavedArticles] = useState([]);

  function handleLogin(credentials) {
    mainApi
      .login(credentials)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        signIn().then(() => {
          closeModals();
        });
      })
      .catch((err) => {
        setModalFormError(MSG_INVALID_CREDENTIALS);
      });
  }

  function handleRegister(credentials) {
    mainApi
      .register(credentials)
      .then((_) => {
        openInfoModal(
          MSG_SUCCESSFUL_REGISTER,
          <Link className='link' onClick={openLoginModal}>
            Entrar
          </Link>
        );
      })
      .catch((err) => {
        setModalFormError(MSG_FAILED_REGISTER);
      });
  }

  function signIn() {
    return mainApi
      .getCurrentUser()
      .then((user) => {
        setUsername(user.data.name);
        mainApi.getSavedArticles().then((articles) => {
          setSavedArticles(articles);
          setLoggedIn(true);
        });
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setSavedArticles([]);
    setLoggedIn(false);
    navigate('/');
  }

  function openInfoModal(header, info = undefined) {
    closeModals();
    setInfoModal(
      <InfoModal onClose={closeModals} header={header} info={info} />
    );
  }

  function openLoginModal() {
    closeModals();
    setLoginModalOpen(true);
  }

  function openRegisterModal() {
    closeModals();
    setRegisterModalOpen(true);
  }

  function closeModals() {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setInfoModal(undefined);

    setModalFormError('');
  }

  function saveArticle(article) {
    mainApi
      .saveArticle(article)
      .then((a) => {
        setSavedArticles([a.data, ...savedArticles]);
      })
      .catch(() => {
        openInfoModal(MSG_ARTICLE_SAVE_FAIL);
      });
  }

  function removeSavedArticle(articleId) {
    mainApi
      .deleteArticle(articleId)
      .then(() => {
        const articles = savedArticles.filter((a) => {
          return a._id !== articleId;
        });

        setSavedArticles(articles);
      })
      .catch(() => {
        openInfoModal(MSG_ARTICLE_DELETE_FAIL);
      });
  }

  useEffect(() => {
    if (getAuthorization()) {
      signIn();
    } else {
      signOut();
    }
  }, []);

  useEffect(() => {
    const escClose = (ev) => {
      if (ev.key === 'Escape') closeModals();
    };

    document.addEventListener('keydown', escClose);

    return () => {
      document.removeEventListener('keydown', escClose);
    };
  });

  return (
    <div className='page'>
      <CurrentUserContext.Provider
        value={{
          name: username,
          savedArticles: savedArticles,
        }}
      >
        <Header
          loggedIn={loggedIn}
          onLogin={openLoginModal}
          onLogout={signOut}
        />
        <Routes>
          <Route
            path='/saved-news'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                openLoginModal={openLoginModal}
              >
                <SavedNews onRemoveSavedArticle={removeSavedArticle} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/'
            element={
              <Main
                loggedIn={loggedIn}
                onLoginClick={openLoginModal}
                onError={openInfoModal}
                onSaveArticle={saveArticle}
                onRemoveSavedArticle={removeSavedArticle}
              />
            }
          />
        </Routes>
        <Footer />

        {infoModal && infoModal}

        {isLoginModalOpen && (
          <LoginModal
            onSubmit={handleLogin}
            onClose={closeModals}
            onLinkClick={openRegisterModal}
            error={modalFormError}
          />
        )}

        {isRegisterModalOpen && (
          <RegisterModal
            onSubmit={handleRegister}
            onClose={closeModals}
            onLinkClick={openLoginModal}
            error={modalFormError}
          />
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
