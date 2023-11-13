import { useState } from 'react';
import './Search.css';

function Search(props) {
  const [query, setQuery] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    props.onSearch(query);
  }

  return (
    <div className='section search'>
      <h1 className='search__header'>O que está acontecendo no mundo?</h1>
      <h2 className='search__subheader'>
        Encontre as últimas notícias sobre qualquer tema e salve elas em sua
        conta pessoal
      </h2>

      <form name='search-form' className='search-bar' onSubmit={handleSearch}>
        <input
          type='text'
          className='search-bar__field'
          placeholder='Inserir tema'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className='btn btn_type_submit search-bar__btn'>
          Procurar
        </button>
      </form>
    </div>
  );
}

export default Search;
