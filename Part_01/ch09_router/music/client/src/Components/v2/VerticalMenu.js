import React from 'react';

import { Link } from 'react-router-dom';

import '../styles/VerticalMenu.css';

const VerticalMenu = ({ albums, albumsPathname }) => (
  <div className='ui secondary vertical menu'>
    <div className='header item'>
      Albums
    </div>
    {/* Render album menu here */}
    {
      albums.map((album)=>(
        <Link to={`${albumsPathname}/${album.id}`}
          className='item'
          key={album.id}>
            {album.name}
        </Link>
      ))
    }
  </div>
);

export default VerticalMenu;
