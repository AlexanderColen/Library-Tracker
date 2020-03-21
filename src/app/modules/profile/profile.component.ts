import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    username: string;

    constructor(private route: ActivatedRoute,
                private titleService: Title) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            this.username = paramMap.get('username');
            this.titleService.setTitle(this.username + '\'s Profile - Library Tracker');
        });
    }
}
