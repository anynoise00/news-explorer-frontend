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

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(undefined);

  const [username, setUsername] = useState('Usuário');
  const [savedArticles, setSavedArticles] = useState([]);

  function handleLogin(credentials) {
    mainApi
      .login(credentials)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        signIn().then(() => {
          openInfoModal(data.message);
        });
      })
      .catch((err) => {
        openInfoModal('Credenciais inválidas ou incorretas.');
      });
  }

  function handleRegister(credentials) {
    mainApi
      .register(credentials)
      .then((_) => {
        openInfoModal(
          'Cadastro concluído com sucesso!',
          <Link className='link' onClick={openLoginModal}>
            Entrar
          </Link>
        );
      })
      .catch((err) => {
        openInfoModal('Falha ao se cadastrar.');
      });
  }

  function signIn() {
    return mainApi
      .getCurrentUser()
      .then((user) => {
        setUsername(user.data.name);
        mainApi.getSavedArticles().then((articles) => {
          setSavedArticles(articles);
        });
        setLoggedIn(true);
      })
      .catch(() => {});
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setSavedArticles([]);
    setLoggedIn(false);
    navigate('/');
  }

  function openInfoModal(header, info = undefined) {
    setModal(<InfoModal onClose={closeModal} header={header} info={info} />);
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
    mainApi
      .saveArticle(article)
      .then((a) => {
        setSavedArticles([a.data, ...savedArticles]);
      })
      .catch(() => {
        openInfoModal('Não foi possível salvar o artigo.');
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
        openInfoModal('Não foi possível deletar o artigo.');
      });
  }

  useEffect(() => {
    signIn();
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
              <ProtectedRoute loggedIn={loggedIn}>
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

        {modal && modal}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
