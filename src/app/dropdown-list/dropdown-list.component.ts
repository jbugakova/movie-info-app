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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentItem = params.section ? params.section.split(/\s+/)
                                                        .map(word => word[0]
                                                        .toUpperCase() + word.substring(1))
                                                        .join(' ') : this.listItems[0];
      document.getElementById('chosenDropdownItem').innerText = this.currentItem;
    });
  }

  onDropdownListClick(event: any): void {
    if (event.target.classList.contains('dropdown-list-item')) {
      document.getElementById('chosenDropdownItem').innerText = event.target.innerText;
      this.router.navigate(['/movies'], {
        queryParams: {
          section: event.target.innerText.toLowerCase()
        }
      });
    }
  }
}
