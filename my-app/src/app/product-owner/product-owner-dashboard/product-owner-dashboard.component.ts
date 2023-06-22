import { Component, Input, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/data-sharing-service.service';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from 'src/app/service/request-service.service';
import { ListCashier } from 'src/app/model/list-cashier';
import { HttpResponse } from '@angular/common/http';
import { ProductAllInfo } from 'src/app/model/product-all-info';
import { Directive } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent } from "ng-apexcharts";
import { TopTenBranches } from 'src/app/model/top-ten-branches';
import { TopFiveItems } from 'src/app/model/top-five-items';

const MESSAGE_TIMEOUT = 5000; 

@Component({
  selector: 'app-product-owner-dashboard',
  templateUrl: './product-owner-dashboard.component.html',
  styleUrls: ['./product-owner-dashboard.component.scss']
})
export class ProductOwnerDashboardComponent implements OnInit{
  name : string | null = "";
  surname : string | null = "";
  role : string | null = "";


  message : string = "";
  errorMessage : string = "";
  timeoutID: ReturnType<typeof setTimeout> | undefined;

  errorMessages: string[] = [];
  messages: string[] = [];

  userId : number = 0;
  productID : number = 0;
  productLogo : string = "";

  totalItems: number = 0;
  totalSoldItems: number = 0;
  totalRemainingItems: number = 0;

  chartOptions: Partial<ChartOptions> | undefined;
  chartOption2: Partial<ChartOptionsProduct> | undefined;

  @ViewChild('branchChart') branchChart: ChartComponent | undefined;
  @ViewChild('itemChart') itemChart: ChartComponent | undefined;
  monthChart: any;
  yearChart: any;
  colorChart = ['#673ab7'];


  branches: BehaviorSubject<BranchInfo[]> = new BehaviorSubject<BranchInfo[]>([]); 
  items: BehaviorSubject<ItemInfo[]> = new BehaviorSubject<ItemInfo[]>([]); 


