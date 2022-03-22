import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProceedToBuyService } from "../services/proceed-to-buy.service";


@Component({
    selector: 'remarks-dialog',
    templateUrl: './remarksdialog.component.html',
    styleUrls: ['./remarksdialog.component.css']
  
  })
  export class RemarksDialogComponent {
    constructor(private service:ProceedToBuyService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<RemarksDialogComponent>) {
    }
    public rate(rating: number , product : any) {
      product.stars = (product.stars as any[]).map((_, i) => rating > i);
      product.rating = rating;
    }
    public DeleteCartDetails(customerId:number)
    {
       this.service.deleteCart(customerId);
    }
  }
    