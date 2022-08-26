import { elements } from "./base";

// Private
const renderRecipe = (recipe) => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}.</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

const createBtn = (page, type, direction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
        <span>Хуудас ${page}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${direction}"></use>
            </svg>
    </button>
`;

const renderButton = (currentPage, totolPages) => {
  // Товчны html
  let btnHtml;
  if (currentPage === 1 && totolPages > 1) {
    btnHtml = createBtn(currentPage + 1, "next", "right");
  } else if (currentPage < totolPages) {
    btnHtml = createBtn(currentPage - 1, "prev", "left");
    btnHtml += createBtn(currentPage + 1, "next", "right");
  } else if (currentPage !== 1 && currentPage === totolPages) {
    btnHtml = createBtn(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", btnHtml);
};

// Public
export const clearSearchQuery = () => (elements.searchInput.value = "");
export const clearSearchList = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
export const getQuery = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // 1хуудсан хэдэн элемент үзүүлэхийг заана
  const start = (currentPage - 1) * 10;
  const end = currentPage * resPerPage;

  // Ирсэн өгөгдлөөс resPerPage-н тоогоор тасалж харуулна
  recipes.slice(start, end).forEach(renderRecipe);

  // Нийт хэдэн хуудастай байхыг бодож олно
  const totolPages = Math.ceil(recipes.length / resPerPage);

  // Хуудасны дугаарлалтыг дэлгэцэнд үзүүлэх
  renderButton(currentPage, totolPages);
};
