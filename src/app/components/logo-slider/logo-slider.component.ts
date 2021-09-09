import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-logo-slider",
  templateUrl: "./logo-slider.component.html",
  styleUrls: ["./logo-slider.component.css"],
})
export class LogoSliderComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $("#slick1").slick({
      rows: 1,
      autoplay: true,
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 4,
          },
        },
      ],
    });
  }
}
