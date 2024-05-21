import React, { useEffect } from 'react';
import { gsap } from 'gsap';

function Test() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      let halfMaskSize = 250;
      if (window.innerWidth >= 1300) {
        halfMaskSize = 300;
      }

      let h1 = document.getElementById('heading'),
        h1Pos = h1.getBoundingClientRect(),
        h1Width = h1.offsetWidth,
        h1Height = h1.offsetHeight,
        clipX = e.clientX - h1Pos.left,
        clipY = e.clientY - h1Pos.top,
        maskX = e.clientX - h1Pos.left - halfMaskSize,
        maskY = e.clientY - h1Pos.top - halfMaskSize;

      // If cursor outside bounds of H1 set positions at bounds
      if (e.clientY <= h1Pos.top) {
        // Top
        clipY = 0;
        maskY = -halfMaskSize;
      }
      if (e.clientX >= h1Pos.left + h1Width) {
        // Right
        clipX = h1Width;
        maskX = -(halfMaskSize * 0.75) + h1Width;
      }
      if (e.clientY >= h1Pos.top + h1Height) {
        // Bottom
        clipY = h1Height;
        maskY = -(halfMaskSize * 0.75) + h1Height;
      }
      if (e.clientX <= h1Pos.left) {
        // Left
        clipX = 0;
        maskX = -halfMaskSize;
      }

      // Change clip & mask position using GSAP
      gsap.to('.masks', {
        duration: 1,
        '--mask-position': `${maskX}px ${maskY}px`,
        '--clip-position': `${clipX}px ${clipY}px`,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>
        {`
          :root {
            --clip-position: 100% 100%;
            --mask-position: 100% 100%;
          }

     

          h1 {
            position: relative;
            font-family: 'Open Sans', 'Arial', sans-serif;
            font-size: 130px;
            font-weight: 800;
            letter-spacing: -0.04em;
            line-height: 0.875;
            text-transform: uppercase;
            text-align: center;
            width: 100%;
            height: 100%;
            overflow: hidden;
            cursor: default;
            margin-to: 10px;
          }

          .fill2,
          .mask2 {
            font-size: 100px;
            font-weight: 300;
            letter-spacing: 0.04em;
          }

          .fills {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .fill1,
          .fill3 {
            color: #e0e0e0;
          }

          .fill2 {
            color: rgb(119, 170, 193);
          }

          .masks {
            clip-path: circle(400px at var(--clip-position));
            -webkit-mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 66%);
            -webkit-mask-size: 500px 500px;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: var(--mask-position);
          }

          .mask {
            display: block;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .mask1 {
            background-image: url(https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
          }

          .mask2 {
            background-image: url(https://i.imgur.com/K62kzNz.jpg);
          }

          .mask3 {
            background-image: url(https://images.unsplash.com/photo-1524856781660-e5c92f4ac62a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
          }
        `}
      </style>

      <div className='bg-black py-32'>
      <h1 id="heading">
        <div className="fills">
          <div>
            <span className="fill fill1">Buy</span>
          </div>
          <div>
            <div className="fill fill2">Your</div>
          </div>
          <div>
            <span className="fill fill3">Product</span>
          </div>
        </div>
        <div className="masks">
          <div>
            <span className="mask mask1">Buy</span>
          </div>
          <div>
            <div className="mask mask2">Your</div>
          </div>
          <div>
            <span className="mask mask3">Product</span>
          </div>
        </div>
      </h1>
      </div>
    </>
  );
}

export default Test;
