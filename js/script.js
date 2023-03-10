'use strict';

const adv = document.querySelector('.promo__adv'),
	content = document.querySelector('.promo__content'),
	genre = document.querySelector('.promo__genre'),
	bg = document.querySelector('.promo__bg'),
	filmList = document.querySelector('.promo__interactive-list'),
	films = filmList.querySelectorAll('li');



adv.classList.add('hide');
content.classList.add('fullwidth');
genre.textContent = 'драма'.toUpperCase();
bg.style.background = 'url(./img/bg.jpg)';

const movieDB = {
	movies: [
		'Логан',
		'Лига справедливости',
		'Ла-ла лэнд',
		'Одержимость',
		'Скотт Пилигрим против...'
	]
};

const list = movieDB.movies.sort();

films.forEach((elem,i) => {
	elem.textContent = `${i+1}) ${list[i]}`;
});