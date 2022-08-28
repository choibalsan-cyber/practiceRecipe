export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    if (index !== -1) this.likes.splice(index, 1);
  }

  isLiked = (id) => this.likes.findIndex((el) => el.id === id) !== -1;

  getNumOfLikes = () => this.likes.length;
}
