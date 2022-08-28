export default class Like {
  constructor() {
    this.readFromLocalStorage();
    if (!this.likes) this.likes = [];
  }

  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };
    this.likes.push(like);
    this.saveDatatoLocalStorage();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    if (index !== -1) this.likes.splice(index, 1);

    this.saveDatatoLocalStorage();
  }

  isLiked = (id) => this.likes.findIndex((el) => el.id === id) !== -1;

  getNumOfLikes = () => this.likes.length;

  saveDatatoLocalStorage = () => {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  };

  readFromLocalStorage = () => {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  };
}
