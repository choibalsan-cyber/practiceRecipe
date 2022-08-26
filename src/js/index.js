import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import Recipe from "./model/Recipe";

/**
 * WEB APP STATEMENT
 * Хайлтын query, үр дүн
 * Жорын найрлаганууд
 * Лайкалсан жорууд
 * Дэлгэрэнгүй орц
 */

const state = {};

// Хайлтын контроллер
const controllerSearch = async () => {
  // 1. Хайлтын түлхүүр үгийг дэлгэцнээс авна
  const query = searchView.getQuery();

  if (query) {
    // 2. Шинээх хайлтын обьект үүсгэнэ
    state.search = new Search(query);

    // 3. Хайлтанд зориулж дэлгэцийн UI бэлтгэнэ
    // Хайсан түлхүүр үгийг алга болгох
    searchView.clearSearchQuery();

    // Хайсан list-г алга болгох
    searchView.clearSearchList();

    // Эргэлдэж байгаа сумыг харуулна
    renderLoader(elements.searchResultDiv);

    // 4. Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5. Хайлтыг дэлгэцэнд харуулна
    // Хайлтын үр дүн дэлгэц дээр гарч ирэх үед сумыг алга болгоно
    clearLoader();

    // Хайлтаар тохирох зүйл гарч ирэхгүй бол <<Хайлтаар илэрцгүй>> гэж анхааруулна
    if (state.search.recipes === undefined) alert("Хайлтаар илэрцгүй!!!");
    else searchView.renderRecipes(state.search.recipes);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  // Submit нь мэдээллээ оруулаад Refresh хийдэг тул тэрийг болиулах
  e.preventDefault();
  controllerSearch();
});

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchList();
    searchView.renderRecipes(state.search.recipes, gotoPageNumber);
  }
});

/**
 * Жорын контроллер
 */

const controllerRecipe = async () => {
  // 1. URL-с id-г авна
  const id = recipeView.getId();
  // 2. Жорын обьект үүсгэнэ
  state.recipe = new Recipe(id);

  // 3. Дэлгэцийн UI бэлтгэнэ
  // 4. Жороо татаж авчирна
  await state.recipe.getRecipe();

  // 5. Жорыг хийх хугацаа болон жорын найрлагийг тооцоолно
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();
  // 6. Дэлгэцэнд үзүүлнэ
  console.log(state.recipe);
};

window.addEventListener("hashchange", controllerRecipe);
