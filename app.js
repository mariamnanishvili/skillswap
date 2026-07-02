// ბურგერ მენიუ
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', function() {
    navLinks.classList.toggle('show-menu');
});

// API-დან მონაცემების წამოღება (Async / Await)
const container = document.getElementById('mentors-grid');
const searchInput = document.getElementById('search-input');

let allMentors = []; // აქ ვინახავთ ყველა მენტორს, რომ ძებნისას ხელახლა fetch არ დაგვჭირდეს

const skills = ['ვებ დეველოპერი', 'ინგლისურის რეპეტიტორი', 'UI/UX დიზაინერი', 'პითონის პროგრამისტი'];

async function loadMentors() {
    const apiLink = 'https://randomuser.me/api/?results=4';

    container.innerHTML = '<p class="loading-text">იტვირთება...</p>';

    try {
        const response = await fetch(apiLink);
        const data = await response.json();

        const usersArray = data.results;

        // ვამზადებთ მონაცემებს მარტივი ობიექტების სახით
        allMentors = usersArray.map(function(user, index) {
            return {
                name: user.name.first,
                picture: user.picture.large,
                city: user.location.city,
                country: user.location.country,
                skill: skills[index]
            };
        });

        renderMentors(allMentors);

    } catch (error) {
        container.innerHTML = '<p class="empty-text">შეცდომა სერვერიდან ინფორმაციის წამოღებისას</p>';
    }
}

// ბარათების დახატვა ეკრანზე
function renderMentors(mentorsArray) {
    container.innerHTML = '';

    if (mentorsArray.length === 0) {
        container.innerHTML = '<p class="empty-text">მენტორი ვერ მოიძებნა 🙁</p>';
        return;
    }

    mentorsArray.forEach(function(mentor) {
        const card = document.createElement('div');
        card.classList.add('mentor-card');

        card.innerHTML = `
            <img src="${mentor.picture}" alt="mentor">
            <h3>${mentor.name}</h3>
            <p class="skill-badge">${mentor.skill}</p>
            <p class="location">📍 ${mentor.city}, ${mentor.country}</p>
        `;

        container.appendChild(card);
    });
}

loadMentors();

// 3. ძებნის ფუნქციონალი
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = allMentors.filter(function(mentor) {
        return mentor.name.toLowerCase().includes(query) ||
               mentor.skill.toLowerCase().includes(query);
    });

    renderMentors(filtered);
});

// 4. LocalStorage ქუქი შეტყობინებისთვის
const cookieBar = document.getElementById('cookie-bar');
const acceptBtn = document.getElementById('accept-cookie');

if (localStorage.getItem('hideCookie') === 'true') {
    cookieBar.style.display = 'none';
}

acceptBtn.addEventListener('click', function() {
    localStorage.setItem('hideCookie', 'true');
    cookieBar.style.display = 'none';
});