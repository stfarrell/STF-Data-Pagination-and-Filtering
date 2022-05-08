/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
//Declare studentList in global scope
let studentList = document.querySelector('.student-list');

//Add a search bar
const header = document.querySelector('.header');
const page = document.querySelector('.page');
const searchBar = document.createElement('label');
searchBar.htmlFor = 'search';
searchBar.classList.add('student-search');
const searchBarTitle = document.createElement('span');
searchBarTitle.innerText = 'Search by name';
const searchInput = document.createElement('input');
searchInput.id = 'search';
searchInput.placeholder = 'Search by name...';
const searchButton = document.createElement('button');
searchButton.type = 'button';
const searchIcon = document.createElement('img');
searchIcon.src = 'img/icn-search.svg';
searchIcon.alt = 'Search icon';
searchButton.appendChild(searchIcon);
header.appendChild(searchBar, page);
searchBar.appendChild(searchBarTitle);
searchBar.appendChild(searchInput);
searchBar.appendChild(searchButton);

//Search button displays any user matches for first or last names (on click and after each character is typed)
searchButton.addEventListener('click', (e) => {
	const searchData = data.filter(
		(student) =>
			student.name.first
				.toUpperCase()
				.includes(searchInput.value.toUpperCase()) ||
			student.name.last.toUpperCase().includes(searchInput.value.toUpperCase())
	);
	showPage(searchData, 1);
	addPagination(searchData);

	if (searchData.length === 0) {
		studentList.innerText = 'No Results Found';
	}
});

searchInput.addEventListener('keyup', (e) => {
	const searchData = data.filter(
		(student) =>
			student.name.first
				.toUpperCase()
				.includes(searchInput.value.toUpperCase()) ||
			student.name.last.toUpperCase().includes(searchInput.value.toUpperCase())
	);
	showPage(searchData, 1);
	addPagination(searchData);

	if (searchData.length === 0) {
		studentList.innerText = 'No Results Found';
	}
});

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
	const startIndex = page * 8 - 8;
	const endIndex = page * 8;
	studentList.innerHTML = '';

	list.forEach((student) => {
		if (
			list.indexOf(student) >= startIndex &&
			list.indexOf(student) <= endIndex
		) {
			const studentItem = document.createElement('li');
			studentItem.classList.add('student-item', 'cf');
			studentList.appendChild(studentItem);
			const studentDetails = document.createElement('div');
			studentDetails.classList.add('student-details');
			studentItem.appendChild(studentDetails);
			const image = document.createElement('img');
			image.classList.add('avatar');
			image.src = student.picture.medium;
			studentDetails.appendChild(image);
			const nameHeader = document.createElement('h3');
			nameHeader.innerText = `${student.name.first} ${student.name.last}`;
			studentDetails.appendChild(nameHeader);
			const email = document.createElement('span');
			email.classList.add('email');
			email.innerText = `${student.email}`;
			studentDetails.appendChild(email);
			const joinedDetails = document.createElement('div');
			joinedDetails.classList.add('joined-details');
			studentItem.appendChild(joinedDetails);
			const dateJoined = document.createElement('span');
			dateJoined.classList.add('date');
			dateJoined.innerText = `Joined ${student.registered.date}`;
			joinedDetails.appendChild(dateJoined);
		}
	});
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
	const numButtons = Math.ceil(list.length / 9);
	const linkList = document.querySelector('.link-list');
	linkList.innerHTML = '';
	for (let i = 0; i < numButtons; i++) {
		const btnContainer = document.createElement('li');
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.classList.add('pagination-btn');
		btn.innerText = `${i + 1}`;
		btnContainer.appendChild(btn);
		linkList.appendChild(btnContainer);
	}

	if (linkList.firstChild) {
		linkList.firstChild.firstChild.classList.add('active');
	}
	linkList.addEventListener('click', (e) => {
		if (e.target.type === 'button') {
			const allDaPagButtons = document.querySelectorAll('.pagination-btn');
			allDaPagButtons.forEach((button) => {
				button.classList.remove('active');
			});
			e.target.classList.add('active');
			showPage(data, parseInt(e.target.innerText));
		}
	});
}

// Call functions
showPage(data, 1);
addPagination(data);
