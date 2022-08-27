import { elements } from "./base";

export const renderItem = (orts) => {
  const html = `
    <li class="shopping__item" data-itemid = ${orts.id}>
        <div class="shopping__count">
            <input type="number" value="500" step="100">
            <p>g</p>
        </div>
        <p class="shopping__description">${orts.item}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
  elements.listDiv.insertAdjacentHTML("beforeend", html);
};

export const clearList = () => {
  elements.listDiv.innerHTML = "";
};

export const deleteItem = (id) => {
  const el = document.querySelector(`[data-itemid="${id}"]`);
  el.parentElement.removeChild(el);
};
