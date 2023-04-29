import { Component } from '@angular/core';
import { AnimeInfoService } from "../AnimeInfo.service";
import {Anime} from "../Anime";

@Component({
  selector: 'app-animelist',
  templateUrl: './animelist.component.html',
  styleUrls: ['./animelist.component.css']
})
export class AnimelistComponent {

  animeList = Array<Anime>();

  constructor(animeInfo: AnimeInfoService) {

    this.animeList = animeInfo.animes

  }

}