  // branches : BranchInfo = {
  //   topTotalAmount : 0,
  //   topTotalRemainingAmount : 0,
  //   topTotalSoldAmount : 0,
  //   isReported : true,
  //   productId : 0,
  //   productName : "",   
  //   productLogo : "",  
  //   productOwnerId : 0,
  //   productOwnerName : "",       
  //   productOwnerSurname : "",
  //   branchId : 0,
  //   branchName : "",   
  //   brandId : 0,
  //   brandName : ""
  // }



  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private requestService: RequestService,
    private dataSharingService : DataSharingService) {
      this.userId = parseInt(localStorage.getItem('userId')!, 10);
     
    }

  ngOnInit(): void {
    this.name = this.authService.getUserName();
    this.surname = this.authService.getUserSurname();

    this.getProductIDOfProductOwner();
   
    
  }

  updateChartOption(){
    const branchesArray = this.branches.getValue();

    this.chartOptions = {
      series: [
        {
          name: 'Total Amount',
          data: branchesArray.slice(0, 10).map(branch => branch.topTotalAmount)
        },
        {
          name: 'Total Sold Amount',
          data: branchesArray.slice(0, 10).map(branch => branch.topTotalSoldAmount)
        },
        {
          name: 'Total Remaining Amount',
          data: branchesArray.slice(0, 10).map(branch => branch.topTotalRemainingAmount)
        }
      ],
      dataLabels: {
        enabled: false
      },
      chart: {
        type: 'bar',
        height: 480,
        stacked: true,
        toolbar: {
          show: true
        }
      },
      colors: ['#90caf9', '#1e88e5', '#673ab7', '#ede7f6'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: branchesArray.slice(0, 10).map(branch => branch.branchName)
      },
      grid: {
        strokeDashArray: 4
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }


  updateChartOption2(){
    const itemsArray = this.items.getValue();
    this.chartOption2 = {
      series: itemsArray.slice(0, 5).map(item => item.itemSoldAmount),
      chart: {
        type: "donut"
      },
      labels: itemsArray.slice(0, 5).map(item => item.itemName),
      
      responsive: [
          {
              breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      
  }

  viewAllItems(){
    this.router.navigate(['/product-owner/item-statistics']);
  }

  viewAllBranches(){
    this.router.navigate(['/product-owner/branch-statistics']);
  }

  getProductIDOfProductOwner(){
    
    this.requestService.getProductIDOfProductOwner(this.userId).subscribe((response: { productId: number }) => {
      
    //  console.log(response);
      if (response) {
        this.productID = response.productId;
        this.getProductTotalInfos();
        this.getTopTenBranches();
        this.getTopFiveItems();
        this.getProductLogoOfItem();
        

      }
    
    });

   // console.log(this.productID); 
  }

  getProductLogoOfItem(){
    this.requestService.getProductLogoOfItem(this.productID).subscribe((response: { productLogo: string }) => {
      
   //   console.log(response);
      if (response) {
        this.productLogo = response.productLogo;
      }
    
    });

   // console.log(this.productLogo); 
  }

  getProductTotalInfos(){
    
   // console.log(this.productID)
    this.requestService.getProductAllInfo(this.productID).subscribe((response: ProductAllInfo ) => {
      
   //   console.log(response);
      if (response) {
            this.totalItems = response.totalItems ;
            this.totalRemainingItems = response.totalRemainingItems ;
            this.totalSoldItems = response.totalSoldItems ;
      }
    
    });

    
  }


  getTopTenBranches(){
    this.requestService.getTopTenBranches(this.productID).subscribe((response: { topTenBranches: TopTenBranches[] }) => {
      console.log(response);
      if (response) {
        this.branches.next([]); 
        response.topTenBranches.forEach((item: TopTenBranches) => {
          const branchInfo: BranchInfo = {  
            topTotalAmount : item.topTotalAmount,
            topTotalRemainingAmount : item.topTotalRemainingAmount,
            topTotalSoldAmount : item.topTotalSoldAmount,
            isReported : item.isReported,
            productId : item.productId,
            productName : item.productName,   
            productLogo : item.productLogo,  
            productOwnerId : item.productOwnerId,
            productOwnerName : item.productOwnerName,       
            productOwnerSurname : item.productOwnerSurname,
            branchId : item.branchId,
            branchName : item.branchName,   
            brandId : item.brandId,
            brandName : item.brandName
          };


          const updatedInfos = this.branches.getValue().concat(branchInfo);
          this.branches.next(updatedInfos);

          
        })
      

        this.updateChartOption();
      }
    });
  }

  getTopFiveItems(){
    this.requestService.getTopFiveItems(this.productID).subscribe((response: { topFiveItems: TopFiveItems[]}) => {
      console.log(response);
      if (response) {
        this.items.next([]); 
        response.topFiveItems.forEach((item: TopFiveItems) => {
          const itemInfo: ItemInfo = {  
            itemName : item.itemName,
            itemTotalAmount : item.itemTotalAmount,
            itemRemainingAmount : item.itemRemainingAmount,
            itemSoldAmount : item.itemSoldAmount
          };
          
          const updatedInfos = this.items.getValue().concat(itemInfo);
          this.items.next(updatedInfos);
        })
        this.updateChartOption2();
      }
    });
  }

  addErrorMessage(message: string) {
    this.errorMessages.push(message);
    setTimeout(() => this.removeErrorMessage(message), MESSAGE_TIMEOUT);
  }
 
  removeErrorMessage(errorMessage: string) {
    const index = this.errorMessages.indexOf(errorMessage);
    if (index > -1) {
      this.errorMessages.splice(index, 1);
    }
    this.resetErrorMessage();
  }

  removeMessage(message: string) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
    this.resetMessage();
  }

  addMessage(message: string) {
    this.messages.push(message);
    setTimeout(() => this.removeMessage(message), MESSAGE_TIMEOUT);
  }

  resetMessage(){
    this.message="";

  }

  resetErrorMessage(){
    this.errorMessage="";
  }

  

  
} 


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  colors: string[];
  grid: ApexGrid;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};


export class BranchInfo{
  topTotalAmount: number = 0;
  topTotalRemainingAmount: number = 0;
  topTotalSoldAmount: number = 0;
  isReported: boolean = true;
  productId: number = 0;
  productName: string = "";    
  productLogo: string = "";    
  productOwnerId: number = 0;
  productOwnerName: string = "";        
  productOwnerSurname: string = "";    
  branchId: number = 0;
  branchName: string = "";    
  brandId: number = 0;   
  brandName: string = "";    

}

export type ChartOptionsProduct = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export class ItemInfo  {
  itemName: string = "";    
  itemTotalAmount: number = 0;
  itemRemainingAmount: number = 0;
  itemSoldAmount: number = 0;
}