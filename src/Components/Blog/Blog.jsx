// Blog.js
import React, { useEffect, useState } from 'react';
import './Blog.css';
import Title from '../Shared/Cards/Title/Title';
import useCon from '../Hooks/useCon';

const Blog = () => {
  const [data, setData] = useState([]);
  const {isDarkMode} = useCon()

  useEffect(() => {
    fetch('blog.json')
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);

  // Toggle dark mode

  return (
    <div className={`my-12 ${isDarkMode ? 'dark-mode' : ''}`}>
      <Title text={"Our Blog"}></Title>

      {/* Dark mode toggle button */}
   
      <div className={`mt-7 ${isDarkMode ? 'dark-bg' : ''}`}>
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
          {data.map((d, index) => (
            <div key={index} className={`card ${isDarkMode ? 'dark-card' : ''}`}>
              <div className="card-image-container">
                <img src={d.image} alt="Shoes" className="card-image" />
              </div>
              <div className={`${isDarkMode? 'bg-black text-white':'bg-white'} card-body`}>
                <h2 className={`${isDarkMode? 'bg-black text-white': ''}`}>{d.title}</h2>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className={`grid h-7 card ${isDarkMode ? 'bg-black text-white ' : ''} rounded-box place-items-center`}>
                      {d.author}
                    </div>
                    <div className="divider sm:divider-horizontal">|</div>
                    <div className={`grid text-sm card ${isDarkMode ? 'bg-black text-white' : 'bg-white '} rounded-box place-items-center`}></div>
                    {d.time}
                  </div>
                </div>
                <p className={`mt-4 text-xl ${isDarkMode ? 'bg-black text-white' : ''}`}>{d.details}</p>
                <div className="card-actions mt-4 justify-end">
                  <button className="btn btn-primary">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
