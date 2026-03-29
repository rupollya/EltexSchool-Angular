class Post {
    constructor(id, title, content, image, date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.date = date;
    }

    createDOMElement() {
        const template = document.getElementById('article-template');
        const newPost = template.content.cloneNode(true);

        const articleRoot = newPost.querySelector('.article_blog');
        articleRoot.dataset.id = this.id;

        // наполняем данными из объекта
        newPost.querySelector('.post-title').textContent = this.title;
        newPost.querySelector('.post-content').textContent = this.content;
        newPost.querySelector('.date').textContent = this.date;
        newPost.querySelector('.card_image img').src = this.image;

        return newPost;
    }
}
const countArticles = document.getElementById('coutArticles');
const popUpElement = document.getElementById("pop-up");
function onStatistics() {
    // Вызов поп-апа 
    countArticles.textContent = document.querySelectorAll('.article_blog').length;
    popUpElement.show();

    // Работа с подсчетом количества статей

    // Работа с коментами
    const countComment = document.getElementById('comment');
    countComment.textContent = document.querySelectorAll('.commentArcicle').length;
    // console.log(count)
    // popUpElement.innerHTML = `<p>Всего статей на странице: ${count}</p>`

    setTimeout(() => {
        popUpElement.close();
    }, 5000);

}
// закрытие поп-апа
// не стала добавлять закрытие вне, тк не модалка, но добавила авто закрытие через 5 секунд
function onClose() {
    const popUpElement = document.getElementById("pop-up");
    popUpElement.close();
}

function toggleVisibility() {
    const form = document.getElementById('form-create-article');
    form.classList.toggle('hidden');
}

function validateForm(title, content) {

    const titleInputElement = document.getElementById('title_input');
    const contentInputElement = document.getElementById('content_input');
    const titleError = document.getElementById('title-error');
    const contentError = document.getElementById('content-error');
    
    titleError.textContent = "";
    contentError.textContent = "";
    titleInputElement.classList.remove('invalid');
    contentInputElement.classList.remove('invalid');

    let isValid = true;

    if (title === '') {
        titleError.textContent = "Пожалуйста, введите заголовок статьи";
        titleInputElement.classList.add('invalid');
        isValid = false;
    }

    if (content === '') {
        contentError.textContent = "Пожалуйста, введите небольшое описание статьи";
        contentInputElement.classList.add('invalid');
        isValid = false;
    }

    return isValid;

}

// Добавление новой статьи в localStorage
function newPublish(event) {

    event.preventDefault();

    const titleInputElement = document.getElementById('title_input');
    const contentInputElement = document.getElementById('content_input');

    const titleValue = titleInputElement.value.trim();
    const contentValue = contentInputElement.value.trim();

    if ( !validateForm(titleValue,contentValue)) {return;}

    const images = [
        '../assets/blog1.jpeg', '../assets/blog2.jpeg', '../assets/blog3.jpeg', 
        '../assets/blog4.jpeg', '../assets/blog5.jpeg', '../assets/blog6.jpeg', '../assets/blog7.jpeg'
    ]; 

    // объект данных для сохранения
    const articleData = {
        id: Date.now(),
        title: titleValue,
        content: contentValue,
        image: images[Math.floor(Math.random() * images.length)],
        date: new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Очистка полей
    event.target.reset();

    const articles = JSON.parse(localStorage.getItem('my_posts')) || [];
    articles.push(articleData);
    localStorage.setItem('my_posts', JSON.stringify(articles));
    checkArticles();
}

// сброс формы
const form = document.querySelector('#form-create-article')
  form.addEventListener('reset', function (evt) {
    console.log(evt)
})

// проверка наличия статей в localstorage
function checkArticles(){
    const projects_null_list = document.getElementById("projects_null_list");
    const projects_list = document.getElementById("projects-list");

    // достаем данные из locslSt
    const goodArticles = JSON.parse(localStorage.getItem('my_posts')) || [];

    if (goodArticles.length === 0) {
        projects_null_list.style.display = 'block';
        projects_list.innerHTML = '';
    }
    else {
        projects_null_list.style.display = 'none';
        projects_list.innerHTML = '';

        goodArticles.forEach(article => {
            const post = new Post(article.id, article.title, article.content, article.image, article.date);
            projects_list.appendChild(post.createDOMElement());
        });
    }
}

function deleteListItem(event) {
    const deleteIcon = event.target.closest("#delete-btn");

    const deletedElem = deleteIcon?.closest(".article_blog");
  
    if (deletedElem) {
        const articleId = Number(deletedElem.dataset.id);

    // удаляем с экрана
    deletedElem.remove();

    let articles = JSON.parse(localStorage.getItem('my_posts')) || [];
    articles = articles.filter(a => a.id !== articleId);
    localStorage.setItem('my_posts', JSON.stringify(articles));
    checkArticles();
  }
}

document.addEventListener('DOMContentLoaded', checkArticles);
document.getElementById("projects-list").addEventListener("click", deleteListItem);
const formElement = document.getElementById('form-create-article');

if (formElement) {
    formElement.addEventListener('submit', newPublish);
}
 