import { Component } from '@angular/core';

import { AnimeInfoService } from "../AnimeInfo.service";
import {Anime} from "../Anime";

@Component({
  selector: 'app-animeadder',
  templateUrl: './animeadder.component.html',
  styleUrls: ['./animeadder.component.css']
})
export class AnimeadderComponent{
  animeTitle= '';
  animeEpisodes = 0;
  animeInfo: AnimeInfoService;
  constructor(animeInfo: AnimeInfoService) {
    this.animeInfo = animeInfo;
  }

  onSubmit(anime: {
    animeTitle: string;
    animeEpisodes: number;
  }){
    let newAnime = new Anime(anime.animeTitle, anime.animeEpisodes);
    this.animeInfo.animesAdd(newAnime);
  }

  protected readonly Anime = Anime;
}
