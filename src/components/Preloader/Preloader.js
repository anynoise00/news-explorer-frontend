import './Preloader.css';

function Preloader(props) {
  return (
    <div className='section preloader'>
      <div className='preloader__loader' />
      <h2 className='preloader__text'>Procurando notícias...</h2>
    </div>
  );
}

export default Preloader;
