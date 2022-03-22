import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProceedToBuyService } from 'src/app/services/proceed-to-buy.service';
import { Carts } from '../Models/Carts';
import { RemarksDialogComponent } from '../remarksdialog/remarksdialog.component';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  CartList: Carts[]=[];
  displayedColumns: string[] = [
    
    'productId',
    'customerId',
    'vendorid',
    'Zip Code',
    'Quantity',
    'Delivery Date',
    'productPrice',
  ];

  priceMappingObj : any = {
    1:5999,
    2:3500,
    3:6999,
    4:4599,
    5:2900
  }

  productNameMappingObj : any = {
    1:'Redmi',
    2:'Iphone',
    3:'Iqoo7',
    4:'samsung',
    5:'Nokia'
  }
  
  vendorNameMappingObj: any={
     1	:'Deepthi',
     2	:'Siri',
     3	:'Haripriya',
     4	:'Raviveer'
  }

  customerNameMappingObj: any={
    
     1	:'Deepu',
     2	:'Siri',
     3	:'Hari',
     4	:'Ravi',
     5	:'Raji'
  }
  
  userId = localStorage.getItem('id');
  constructor(
    public service: ProceedToBuyService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private prodService: ProductService,

  ) {}

  ngOnInit(): void {
    this.GetCart();
  }

  GetCart()
  {
    this.service.getCarts().subscribe((data : any[])=>{
      this.CartList = [];
      (data as any[]).forEach(item => {
        item.productPrice = this.priceMappingObj[item.productId];
      })
      this.CartList=data;
      
      console.log(this.CartList);
    });
  }

  get getTotalPrice() :  number {
    return this.CartList.reduce((val , ele) => val + ele.quantity*this.priceMappingObj[ele.productId] , 0);
  }


  proceedToBuy():void{
   const unqProductData =  Array.from(new Set(this.CartList.map(data => data.productId))).map(code => this.CartList.find(data => data.productId === code));

      const productData = unqProductData.map((data :any) => {
      return {
        productId : data.productId,
        productName : this.productNameMappingObj[data.productId],
        rating : 0,
        stars: Array(5).fill(false)
      }
    })

    const dialogRef = this.dialog.open(RemarksDialogComponent,{
      data: {productData: productData},
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data?.length) (data as any[]).forEach(prod => {
        this.prodService.updateRating(prod.productId , prod.rating).subscribe();
      })
    })
  }
  
}

