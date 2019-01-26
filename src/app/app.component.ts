import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  Observable = Observable.create((observer)=>
  {
    observer.next('Start Processing...');

    setTimeout(() => observer.next('Still Processing...'), 3000);

    setTimeout(() => observer.complete("Process completed"), 5000);



  })

  ngOnInit()
  {
    this.Observable.subscribe(

      data =>  console.log(data),
      error => console.log(error),
      () => console.log("process completed"))

    
      console.log("Component Initialized");
  }
}
