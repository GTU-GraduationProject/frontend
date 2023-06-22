import { Injectable } from '@angular/core';
import { Brands } from '../general-admin/general-admin-manage-brands/general-admin-manage-brands.component';
import { ProductOwners } from '../general-admin/general-admin-manage-product-owners/general-admin-manage-product-owners.component';
import { LocalAdmins } from '../general-admin/general-admin-manage-local-admins/general-admin-manage-local-admins.component';
import { Products } from '../general-admin/general-admin-manage-products/general-admin-manage-products.component';
import { BranchManagers } from '../local-admin/local-admin-manage-branch-managers/local-admin-manage-branch-managers.component';
import { TechnicalStaffs } from '../local-admin/local-admin-manage-technical-staffs/local-admin-manage-technical-staffs.component';
import { Branches } from '../local-admin/local-admin-manage-branches/local-admin-manage-branches.component';
import { Cashiers } from '../branch-manager/branch-manager-manage-cashiers/branch-manager-manage-cashiers.component';
import { CashierCheckouts } from '../branch-manager/branch-manager-manage-cashier-checkouts/branch-manager-manage-cashier-checkouts.component';
import { AllItemInfo } from '../product-owner/product-owner-item-statistics/product-owner-item-statistics.component';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private brand : Brands = {
    brandId : 0,
    brandName : "",
    brandLogo : "",
    localAdminId : 0,
    localAdminName : "",
    localAdminSurname : "",
  };

  private productOwner : ProductOwners = {
    id : 0,
    name  : "",
    surname  : "",
    productName : "",
    productId  : 0,
    productLogo  : "",
    email : "",
  };
  
  private localAdmin : LocalAdmins = {
    id : 0,
    name : "",
    surname : "",
    brandName: "",
    brandId : 0,
    email: ""
  };

  private product : Products = {
    productId :  0,
    productName :  "",
    productLogo :  "",
    productOwnerId:  0,
    productOwnerName :  "",
    productOwnerSurname:  ""
  }

  private branchManager : BranchManagers = {
    id :  0,
    name :  "",
    surname :  "",
    email:  "",
    brandName:  "",
    brandId :  0,
    branchName:  "",
    branchId :  0
  }

  private technicalStaff : TechnicalStaffs = {
    id :  0,
    name :  "",
    surname :  "",
    email:  "",
    brandName:  "",
    brandId :  0,
    branchName:  "",
    branchId :  0
  }

  private branch : Branches = {
    brandId :  0,
    brandName :  "",
    brandLogo :  "",
    branchId:  0,
    branchName:  "",
    branchManagerId :  0,
    branchManagerName:  "",
    branchManagerSurname :  ""
  }

  private cashier : Cashiers = {
    id :  0,
    name :  "",
    surname :  "",
    email:  "",
    brandName:  "",
    brandId :  0,
    branchName:  "",
    branchId :  0,
    cashierCheckoutId : 0
  }

  private cashierCheckout : CashierCheckouts = {
    cashierCheckoutId :  0,
    cameraId :  "",
    cashierId:  0,
    cashierName:  "",
    cashierSurname :  ""
  }

  private item : AllItemInfo = {
    itemId :  0,
    itemName:  "",    
    itemTotalAmount:  0,
    itemRemainingAmount:  0,
    itemSoldAmount:  0,
    productId:  0,
    productName:  "",    
    productOwnerId:  0,
    productOwnerName:  "",        
    productOwnerSurname:  "",    
    branchId:  0,
    branchName:  "",    
    brandId:  0,   
    brandName:  "" 
  }



  constructor() { }

  setBrandData(brand: Brands) {
    this.brand = brand;
  }

  getBrandData() : Brands {
    return this.brand;
  }


  setProductOwner(productOwner: ProductOwners) {
    this.productOwner = productOwner;
  }

  getProductOwner() : ProductOwners {
    return this.productOwner;
  }

  setLocalAdmin(localAdmin : LocalAdmins){
    this.localAdmin = localAdmin;
  }
  
  getLocalAdmin() : LocalAdmins{
    return this.localAdmin;
  }

  setProduct(product : Products){
    this.product = product;
  }
  
  getProduct() : Products{
    return this.product;
  }

  setBranchManager(branchManager : BranchManagers){
    this.branchManager = branchManager;
  }
  
  getBranchManager() : BranchManagers{
    return this.branchManager;
  }

  setTechnicalStaff(technicalStaff: TechnicalStaffs) {
    this.technicalStaff = technicalStaff;
  }

  getTechnicalStaff() : TechnicalStaffs {
    return this.technicalStaff;
  }

  setBranch(branch: Branches) {
    this.branch = branch;
  }

  getBranch() : Branches {
    return this.branch;
  }

  setCashier(cashier: Cashiers) {
    this.cashier = cashier;
  }

  getCashier() : Cashiers {
    return this.cashier;
  }

  setCashierCheckout(cashierCheckout: CashierCheckouts) {
    this.cashierCheckout = cashierCheckout;
  }

  getCashierCheckout() : CashierCheckouts {
    return this.cashierCheckout;
  }

  setItem(item: AllItemInfo) {
    this.item = item;
  }

  getItem() : AllItemInfo {
    return this.item;
  }

}
