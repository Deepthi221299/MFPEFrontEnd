import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProceedToBuyService } from 'src/app/services/proceed-to-buy.service';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';
import { Carts } from '../Models/Carts';
import { AuthenticationService } from '../services/authentication.service';
import { SnackbarService, SnackType } from '../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { VendorComponent } from '../vendor/vendor.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<any>;
  errors: any;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  constructor(
    private service: ProductService,
    public cartService: ProceedToBuyService,
    public snackbarService: SnackbarService,
    private vendorservice: VendorService,
    private authservice:AuthenticationService,
    private route:ActivatedRoute ,
    public dialog: MatDialog,
  ) { }
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Price',
    'Description',
    'Image',
    'Rating',
    'VendorDetails',
    'Handsinstocks',
    'selectquantity',
    'Action',
  ];
  UserList:any=[];
  ProductList: any = [];
  searchType: string = 'id';
  searchValue: string = '';
  userName = localStorage.getItem('username');
  ModalTitle!: string;
  ActivateaddCartComp!: boolean;
  cart: any = {
    customerId: 0,
    productId: 0,
    quantity: 0,
    zipcode: 0,
    deliveryDate: new Date(),
    vendorId: 0
  };
  
  @Input() searchvalue: string | undefined;

  ngOnInit(): void {
    this.refreshProductList();
    this.authenticationGetUser();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userName = params.get('userName') });
      console.log(this.userName);
  }
  addClick() {
    this.ModalTitle = 'Add to Cart';
    this.ActivateaddCartComp = true;
  }

  onSubmit(form: NgForm) {
    this.userName=this.route.snapshot.paramMap.get('userName')

    this.service.getProductById(form.value).subscribe((data: any) => {
      this.ProductList = data;
    });
    
  }
  refreshProductList() {
    this.service.getAllProducts().subscribe((data) => {
      this.ProductList = data;
    });
  }

  SearchProduct() {
    if (this.searchType == 'id')
      this.service.getProductById(+this.searchValue).subscribe((data) => {
        this.ProductList = [data];
      }, error => {
        this.snackbarService.openSnackBar('Product not found', SnackType.ERROR)
      });
    else
      this.service.getProductByName(this.searchValue).subscribe((data) => {
        this.ProductList = [data];
      }, error => {
        this.snackbarService.openSnackBar('Product not found', SnackType.ERROR)
      });
  }

  handleInput(event: any): void {
    const numberOnlyRegex = /^[0-9\s]*$/;
    if (this.searchType === 'id' && !numberOnlyRegex.test(event.target.value)) {
      event.target.value = this.searchValue;
    } else {
      this.searchValue = event.target.value;
    }
  }

  clearSearch(): void {
    this.searchInput.nativeElement.value = '';
    this.searchValue = '';
  }

  searchBy(mode: string): void {
    this.searchType = mode;
  }

  selectvendor(product :any) {
    this.vendorservice.getVendorStockId(product.productId).subscribe((data) => {
      product.vendorId = 0;
      product.vendorList = data;
    });

  }

  addtoCart(productData: any) {
    var cartData: Carts = {
      customerId: 1,
      productId: productData.productId,
      quantity: productData.squantity,
      zipcode: 523001,
      deliveryData: new Date(),
      vendorId: productData.vendorId,
      cartId: 0
    }
    this.cartService.addCarts(cartData).subscribe((data) => {
      this.snackbarService.openSnackBar('Added To cart Sucessfully', SnackType.SUCCESS)
    });
  }


  getVendorData(productData : any) : void{
    var cartData: Carts = {
      customerId: 1,
      productId: productData.productId,
      quantity: productData.quantity || 0,
      zipcode: 523001,
      deliveryData: new Date(),
      vendorId: productData.vendorId || 0,
      cartId: 0
    }
    this.vendorservice.getVendorStockId(productData.productId).subscribe((data) => {
      productData.vendorId = 0;
      productData.vendorList = data;
      this.openVendorData(productData , cartData);
    });
  }

  openVendorData(product : any , cartData : Carts):void{
     const dialogRef = this.dialog.open(VendorComponent,{
       data: {productData: product , cartData : cartData},
     });
 
     dialogRef.afterClosed().subscribe(data => {
       if(data) {
        this.cartService.addCarts(data).subscribe((data) => {
          this.snackbarService.openSnackBar('Added To cart Sucessfully', SnackType.SUCCESS)
        });
       }
     })
   }

  authenticationGetUser() {
    this.authservice.authenticationGetAllUser().subscribe((data) =>{
        this.UserList=data;
       // if(this.UserList.name == )
        console.log(this.UserList);
      });
    }

getUserName():any{
  return sessionStorage.getItem('username')?.toString()
}


}
