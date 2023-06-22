import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GeneralAdminComponent } from './general-admin/general-admin.component';
import { LocalAdminComponent } from './local-admin/local-admin.component';
import { BranchManagerComponent } from './branch-manager/branch-manager.component';
import { ProductOwnerComponent } from './product-owner/product-owner.component';
import { TechnicalStaffComponent } from './technical-staff/technical-staff.component';
import { AuthGuard } from './auth.guard';
import { UserRole } from './user-role/user-role';
import { GeneralAdminManageBrandsComponent } from './general-admin/general-admin-manage-brands/general-admin-manage-brands.component';
import { GeneralAdminManageLocalAdminsComponent } from './general-admin/general-admin-manage-local-admins/general-admin-manage-local-admins.component';
import { GeneralAdminManageProductOwnersComponent } from './general-admin/general-admin-manage-product-owners/general-admin-manage-product-owners.component';
import { GeneralAdminManageProductsComponent } from './general-admin/general-admin-manage-products/general-admin-manage-products.component';
import { LocalAdminManageBranchesComponent } from './local-admin/local-admin-manage-branches/local-admin-manage-branches.component';
import { LocalAdminManageTechnicalStaffsComponent } from './local-admin/local-admin-manage-technical-staffs/local-admin-manage-technical-staffs.component';
import { LocalAdminManageBranchManagersComponent } from './local-admin/local-admin-manage-branch-managers/local-admin-manage-branch-managers.component';
import { BranchManagerManageCashiersComponent } from './branch-manager/branch-manager-manage-cashiers/branch-manager-manage-cashiers.component';
import { BranchManagerManageCashierCheckoutsComponent } from './branch-manager/branch-manager-manage-cashier-checkouts/branch-manager-manage-cashier-checkouts.component';
import { GeneralAdminEditLocalAdminComponent } from './general-admin/general-admin-manage-local-admins/general-admin-edit-local-admin/general-admin-edit-local-admin.component';
import { GeneralAdminAddLocalAdminComponent } from './general-admin/general-admin-manage-local-admins/general-admin-add-local-admin/general-admin-add-local-admin.component';
import { GeneralAdminAddBrandComponent } from './general-admin/general-admin-manage-brands/general-admin-add-brand/general-admin-add-brand.component';
import { GeneralAdminEditBrandComponent } from './general-admin/general-admin-manage-brands/general-admin-edit-brand/general-admin-edit-brand.component';
import { GeneralAdminEditProductOwnerComponent } from './general-admin/general-admin-manage-product-owners/general-admin-edit-product-owner/general-admin-edit-product-owner.component';
import { GeneralAdminAddProductOwnerComponent } from './general-admin/general-admin-manage-product-owners/general-admin-add-product-owner/general-admin-add-product-owner.component';
import { GeneralAdminEditProductComponent } from './general-admin/general-admin-manage-products/general-admin-edit-product/general-admin-edit-product.component';
import { GeneralAdminAddProductComponent } from './general-admin/general-admin-manage-products/general-admin-add-product/general-admin-add-product.component';
import { LocalAdminAddBranchComponent } from './local-admin/local-admin-manage-branches/local-admin-add-branch/local-admin-add-branch.component';
import { LocalAdminAddTechnicalStaffComponent } from './local-admin/local-admin-manage-technical-staffs/local-admin-add-technical-staff/local-admin-add-technical-staff.component';
import { LocalAdminAddBranchManagerComponent } from './local-admin/local-admin-manage-branch-managers/local-admin-add-branch-manager/local-admin-add-branch-manager.component';
import { LocalAdminEditBranchComponent } from './local-admin/local-admin-manage-branches/local-admin-edit-branch/local-admin-edit-branch.component';
import { LocalAdminEditTechnicalStaffComponent } from './local-admin/local-admin-manage-technical-staffs/local-admin-edit-technical-staff/local-admin-edit-technical-staff.component';
import { LocalAdminEditBranchManagerComponent } from './local-admin/local-admin-manage-branch-managers/local-admin-edit-branch-manager/local-admin-edit-branch-manager.component';
import { ProductOwnerDashboardComponent } from './product-owner/product-owner-dashboard/product-owner-dashboard.component';
import { ProductOwnerItemStatisticsComponent } from './product-owner/product-owner-item-statistics/product-owner-item-statistics.component';
import { ProductOwnerBranchStatisticsComponent } from './product-owner/product-owner-branch-statistics/product-owner-branch-statistics.component';
import { ProductOwnerSeeItemDetailsComponent } from './product-owner/product-owner-see-item-details/product-owner-see-item-details.component';
import { TechnicalStaffTrainingComponent } from './technical-staff/technical-staff-training/technical-staff-training.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'general-admin', component: GeneralAdminComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'local-admin', component: LocalAdminComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'branch-manager', component: BranchManagerComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  { path: 'product-owner', component: ProductOwnerComponent, canActivate: [AuthGuard], data: { roles: [UserRole.ProductOwner] } },
  { path: 'technical-staff', component: TechnicalStaffComponent, canActivate: [AuthGuard], data: { roles: [UserRole.TechnicalStaff] } },
  { path: 'general-admin/manage-brands', component: GeneralAdminManageBrandsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/manage-products', component: GeneralAdminManageProductsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/manage-local-admins', component: GeneralAdminManageLocalAdminsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/manage-product-owners', component: GeneralAdminManageProductOwnersComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'local-admin/manage-branches', component: LocalAdminManageBranchesComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/manage-technical-staffs', component: LocalAdminManageTechnicalStaffsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/manage-branch-managers', component: LocalAdminManageBranchManagersComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'branch-manager/manage-cashiers', component: BranchManagerManageCashiersComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  { path: 'branch-manager/manage-cashier-checkouts', component: BranchManagerManageCashierCheckoutsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  { path: 'cashier/start-stop-camera', component: BranchManagerManageCashierCheckoutsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Cashier] } },
  { path: 'general-admin/edit-local-admin', component: GeneralAdminEditLocalAdminComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/add-local-admin', component: GeneralAdminAddLocalAdminComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/edit-brand', component: GeneralAdminEditBrandComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/add-brand', component: GeneralAdminAddBrandComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/edit-product-owner', component: GeneralAdminEditProductOwnerComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/add-product-owner', component: GeneralAdminAddProductOwnerComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/edit-product', component: GeneralAdminEditProductComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'general-admin/add-product', component: GeneralAdminAddProductComponent, canActivate: [AuthGuard], data: { roles: [UserRole.GeneralAdmin] } },
  { path: 'local-admin/add-branch', component: LocalAdminAddBranchComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/add-technical-staff', component: LocalAdminAddTechnicalStaffComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/add-branch-manager', component: LocalAdminAddBranchManagerComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/edit-branch', component: LocalAdminEditBranchComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/edit-technical-staff', component: LocalAdminEditTechnicalStaffComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'local-admin/edit-branch-manager', component: LocalAdminEditBranchManagerComponent, canActivate: [AuthGuard], data: { roles: [UserRole.LocalAdmin] } },
  { path: 'product-owner/dashboard', component: ProductOwnerDashboardComponent, canActivate: [AuthGuard], data: { roles: [UserRole.ProductOwner] } },
  { path: 'product-owner/item-statistics', component: ProductOwnerItemStatisticsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.ProductOwner] } },
  { path: 'product-owner/branch-statistics', component: ProductOwnerBranchStatisticsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.ProductOwner] } },
  { path: 'product-owner/details-of-item', component: ProductOwnerSeeItemDetailsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.ProductOwner] } },
  { path: 'technical-staff/training', component: TechnicalStaffTrainingComponent, canActivate: [AuthGuard], data: { roles: [UserRole.TechnicalStaff] } },
  { path: 'branch-manager/add-cashier', component: BranchManagerManageCashiersComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  { path: 'branch-manager/add-cashier-checkout', component: BranchManagerManageCashierCheckoutsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  { path: 'branch-manager/edit-cashier', component: BranchManagerManageCashiersComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  { path: 'branch-manager/edit-cashier-checkout', component: BranchManagerManageCashierCheckoutsComponent, canActivate: [AuthGuard], data: { roles: [UserRole.BranchManager] } },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
