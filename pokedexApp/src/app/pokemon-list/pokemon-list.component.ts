import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  pokemon: any[] = [];
  page = 1;
  totalPokemon = 0;

  constructor (
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getPokemon()
    .subscribe((response: any) => {
      this.totalPokemon = response.count;
      response.results.forEach((result: any) => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemon.push(uniqResponse);
          console.log(this.pokemon);
        })
      });
    });
  }
}

