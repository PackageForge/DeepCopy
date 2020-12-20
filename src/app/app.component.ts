import { Component } from '@angular/core';
import { deepCopy } from 'projects/deep-copy/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeepCopy';
  a={
    aProp1:"aProp1",
    aProp2:"aProp2",
    aProp3:[{aProp3_0:"aProp3_0"}]
  };
  b={
    bProp1:"bProp1",
    bProp2:"bProp2",
    aProp3:[{bProp3_0:"bProp3_0"}],
    aProp2:"bProp2",
  };
  c=deepCopy(null,this.a,this.b);
  constructor(){
    const a: any = {
      aProp: "aProp"
    };
    const b: any = {
      a: a,
      c: {
        a: a
      }
    };
    const d = deepCopy(b);
    console.log(d.a === d.c.a); // true, the two properties refer to the same object, just like the original.
    console.log(d.a === b.a);   // false, the value is deep copy of the original.
  }
}
