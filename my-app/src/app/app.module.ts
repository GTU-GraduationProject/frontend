import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GeneralAdminComponent } from './general-admin/general-admin.component';
import { LocalAdminComponent } from './local-admin/local-admin.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { ProductOwnerComponent } from './product-owner/product-owner.component';
import { TechnicalStaffComponent } from './technical-staff/technical-staff.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { GeneralAdminManageBrandsComponent } from './general-admin/general-admin-manage-brands/general-admin-manage-brands.component';
import { GeneralAdminManageLocalAdminsComponent } from './general-admin/general-admin-manage-local-admins/general-admin-manage-local-admins.component';
import { GeneralAdminManageProductOwnersComponent } from './general-admin/general-admin-manage-product-owners/general-admin-manage-product-owners.component';
import { LocalAdminManageBranchesComponent } from './local-admin/local-admin-manage-branches/local-admin-manage-branches.component';
import { LocalAdminManageBranchManagersComponent } from './local-admin/local-admin-manage-branch-managers/local-admin-manage-branch-managers.component';
import { LocalAdminManageTechnicalStaffsComponent } from './local-admin/local-admin-manage-technical-staffs/local-admin-manage-technical-staffs.component';
import { GeneralAdminManageProductsComponent } from './general-admin/general-admin-manage-products/general-admin-manage-products.component';
import { BranchManagerManageCashierCheckoutsComponent } from './branch-manager/branch-manager-manage-cashier-checkouts/branch-manager-manage-cashier-checkouts.component';
import { BranchManagerManageCashiersComponent } from './branch-manager/branch-manager-manage-cashiers/branch-manager-manage-cashiers.component';
import { MatTableModule } from '@angular/material/table';
import { SidebarGeneralAdminComponent } from './sidebar-general-admin/sidebar-general-admin.component';
import { GeneralAdminEditLocalAdminComponent } from './general-admin/general-admin-manage-local-admins/general-admin-edit-local-admin/general-admin-edit-local-admin.component';
import { FormsModule } from '@angular/forms';
import { GeneralAdminAddLocalAdminComponent } from './general-admin/general-admin-manage-local-admins/general-admin-add-local-admin/general-admin-add-local-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GeneralAdminAddBrandComponent } from './general-admin/general-admin-manage-brands/general-admin-add-brand/general-admin-add-brand.component';
import { GeneralAdminEditBrandComponent } from './general-admin/general-admin-manage-brands/general-admin-edit-brand/general-admin-edit-brand.component';
import { GeneralAdminEditProductOwnerComponent } from './general-admin/general-admin-manage-product-owners/general-admin-edit-product-owner/general-admin-edit-product-owner.component';
import { GeneralAdminAddProductOwnerComponent } from './general-admin/general-admin-manage-product-owners/general-admin-add-product-owner/general-admin-add-product-owner.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GeneralAdminAddProductComponent } from './general-admin/general-admin-manage-products/general-admin-add-product/general-admin-add-product.component';
import { GeneralAdminEditProductComponent } from './general-admin/general-admin-manage-products/general-admin-edit-product/general-admin-edit-product.component';
import { SidebarLocalAdminComponent } from './sidebar-local-admin/sidebar-local-admin.component';
import { LocalAdminAddBranchManagerComponent } from './local-admin/local-admin-manage-branch-managers/local-admin-add-branch-manager/local-admin-add-branch-manager.component';
import { LocalAdminEditBranchManagerComponent } from './local-admin/local-admin-manage-branch-managers/local-admin-edit-branch-manager/local-admin-edit-branch-manager.component';
import { LocalAdminEditTechnicalStaffComponent } from './local-admin/local-admin-manage-technical-staffs/local-admin-edit-technical-staff/local-admin-edit-technical-staff.component';
import { LocalAdminAddTechnicalStaffComponent } from './local-admin/local-admin-manage-technical-staffs/local-admin-add-technical-staff/local-admin-add-technical-staff.component';
import { LocalAdminAddBranchComponent } from './local-admin/local-admin-manage-branches/local-admin-add-branch/local-admin-add-branch.component';
import { LocalAdminEditBranchComponent } from './local-admin/local-admin-manage-branches/local-admin-edit-branch/local-admin-edit-branch.component';
import { SidebarBranchManagerComponent } from './sidebar-branch-manager/sidebar-branch-manager.component';
import { SidebarProductOwnerComponent } from './sidebar-product-owner/sidebar-product-owner.component';
import { ProductOwnerDashboardComponent } from './product-owner/product-owner-dashboard/product-owner-dashboard.component';
import { ProductOwnerBranchStatisticsComponent } from './product-owner/product-owner-branch-statistics/product-owner-branch-statistics.component';
import { ProductOwnerItemStatisticsComponent } from './product-owner/product-owner-item-statistics/product-owner-item-statistics.component';
import { ProductOwnerSeeItemDetailsComponent } from './product-owner/product-owner-see-item-details/product-owner-see-item-details.component';
import { TechnicalStaffTrainingComponent } from './technical-staff/technical-staff-training/technical-staff-training.component';
import { SidebarTechnicalStaffComponent } from './sidebar-technical-staff/sidebar-technical-staff.component';
import { BranchManagerAddCashierComponent } from './branch-manager/branch-manager-manage-cashiers/branch-manager-add-cashier/branch-manager-add-cashier.component';
import { BranchManagerAddCashierCheckoutComponent } from './branch-manager/branch-manager-manage-cashier-checkouts/branch-manager-add-cashier-checkout/branch-manager-add-cashier-checkout.component';
import { BranchManagerEditCashierCheckoutComponent } from './branch-manager/branch-manager-manage-cashier-checkouts/branch-manager-edit-cashier-checkout/branch-manager-edit-cashier-checkout.component';
import { BranchManagerEditCashierComponent } from './branch-manager/branch-manager-manage-cashiers/branch-manager-edit-cashier/branch-manager-edit-cashier.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneralAdminComponent,
    LocalAdminComponent,
    BranchManagerComponent,
    ProductOwnerComponent,
    TechnicalStaffComponent,
    GeneralAdminManageBrandsComponent,
    GeneralAdminManageLocalAdminsComponent,
    GeneralAdminManageProductOwnersComponent,
    LocalAdminManageBranchesComponent,
    LocalAdminManageBranchManagersComponent,
    LocalAdminManageTechnicalStaffsComponent,
    GeneralAdminManageProductsComponent,
    BranchManagerManageCashierCheckoutsComponent,
    BranchManagerManageCashiersComponent,
    SidebarGeneralAdminComponent,
    GeneralAdminEditLocalAdminComponent,
    GeneralAdminAddLocalAdminComponent,
    GeneralAdminAddBrandComponent,
    GeneralAdminEditBrandComponent,
    GeneralAdminEditProductOwnerComponent,
    GeneralAdminAddProductOwnerComponent,
    GeneralAdminAddProductComponent,
    GeneralAdminEditProductComponent,
    SidebarLocalAdminComponent,
    LocalAdminAddBranchManagerComponent,
    LocalAdminEditBranchManagerComponent,
    LocalAdminEditTechnicalStaffComponent,
    LocalAdminAddTechnicalStaffComponent,
    LocalAdminAddBranchComponent,
    LocalAdminEditBranchComponent,
    SidebarBranchManagerComponent,
    SidebarProductOwnerComponent,
    ProductOwnerDashboardComponent,
    ProductOwnerBranchStatisticsComponent,
    ProductOwnerItemStatisticsComponent,
    ProductOwnerSeeItemDetailsComponent,
    TechnicalStaffTrainingComponent,
    SidebarTechnicalStaffComponent,
    BranchManagerAddCashierComponent,
    BranchManagerAddCashierCheckoutComponent,
    BranchManagerEditCashierCheckoutComponent,
    BranchManagerEditCashierComponent
    


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    NgxPaginationModule,
    NgApexchartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
