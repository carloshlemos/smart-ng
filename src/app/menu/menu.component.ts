import { Component, OnInit } from '@angular/core';
import { Menu, MenuService } from '../shared';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  query: string;
  searchResults: Array<Menu>;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.menuService.search().subscribe(
      (data: any) => { this.searchResults = data; },
      error => console.log(error.message)
    );
  }

}
