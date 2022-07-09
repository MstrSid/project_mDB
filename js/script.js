/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
	movies: [
		"Логан",
		"Лига справедливости",
		"Ла-ла лэнд",
		"Одержимость",
		"Скотт Пилигрим против..."
	]
};

removeAds('.promo__adv');
replaceGenre('.promo__genre');
replaceBg('.promo__bg');
createFilmList('.promo__interactive-list');
addFilm('button', '.adding__input');

function removeAds(blockClassName) {
	const removedBlock = document.querySelector(blockClassName);
	const fixedElem = removedBlock.previousElementSibling.className;
	removedBlock.remove();
	setWidthAfterAds(`.${fixedElem}`);
}

function setWidthAfterAds(blockClassName) {
	const fixBlock = document.querySelector(blockClassName);
	fixBlock.style.cssText = 'width: calc(100% - 300px);';
}

function replaceGenre(elemSelector) {
	const elem = document.querySelector(elemSelector);
	elem.innerText = `драма`;
}

function replaceBg(elemSelector) {
	const elem = document.querySelector(elemSelector);
	elem.style.cssText = `background: url(../img/bg.jpg) center top/cover no-repeat;`;
}

function createFilmList(elemSelector) {
	const elem = document.querySelector(elemSelector);
	elem.innerHTML = ``;
	movieDB['movies'].sort();
	movieDB['movies'].forEach((item, i) => {
		let filmElem = document.createElement('li');
		filmElem.innerHTML = `<li class="promo__interactive-item">${i + 1}. ${item}
                            <div class="delete"></div>
                        </li>`;
		elem.append(filmElem);
	});
	removeFilm('.delete');
}

function addFilm(buttonSelector, inputSelector) {
	const btn = document.querySelector(buttonSelector);
	const inp = document.querySelector(inputSelector);

	btn.addEventListener('click', (e) => {
		e.preventDefault();
		movieDB['movies'].push(trimFilmName(inp.value));
		createFilmList('.promo__interactive-list');
		inp.value = '';
		isFavourite('input');
	});
}

function trimFilmName(filmName) {
	return filmName.length > 21 ? `${filmName.substring(0, 20)}...` : filmName;
}

function isFavourite(checkBoxSelector) {
	const chbx = document.querySelectorAll(checkBoxSelector);
	chbx.forEach(item => {
		if (item.type === 'checkbox' && item.checked) {
			console.log('Добавляем любимый фильм!');
			item.checked = false;
		}
	});
}

function removeFilm(removerSelector) {
	const trash = document.querySelectorAll(removerSelector);
	trash.forEach(item => {
		item.addEventListener('click', () => {
			let text = item.previousSibling.textContent.trim();
			text = text.substring(3, text.length);
			movieDB['movies'] = movieDB['movies'].filter(item => item !== text);
			createFilmList('.promo__interactive-list');
		})
	});
}
