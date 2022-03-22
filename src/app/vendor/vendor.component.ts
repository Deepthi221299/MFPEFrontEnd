import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorService } from 'src/app/services/vendor.service';
import { ProceedToBuyService } from '../services/proceed-to-buy.service';
import { SnackbarService, SnackType } from '../services/snackbar.service';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent  {

  constructor(private service:ProceedToBuyService,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<VendorComponent> ,public snackbarService: SnackbarService) {}

  ngOnInit(): void { }

  getProdPrice():number{
    return this.data.productData.vendorList.find((a : any) => a.vendorId === this.data.cartData.vendorId).vendor.deliveryCharge + this.data.productData.price;
  }

done():void{
  
  if(parseInt(this.data.cartData.quantity) < 0){
    this.snackbarService.openSnackBar('Quantity canot be less than zero', SnackType.ERROR)
    return
  }else if(parseInt(this.data.cartData.vendorId) < 0){
    this.snackbarService.openSnackBar('Kindly select vendor', SnackType.ERROR)
    return
  }
  this.dialogRef.close(this.data.cartData);
}

}



