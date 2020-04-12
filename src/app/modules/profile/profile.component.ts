import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserBookService } from 'src/app/services/userbook.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    username: string;
    loading = true;
    unknownUser = false;
    totalPages = 0;
    totalBooks = 0;
    // Progress Chart
    progressChartLabels = ['Read', 'Unread', 'Reading', 'Plan To Read', 'Abandoned'];
    progressChartData = [0, 0, 0, 0, 0];
    progressChartType = 'doughnut';
    // Location Chart
    locationChartLabels = ['Owned', 'Loaned', 'Borrowed', 'Wished'];
    locationChartData = [0, 0, 0, 0];
    locationChartType = 'doughnut';

    constructor(private snackBar: MatSnackBar,
                private route: ActivatedRoute,
                private titleService: Title,
                private userBookService: UserBookService) { }

    ngOnInit() {
        // Fetch username.
        this.route.paramMap.subscribe(paramMap => {
            this.username = paramMap.get('username');
            this.titleService.setTitle(this.username + '\'s Profile - Library Tracker');
        });

        // Load statistics.
        this.userBookService.getStatisticsForUser(this.username)
            .subscribe(res => { this.totalPages = res.totalPages;
                                this.progressChartData = [res.booksRead,
                                                          res.booksUnread,
                                                          res.booksReading,
                                                          res.booksPlanToRead,
                                                          res.booksAbandoned];
                                this.locationChartData = [res.booksOwned,
                                                          res.booksLoaned,
                                                          res.booksBorrowed,
                                                          res.booksWished];
                                this.locationChartData.forEach(a => this.totalBooks += a);
                                this.loading = false;
                                },
                       err => { console.log(err);
                                this.loading = false;
                                let message = 'Something went wrong while trying to fetch this User\'s statistics.';
                                if (err.status === 404) {
                                    message = '\'' + this.username + '\' is not a valid User.';
                                    this.unknownUser = true;
                                }
                                this.snackBar.open(message, 'Dismiss', {
                                    duration: 2000,
                                });
                        }
                    );
    }
}
