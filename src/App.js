import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
function App() {

  const [ busqueda, guardarBusqueda] = useState('');
  const [ imagenes, guardarImagenes] = useState([]);
  const [ paginaactual, guardaPaginasActuales] = useState(1);
  const [ totalpaginas, guardaTotalPaginas] = useState(1);
  useEffect(() => {
      const consultarApi = async ( ) => {
        if(busqueda === ''){
          return;
        }
        const imagenesPorPagina = 30;
        const key = '20144728-ec48f13e47a042381e9e7e98e';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=photo&per_page=${imagenesPorPagina}&page=${paginaactual}`; 
    
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarImagenes(resultado.hits);
        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
        console.log(calcularTotalPaginas);
        guardaTotalPaginas(calcularTotalPaginas);

        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior:'smooth'})
      }
      consultarApi()
  }, [busqueda, paginaactual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0 ) return;
    guardaPaginasActuales(nuevaPaginaActual);
  }
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpaginas ) return;
    guardaPaginasActuales(nuevaPaginaActual);
  }
  return (
    <div className='container'>
      <div className='jumbotron'>
          <p className='lead text-center'>Buscador de Imagenes</p>
          <Formulario
            guardarBusqueda = {guardarBusqueda}
          />
      </div>
      <div className='justify-conent-center row'>
          <ListadoImagenes
            imagenes = {imagenes}
          />
          {(paginaactual === 1) ? null : <button
            type='button'
            className='btn btn-info mr-1'
            onClick= {paginaAnterior}
          >
           &laquo; Anterior 
          </button>}
          {(paginaactual > totalpaginas) ? null : <button
            type='button'
            className='btn btn-info '
            onClick= {paginaSiguiente}
          >
            Siguiente &raquo;
          </button>}

      </div>
    </div>
  );
}

export default App;
