import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  totalSlides = 3;
  slideInterval: any;

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 8000);
  }

  ngOnDestroy() {

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.totalSlides - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
  }

}
