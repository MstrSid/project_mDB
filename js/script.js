'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const adv = document.querySelector('.promo__adv'),
		content = document.querySelector('.promo__content'),
		genre = document.querySelector('.promo__genre'),
		bg = document.querySelector('.promo__bg'),
		filmList = document.querySelector('.promo__interactive-list'),
		btn = document.querySelector('button'),
		inputFilm = document.querySelector('.adding__input'),
		setFav = document.querySelectorAll('input');


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

	showFilms(movieDB, filmList, 'delete', 'promo__interactive-item');


	btn.addEventListener('click', event => {
		event.preventDefault();
		const filmAdded = inputFilm.value;
		movieDB.movies.push(filmAdded);
		showFilms(movieDB, filmList, 'delete', 'promo__interactive-item');
		checkFav(setFav, 'checkbox');
	});

	filmList.addEventListener('click', event => {
		if(event.target && event.target.classList.contains('delete')){
			delMovie(movieDB, event.target, filmList);
		}
	});

});

function showFilms(obj, filmList, classDel, classLi) {
	const list = obj.movies.sort();
	filmList.innerHTML = '';
	for (let i = 0; i < list.length; i++) {
		const li = document.createElement('li');
		li.classList.add(classLi);
		li.textContent = `${i + 1}) ${trimName(list[i])}`;
		const div = document.createElement('div');
		div.classList.add(classDel);
		li.append(div);
		filmList.append(li);
	}
}

function trimName(filmName) {
	return filmName.length > 21 ? `${filmName.substring(0, 21)}...` : filmName;
}

function checkFav(listElems, typeElem){
	listElems.forEach(item => {
		if(item.type === typeElem && item.checked === true) {
			console.log('Добавляем любимый фильм');
		}
	});
}

function delMovie(obj, event, parent){
	const arrayFilms = obj.movies.sort();
	const delBtnNodeList = parent.querySelectorAll('.delete');
	delBtnNodeList.forEach((item, i) => {
		if(item === event){
			item.parentElement.remove();
			arrayFilms.splice(i,1);
		}
	});
}

