import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from '../../core/services/subjects.service';


@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchToggle: boolean;
  subjectName: string;
  isLoading: boolean = false;
  allBooks: Book[] = [];
  currentOffset: number = 0;
  currentLimit: number = 10;
  currentPage: number = 1;

  constructor(
    private subjectsService: SubjectsService,
  ) {
    this.bookSearch = new FormControl('');
    this.searchToggle = false;
    this.subjectName = '';
  }

  onClickPrevious() {
    if (this.currentOffset >= 10) {
      this.currentOffset = this.currentOffset - this.currentLimit;
      this.getSerchResults();
      if (this.currentPage > 10) {
        this.currentPage-=10;
      }
    }
  }

  onClickNext() {
    this.currentOffset = this.currentOffset + this.currentLimit;
    this.getSerchResults();
    this.currentPage+=10;
  }

  getSerchResults() {
    this.subjectsService.searchForBooks(this.subjectName, this.currentLimit, this.currentOffset).subscribe((data) => {
      this.allBooks = data?.docs;
      this.isLoading = false;
    });
  }

  onIconClick() {
    this.isLoading = true;
    this.searchToggle = true;
    this.subjectName = this.bookSearch.value;
    console.log(this.subjectName);
    this.getSerchResults();
  }

  clearSearch() {
    this.bookSearch.setValue('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
    { name: 'Angular' },
    { name: 'WrongInputabcd' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
        console.log(value);
      });
  }
}
