import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ListRequest } from '../model/list-request';
import { ListPost } from '../model/list-post';
import { AuthService } from './auth-service.service';
import { ListBrandPost } from '../model/list-brand-post';
import { User } from '../model/user';
import { ListProductOwner } from '../model/list-product-owner';
import { NewBrand } from '../model/new-brand';
import { EditUser } from '../model/edit-user';
import { ListProduct } from '../model/list-product';
import { EditProduct } from '../model/edit-product';
import { NewProduct } from '../model/new-product';
import { ListBranchManagers } from '../model/list-branch-managers';
import { ListTechnicalStaffs } from '../model/list-technical-staffs';
import { ListBranch } from '../model/list-branch';
import { NewBranch } from '../model/new-branch';
import { EditBranch } from '../model/edit-branch';
import { ListCashier } from '../model/list-cashier';
import { ListCashierCheckout } from '../model/list-cashier-checkout';
import { NewCashierCheckout } from '../model/new-cashier-checkout';
import { ProductAllInfo } from '../model/product-all-info';
import { TopTenBranches } from '../model/top-ten-branches';
import { TopFiveItems } from '../model/top-five-items';
import { AllItems } from '../model/all-items';
import { NewItem } from '../model/new-item';
import { TechnicalStaffs } from '../local-admin/local-admin-manage-technical-staffs/local-admin-manage-technical-staffs.component';
import { BranchManagers } from '../local-admin/local-admin-manage-branch-managers/local-admin-manage-branch-managers.component';
import { EditCashierCheckout } from '../model/edit-cashier-checkout';
import { TechnicalStaffInfo } from '../model/technical-staff-info';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  listLocalAdmins() : Observable<ListPost[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListPost[]>("/api/user/local-admins",{ headers })
    .pipe(

    );

  }

  listBrands() : Observable<ListBrandPost[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListBrandPost[]>("/api/brand/brands",{ headers })
    .pipe(

    );

  }

  addLocalAdmin(localAdmin : User): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/user/local-admin", localAdmin, { headers, observe: 'response'}).pipe(

    );

  }

  deleteLocalAdmin(userId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/user/local-admin/" + userId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  listProductOwners() : Observable<ListProductOwner[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListProductOwner[]>("/api/user/product-owners",{ headers })
    .pipe(

    );

  }

  deleteProductOwner(userId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/user/product-owner/" + userId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }
  addProductOwner(productOwner : User): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/user/product-owner", productOwner, { headers, observe: 'response'}).pipe(

    );

  }

  addBrand(brand : NewBrand): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    return this.http.post<HttpResponse<any>>("/api/brand", brand, { headers, observe: 'response'}).pipe(

    );

  }

  listLocalAdminsWithNoBrands(): Observable<ListPost[]>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListPost[]>("/api/user/local-admins/no-brands",{ headers })
    .pipe(

    );
  }

  editBrand(brandId: string, editedBrand : NewBrand){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/brand/" + brandId;
    return this.http.post<HttpResponse<any>>(url, editedBrand, { headers, observe: 'response'}).pipe(

      );

  }

  editProductOwner(productOwnerId: string, editededProductOwner : EditUser){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/product-owner/" + productOwnerId;
    return this.http.post<HttpResponse<any>>(url, editededProductOwner, { headers, observe: 'response'}).pipe(

      );

  }

  editLocalAdmin(localAdminId: string, editededLocalAdmin : EditUser){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/local-admin/" + localAdminId;
    return this.http.post<HttpResponse<any>>(url, editededLocalAdmin, { headers, observe: 'response'}).pipe(

      );

  }
  listProducts(): Observable<ListProduct[]>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListProduct[]>("/api/product/products",{ headers })
    .pipe(

    );
  }

  deleteProduct(product: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/product/" + product;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  editProduct(product: string, editededProduct : EditProduct){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/product/" + product;
    return this.http.post<HttpResponse<any>>(url, editededProduct, { headers, observe: 'response'}).pipe(

      );

  }

  listProductOwnersWithNoProducts(): Observable<ListProductOwner[]>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListProductOwner[]>("/api/user/product-owners/no-products",{ headers })
    .pipe(

    );
  }

  addProduct(product : NewProduct): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<HttpResponse<any>>("/api/product", product, { headers, observe: 'response'}).pipe(

    );

  }

  listBranchManagers(localAdminId : number) : Observable<ListBranchManagers[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/branch-manager/list/" + localAdminId;
    return this.http.get<ListBranchManagers[]>(url,{ headers })
    .pipe(

    );

  }

  deleteBranchManager(userId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/user/branch-manager/" + userId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  addBranchManager(branchManager : User): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/user/branch-manager", branchManager, { headers, observe: 'response'}).pipe(

    );

  }

  editBranchManager(branchManager: string, editedBranchManager : EditUser){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/branch-manager/" + branchManager;
    return this.http.post<HttpResponse<any>>(url, editedBranchManager, { headers, observe: 'response'}).pipe(

      );

  }

  listTechnicalStaffs(localAdminId : number) : Observable<ListTechnicalStaffs[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = "/api/user/technical-staff/list/" + localAdminId;
    return this.http.get<ListTechnicalStaffs[]>(url,{ headers })
    .pipe(

    );

  }

  deleteTechnicalStaff(userId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/user/technical-staff/" + userId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  addTechnicalStaff(technicalStaff : User): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/user/technical-staff", technicalStaff, { headers, observe: 'response'}).pipe(

    );

  }

  editTechnicalStaff(technicalStaff: string, editedTechnicalStaff : EditUser){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/technical-staff/" + technicalStaff;
    return this.http.post<HttpResponse<any>>(url, editedTechnicalStaff, { headers, observe: 'response'}).pipe(

      );

  }

  listBranches(localAdminId: number) : Observable<ListBranch[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/branch/branches/" + localAdminId;
    return this.http.get<ListBranch[]>(url,{ headers })
    .pipe(

    );

  }

  deleteBranch(branch: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/branch/" + branch;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  addBranch(branch : NewBranch): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/branch", branch, { headers, observe: 'response'}).pipe(

    );

  }

  editBranch(branch: string, editedBranch : EditBranch){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/branch/branches/" + branch;
    return this.http.post<HttpResponse<any>>(url, editedBranch, { headers, observe: 'response'}).pipe(

      );

  }

  listCashiers(userId : number) : Observable<ListCashier[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = "/user/cashier/list/" + userId
    return this.http.get<ListCashier[]>(url,{ headers })
    .pipe(

    );

  }

  deleteCashier(userId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/user/cashier/" + userId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  addCashier(cashier : User): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/user/cashier", cashier, { headers, observe: 'response'}).pipe(

    );

  }

  editCashier(cashier: string, editedCashier : EditUser){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/cashier/" + cashier;
    return this.http.post<HttpResponse<any>>(url, editedCashier, { headers, observe: 'response'}).pipe(

      );

  }

  listCashierCheckouts(branchManangerId : number) : Observable<ListCashierCheckout[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/cashier-checkout/cashier-checkouts/" + branchManangerId;
    return this.http.get<ListCashierCheckout[]>(url,{ headers })
    .pipe(

    );

  }

  deleteCashierCheckout(userId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/user/cashier/" + userId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  addCashierCheckout(cashier : NewCashierCheckout): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  


    return this.http.post<HttpResponse<any>>("/api/cashier-checkout", cashier, { headers, observe: 'response'}).pipe(

    );

  }

  editCashierCheckout(cashier: string, editedCashierCheckout : EditCashierCheckout){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/user/cashier/" + cashier;
    return this.http.post<HttpResponse<any>>(url, editedCashierCheckout, { headers, observe: 'response'}).pipe(

      );

  }

  getProductIDOfProductOwner(productOwnerId : number):Observable<{ productId: number }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/" + productOwnerId;
    return this.http.get<{ productId: number }>(url,{ headers })
    .pipe(

    );

  }

  getProductLogoOfItem(productID : number):Observable< { productLogo: string }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/product-logo/" + productID;
    return this.http.get< { productLogo: string }>(url,{ headers })
    .pipe(

    );

  }

  getProductAllInfo(productID : number):Observable<ProductAllInfo>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/product-all-info/" + productID;
    return this.http.get<ProductAllInfo>(url,{ headers })
    .pipe(

    );

  }

  getTopTenBranches(productID : number):Observable<{ topTenBranches: TopTenBranches[] }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/top-ten-branches/" + productID;
    return this.http.get<{ topTenBranches: TopTenBranches[] }>(url,{ headers })
    .pipe(

    );

  }

  getTopFiveItems(productID : number):Observable<{ topFiveItems: TopFiveItems[] }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/top-five-items/" + productID;
    return this.http.get<{ topFiveItems: TopFiveItems[] }>(url,{ headers })
    .pipe(

    );

  }

  getAllBranches(productID : number):Observable<{ topTenBranches: TopTenBranches[] }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/top-all-branches/" + productID;
    return this.http.get<{ topTenBranches: TopTenBranches[] }>(url,{ headers })
    .pipe(

    );

  }

  getAllItems(productID : number):Observable<{ allItems: AllItems[] }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/top-all-items/" + productID;
    return this.http.get<{ allItems: AllItems[] }>(url,{ headers })
    .pipe(

    );

  }

  getAllItemDeteils(productID : number):Observable<{ allItems: AllItems[] }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    const url = "/api/item/top-all-items/" + productID;
    return this.http.get<{ allItems: AllItems[] }>(url,{ headers })
    .pipe(

    );

  }

  
  addItem(item : NewItem): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  

    return this.http.post<HttpResponse<any>>("/api/item", item, { headers, observe: 'response'}).pipe(

    );

  }

  getBrancIdOfTechnicalStaff(userId: number ): Observable<{ branchId: number }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/item/branch/" + userId;
    return this.http.get<{ branchId: number }>(url, { headers}).pipe(
    )

  }

  listTechnicalStaffWithNoBranch(): Observable<ListTechnicalStaffs[]>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListTechnicalStaffs[]>("/api/user/technical-staffs/no-branches",{ headers })
    .pipe(

    );
  }

  listBranchManagerWithNoBranch(): Observable<ListBranchManagers[]>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListBranchManagers[]>("/api/user/branch-managers/no-branches",{ headers })
    .pipe(

    );
  }

  
  deleteBrand(brandId: string ): Observable<HttpResponse<any>>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = "/api/brand/" + brandId;
    return this.http.delete<HttpResponse<any>>(url, { headers, observe: 'response'}).pipe(
    )

  }

  listCashiersWithNoCashierChekout() : Observable<ListCashier[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListCashier[]>("/api/user/cashier/no-cashier-checkouts",{ headers })
    .pipe(

    );

  }

  getTechnicalStaffId(branchId : number) : Observable<TechnicalStaffInfo[]>{
    const token = this.authService.getToken();
    console.warn(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = "/api/branch/technical-staff/" + branchId;
    return this.http.get<TechnicalStaffInfo[]>(url,{ headers })
    .pipe(

    );

  }


  getBrancIdOfCashierCheckout(branchManagerId: number ): Observable<{ branchId: number }>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    const url = "/api/branch/branch-manager/" + branchManagerId;
    return this.http.get<{ branchId: number }>(url, { headers}).pipe(
    )

  }



}
