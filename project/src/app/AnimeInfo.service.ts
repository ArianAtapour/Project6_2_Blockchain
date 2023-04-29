import { Anime } from "./Anime";

export class AnimeInfoService{
  private _animes: Array<Anime> = new Array<Anime>();
  constructor() {
    let onePiece = new Anime("One Piece", 1100);
    let vinlandSaga = new Anime("Vinland Saga", 24);
    let jojoPartOne = new Anime("Jojo's Bizarre Adventure: Phantom Blood", 10);

    this.animesAdd(onePiece);
    this.animesAdd(vinlandSaga);
    this.animesAdd(jojoPartOne);

  }

  animesAdd(anime: Anime) {
    this._animes.push(anime);
  }

  get animes(): Array<Anime> {
    return this._animes;
  }
}
