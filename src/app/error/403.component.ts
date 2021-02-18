import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: '403.component.html'
})
export class P403Component {

    constructor(private _location: Location) {}
  
    backClicked() {
      this._location.back();
    }
}
