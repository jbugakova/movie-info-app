import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent implements OnInit {
  currentItem: string;
  listItems: string[] = ['Popular', 'Now Playing', 'Top Rated', 'Upcoming'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentItem = params.section ? this.listItems.filter(item => item.toLowerCase() === params.section)[0] : this.listItems[0];
    });
  }

  onDropdownListClick(event: any): void {
    if (event.target.classList.contains('dropdown-list-item')) {
      this.router.navigate(['/movies'], {
        queryParams: {
          section: event.target.innerText.toLowerCase()
        }
      });
    }
  }
}
