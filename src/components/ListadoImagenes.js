import React from 'react';
import Imagen from './imagenes';

const ListadoImagenes = ({imagenes}) => {
    return ( 
        <div className='col-12 [-5 row'>
           {imagenes.map(imagen => (
               <Imagen
                key = {imagen.id}
                imagen = {imagen}
               />
           ))}  
        </div>
     );
}
 
export default ListadoImagenes;