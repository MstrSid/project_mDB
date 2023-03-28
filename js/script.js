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
		movies: {
			'Логан': 'false',
			'Лига справедливости': 'false',
			'Ла-ла лэнд': 'false',
			'Одержимость': 'false',
			'Скотт Пилигрим против...': 'false',
		}
	};

	showFilms(movieDB, filmList, 'delete', 'promo__interactive-item');


	btn.addEventListener('click', event => {
		event.preventDefault();
		const filmAdded = inputFilm.value;
		movieDB.movies[filmAdded]= `${checkFav(setFav, 'checkbox')}`;
		showFilms(movieDB, filmList, 'delete', 'promo__interactive-item');
	});

	filmList.addEventListener('click', event => {
		if(event.target && event.target.classList.contains('delete')){
			delMovie(movieDB, event.target, filmList);
		}
	});

});

function showFilms(obj, filmList, classDel, classLi) {
	const list = Object.keys(obj.movies).sort();
	filmList.innerHTML = '';
	for (let i = 0; i < list.length; i++) {
		const li = document.createElement('li');
		li.classList.add(classLi);
		li.textContent = `${i + 1}) ${trimName(list[i])}`;
		if(obj.movies[list[i]] === 'true'){
			const fav = document.createElement('div');
			fav.innerHTML = '&nbsp;&hearts;';
			li.append(fav);
		}
		const div = document.createElement('div');
		div.classList.add(classDel);
		li.append(div);
		li.style.display = 'flex';
		filmList.append(li);
	}
}

function trimName(filmName) {
	return filmName.length > 21 ? `${filmName.substring(0, 21)}...` : filmName;
}

function checkFav(listElems, typeElem){
	let fav = false;
	listElems.forEach(item => {
		if(item.type === typeElem && item.checked === true) {
			console.log('Добавляем любимый фильм');
			fav = true;
		} else fav = false;
	});
	return fav;
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

