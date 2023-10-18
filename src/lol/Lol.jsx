import React from 'react';

const Lol = () => {
  return (
    <div className="demo-1 loading">
		<svg className="hidden">
			<symbol id="icon-arrow" viewBox="0 0 24 24">
				<title>arrow</title>
				<polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "/>
			</symbol>
			<symbol id="icon-drop" viewBox="0 0 24 24">
				<title>drop</title>
				<path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"/><path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"/>
			</symbol>
			<symbol id="icon-github" viewBox="0 0 32.6 31.8">
				<title>github</title>
				<path d="M16.3,0C7.3,0,0,7.3,0,16.3c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4C7.4,10.7,6.8,9,7.7,6.8c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C32.6,7.3,25.3,0,16.3,0z"/>
			</symbol>
		</svg>
		<main>
			<div className="content content--fixed">
				<header className="codrops-header">
					<div className="codrops-links">
						<a className="codrops-icon codrops-icon--prev" href="https://tympanus.net/Development/ExpandingGridItemAnimation/" title="Previous Demo"><svg className="icon icon--arrow"><use xlink:href="#icon-arrow"></use></svg></a>
						<a className="codrops-icon codrops-icon--drop" href="https://tympanus.net/codrops/?p=33037" title="Back to the article"><svg className="icon icon--drop"><use xlink:href="#icon-drop"></use></svg></a>
					</div>
					<h1 className="codrops-header__title">Animated Frame Slideshow</h1>
				</header>
				<a className="github" href="https://github.com/codrops/AnimatedFrameSlideshow/" title="Find this project on GitHub"><svg className="icon icon--github"><use xlink:href="#icon-github"></use></svg></a>
				<nav className="demos">
					<svg className="icon icon--keyboard"><use xlink:href="#icon-keyboard"></use></svg>
					<a className="demo demo--current" href="index.html"><span>Demo 1</span></a>
					<a className="demo" href="index2.html"><span>Demo 2</span></a>
					<a className="demo" href="index3.html"><span>Demo 3</span></a>
					<a className="demo" href="index4.html"><span>Demo 4</span></a>
					<a className="demo" href="index5.html"><span>Demo 5</span></a>
					<a className="demo" href="index6.html"><span>Demo 6</span></a>
				</nav>
				<a href="http://go.thoughtleaders.io/SenchaCodrops141117" rel="nofollow" className="pater" onClick="recordOutboundLink(this, 'Outbound Links', 'SenchaCodrops141117');return false;">
					<img className="pater__logo" src="pater/logo.svg" alt="Sencha Logo" />
					<h2 className="pater__title">Sencha Ext JS: Build an App, Not a Framework</h2>
					<div className="pater__img-wrap"><img className="pater__img" src="pater/sencha.png" alt="Sencha Creative" /></div>
				</a>
			</div>
			<div className="slideshow">
				<div className="slides">
					<div className="slide slide--current">
						<div className="slide__img" style="background-image: url(img/25.jpg)"></div>
						<h2 className="slide__title">Colossal</h2>
						<p className="slide__desc">A matter of delicate proportions and aesthetics.</p>
						<a className="slide__link" href="#">Explore our works</a>
					</div>
					<div className="slide">
						<div className="slide__img" style="background-image: url(img/26.jpg)"></div>
						<h2 className="slide__title">Massive</h2>
						<p className="slide__desc">The thoughtful making of space is an art.</p>
						<a className="slide__link" href="#">Discover art</a>
					</div>
					<div className="slide">
						<div className="slide__img" style="background-image: url(img/27.jpg)"></div>
						<h2 className="slide__title">Towering</h2>
						<p className="slide__desc">If a building becomes architecture, then it is art.</p>
						<a className="slide__link" href="#">Find out more</a>
					</div>
					<div className="slide">
						<div className="slide__img" style="background-image: url(img/28.jpg)"></div>
						<h2 className="slide__title">Immense</h2>
						<p className="slide__desc">Architecture is a visual art, and the buildings speak for themselves.</p>
						<a className="slide__link" href="#">Uncover beauty</a>
					</div>
				</div>
				<nav className="slidenav">
					<button className="slidenav__item slidenav__item--prev">Previous</button>
					<span>/</span>
					<button className="slidenav__item slidenav__item--next">Next</button>
				</nav>
			</div>
		</main>
	</div>
  );
};

export default Lol;