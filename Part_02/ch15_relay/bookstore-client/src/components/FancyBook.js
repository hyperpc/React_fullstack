//import PropTypes from 'prop-types';
import '../styles/FancyBook.css';

export function FancyBook({book}){
    const pages = 600;
    const containerWidth=400;
    
    const aspectRatio = 1.2;
    const height = containerWidth * aspectRatio;
    const pagesScale = 0.00043 * containerWidth; // todo scale w/ containerWidth

    const bkLeftWidth = pages * pagesScale;
    const bkLeftLeft = bkLeftWidth * 0.5 * -1;
    const bkLeftZ = bkLeftLeft * 0.5;
    const bkBackZ = bkLeftWidth + bkLeftZ;
    const bkFrontZ = bkLeftZ * -1;
    
    return (
        <div className='book-container'>
          <div className='bk-book bk-bookdefault' style={{ height }}>
            <div className='bk-front' style={{
              height,
              transform: `translate3d(0,0,${bkFrontZ}px)`,
            }}
            >
              <div className='bk-cover'
                style={{
                  backgroundImage: `url('${book.coverContent}')`,
                  height,
                }}
              />
            </div>
            <div className='bk-back' style={{
              height,
              transform: `rotate3d(0,1,0,-180deg) translate3d(0,0,${bkBackZ}px)`,
            }}
            />
            <div className='bk-left' style={{
              height,
              width: bkLeftWidth,
              left: bkLeftLeft,
              transform: `translate3d(0,0,${bkLeftZ}px) rotate3d(0,1,0,-90deg)`,
            }}
            />
            <div className='bk-top' />
          </div>
        </div>
      );
}