export class Anime{
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get episodes(): number {
    return this._episodes;
  }

  constructor(name: string, episodes: number) {
    this._name = name;
    this._episodes = episodes;
  }

  set episodes(value: number) {
    this._episodes = value;
  }
  private _name : string = "";
  private _episodes : number = 0;
}
