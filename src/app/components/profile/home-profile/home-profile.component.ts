import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.css']
})
export class HomeProfileComponent implements OnInit {
 viewMode='statistics';
  constructor() { }

  ngOnInit() {
    $(".menu-profile-btn").click(function () {
      $('.menu-profile-btn').next("#nav-profile").toggleClass("active")
    });
    $(".close-profile-btn").click(function () {
      $('.close-profile-btn').parents("#nav-profile").removeClass("active")
    });

    $('body').click(function (event) {
      if (!$(event.target).is('.menu-profile-btn')) {
        $('nav').removeClass("active");
        
      }
    });
  }

}
