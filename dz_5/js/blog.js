function onStatistics() {
    // Вызов поп-апа 
    const popUpElement = document.getElementById("pop-up");
    popUpElement.show();

    // Работа с подсчетом количества статей
    const countArticles = document.getElementById('coutArticles');
    countArticles.textContent = document.querySelectorAll('.article_blog').length;

    // Работа с коментами
    const countComment = document.getElementById('comment');
    countComment.textContent = document.querySelectorAll('.commentArcicle').length;;
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

// Добавление новой статьи через template
function newPublish(event) {
    const titleInputElement = document.getElementById('title_input');
    const contentInputElement = document.getElementById('content_input');
    const titleError = document.getElementById('title-error');
    const contentError = document.getElementById('content-error');
    const projectsList = document.querySelector('.projects_list');

    const titleValue = titleInputElement.value.trim();
    const contentValue = contentInputElement.value.trim();

    titleError.textContent = "";
    contentError.textContent = "";
    titleInputElement.classList.remove('invalid');
    contentInputElement.classList.remove('invalid');

    let hasError = false;

    if (titleValue === '') {
        titleError.textContent = "Пожалуйста, введите заголовок статьи";
        titleInputElement.classList.add('invalid');
        hasError = true;
    }

    if (contentValue === '') {
        contentError.textContent = "Пожалуйста, введите небольшое описание статьи";
        contentInputElement.classList.add('invalid');
        hasError = true;
    }

    // если есть ошибка — выходим из функции и ничего не создаем
    if (hasError) return;
    // Время
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ru-RU', options);
    
    const images = [
        '../assets/blog1.jpeg', '../assets/blog2.jpeg', '../assets/blog3.jpeg', 
        '../assets/blog4.jpeg', '../assets/blog5.jpeg', '../assets/blog6.jpeg', '../assets/blog7.jpeg'
    ]; 
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // шаблон
    const template = document.getElementById('article-template');
    const newPost = template.content.cloneNode(true);

    // удаление
    const deleteBtn = newPost.querySelector('#delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const article = this.closest('.article_blog');
            if (article) {
                article.remove();
            }
        });
    }

    newPost.querySelector('.date').textContent = formattedDate; 
    newPost.querySelector('.post-title').textContent = titleValue;
    const contentField = newPost.querySelector('.post-content');
    if (contentField) contentField.textContent = contentValue;
    
    newPost.querySelector('.card_image img').src = randomImage;

    projectsList.appendChild(newPost);
    event.preventDefault()
    titleInputElement.value = '';
    contentInputElement.value = '';
    
    if (typeof toggleVisibility === "function") {
        toggleVisibility();
    }
}


// сброс формы
const form = document.querySelector('#form-create-article')
  form.addEventListener('reset', function (evt) {
    console.log(evt)
  })