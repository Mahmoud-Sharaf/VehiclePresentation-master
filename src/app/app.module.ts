import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  RouterModule,
  Routes,
  CanActivate,
  PreloadAllModules,
} from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AppComponent } from "./app.component";
// import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HeaderComponent } from "./components/shared/header/header.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { CdkTableModule } from "@angular/cdk/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatBadgeModule,
  MatBottomSheetModule,
} from "@angular/material";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { A11yModule } from "@angular/cdk/a11y";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTreeModule } from "@angular/cdk/tree";
import { NgSelectModule } from "@ng-select/ng-select";
import { LoginComponent } from "./components/account/login/login.component";
import { AccountGComponent } from "./components/account/account-g/account-g.component";
import { DataTablesModule } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { AuthGuardService } from "./services/auth-guard-service.service";
import { AuthServiceService } from "./services/auth-service.service";
import { TokenInterceptor } from "./services/token.interceptor";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { InsuredComponent } from "./components/insured/insured.component";
import { AdditionalDriversComponent } from "./components/insured/additional-drivers/additional-drivers.component";
import { AdditionalInfoComponent } from "./components/insured/additional-info/additional-info.component";
import { LogoSliderComponent } from "./components/logo-slider/logo-slider.component";
import { MainDataInsuredComponent } from "./components/homepage/main-data-insured/main-data-insured.component";
import { MainDataInsuredMobileComponent } from "./components/homepage/main-data-insured-mobile/main-data-insured-mobile.component";
import { CaptchaMobileComponent } from "./components/captcha-mobile/captcha-mobile.component";

import { CaptchaComponent } from "./components/captcha/captcha.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FormtemplateComponent } from "./components/formtemplate/formtemplate.component";
import { QuotationsComponent } from "./components/quotations/quotations.component";
import { MainPgHeaderComponent } from "./components/homepage/main-pg-header/main-pg-header.component";
import { OffersComponent } from "./components/insured/offers/offers.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { MyInfoComponent } from "./components/profile/my-info/my-info.component";
import { StatisticsComponent } from "./components/profile/statistics/statistics.component";
import { NotificationsComponent } from "./components/profile/notifications/notifications.component";
import { PurchasesComponent } from "./components/profile/purchases/purchases.component";
import { ProductsComponent } from "./components/profile/products/products.component";
import { VehiclesComponent } from "./components/profile/vehicles/vehicles.component";
import { TicketsComponent } from "./components/profile/tickets/tickets.component";
import { SadadBillsComponent } from "./components/profile/sadad-bills/sadad-bills.component";
import { RegisterComponent } from "./components/account/register/register.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { ConditionsPolicyComponent } from "./components/conditions-policy/conditions-policy.component";
import { CareersComponent } from "./components/careers/careers.component";
import { ProgramWoorefComponent } from "./components/program-wooref/program-wooref.component";
import { HomeProfileComponent } from "./components/profile/home-profile/home-profile.component";
import { PoliciesComponent } from "./components/profile/policies/policies.component";
import { PaymentHyperPayComponent } from "./components/payment-methods/payment-hyper-pay/payment-hyper-pay.component";
import { PaymentMadaComponent } from "./components/payment-methods/payment-mada/payment-mada.component";
import { ProceedHyperPayComponent } from "./components/payment-methods/proceed-hyper-pay/proceed-hyper-pay.component";
import { ProceedMadaComponent } from "./components/payment-methods/proceed-mada/proceed-mada.component";
import { SuccessPaymentComponent } from "./components/payment-methods/success-payment/success-payment.component";
import { PaymentErrorComponent } from "./components/payment-methods/payment-error/payment-error.component";
import { LoaderComponent } from "./components/shared/loader/loader.component";
import { LoaderQuotationsComponent } from "./components/shared/loader-quotations/loader-quotations.component";

import { ConfirmationDialogBuynowComponent } from "./components/confirmation-dialog-buynow/confirmation-dialog-buynow.component";
import { ConfirmationDialogBuynowService } from "./components/confirmation-dialog-buynow/confirmation-dialog-buynow.service";
import { BillsComponent } from "./components/profile/bills/bills.component";
import { PaymentSadadComponent } from "./components/payment-methods/payment-sadad/payment-sadad.component";
import { TermsandconditionsComponent } from "./components/termsandconditions/termsandconditions.component";
import { InsuranceDocumentComponent } from "./components/insurance-document/insurance-document.component";
import { MissingFieldsComponent } from "./components/missing-fields/missing-fields.component";
import { ConfirmationAddTicketComponent } from "./components/confirmation-add-ticket/confirmation-add-ticket.component";
import { ConfirmationAddTicketComponentService } from "./components/confirmation-add-ticket/confirmation-add-ticket.service";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpLoaderFactory } from "./components/shared/header/header.module";
import { PromotionProgramsComponent } from "./components/profile/promotion-programs/promotion-programs.component";
import { NumberCommaDirective } from '../app/directives/number-comma.directive';
import {  NgxSlickJsModule } from 'ngx-slickjs'

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
// }
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NationalAddressComponent } from './components/profile/national-address/national-address.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { NewQutationsComponent } from './components/new-qutations/new-qutations/new-qutations.component';
import { SearchResultComponent } from './components/new-qutations/search-result/search-result.component';
import { SearchResultOptionsComponent } from './components/new-qutations/search-result-options/search-result-options.component';
import { ProductListComponent } from './components/new-qutations/product-list/product-list.component';
import { ProductComponent } from './components/new-qutations/product/product.component';
import { BenefitsComponent } from './components/new-qutations/benefits/benefits.component';

const appRoutes: Routes = [
  {
    path: "",
    component: HomepageComponent,
    data: { title: "homepage" },
  },
  {
    path: "edit/:reqExtId",
    component: HomepageComponent,
    data: { title: 'edit' }
  }
   ,
   {
    path: 'print-policy',
    component: InsuranceDocumentComponent,
    data: { title: 'print-policy' }
  }, 
  {
    path: "account-g",
    component: AccountGComponent,
    data: { title: "account-g" },
  },
  {
    path: "insured",
    component: InsuredComponent,
    data: { title: "insured" },
  },
  {
    path: "form-template",
    component: FormtemplateComponent,
    data: { title: "formtemplate" },
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    data: { title: "checkout" },
    canActivate: [AuthGuardService]
  },
  {
    path: "quotations/:reqExtId",
    component: QuotationsComponent,
    data: { title: "quotations" },
  },
  {
    path: "newQuotations/:reqExtId",
    component: NewQutationsComponent,
    data: { title: "newQuotations" },
  },
  {
    path: "missing-fields/:reqExtId",
    component: MissingFieldsComponent,
    data: { title: "missing-fields" },
    // canActivate: [AuthGuardService]
  },
  {
    path: "payment-hyper-pay",
    component: PaymentHyperPayComponent,
    data: { title: "payment-hyper-pay" },
    canActivate: [AuthGuardService]
  },
  {
    path: "payment-mada",
    component: PaymentMadaComponent,
    data: { title: "payment-mada" },
    canActivate: [AuthGuardService]
  },
  {
    path: "payment-sadad",
    component: PaymentSadadComponent,
    data: { title: "payment-sadad" },
    canActivate: [AuthGuardService]
  },
  {
    path: "proceed-hyperpay-payment",
    component: ProceedHyperPayComponent,
    data: { title: "proceed-hyperpay-payment" },
    canActivate: [AuthGuardService]
  },
  {
    path: "proceed-mada-payment",
    component: ProceedMadaComponent,
    data: { title: "proceed-mada-payment" },
    canActivate: [AuthGuardService]
  },
  {
    path: "success-payment",
    component: SuccessPaymentComponent,
    data: { title: "success-payment" },
    canActivate: [AuthGuardService]
  },
  {
    path: "payment-error",
    component: PaymentErrorComponent,
    data: { title: "payment-error" },
    canActivate: [AuthGuardService]
  },
  {
    path: "HyperpayProcessPayment/:id",
    component: ProceedHyperPayComponent,
    data: { title: "HyperpayProcessPayment" },
    canActivate: [AuthGuardService]
  },

  // {
  //   path: 'My-Info',
  //   component: MyInfoComponent,
  //   data: { title: 'MyInfo' }
  // }
  // ,
  // {
  //   path: 'Statistics',
  //   component: StatisticsComponent,
  //   data: { title: 'Statistics' }
  // }
  // ,
  // {
  //   path: 'Notifications',
  //   component: NotificationsComponent,
  //   data: { title: 'Notifications' }
  // } ,
  // {
  //   path: 'Purchases',
  //   component: PurchasesComponent,
  //   data: { title: 'Purchases' }
  // }
  // ,
  // {
  //   path: 'Products',
  //   component: ProductsComponent,
  //   data: { title: 'Products' }
  // }
  // ,
  // {
  //   path: 'Vehicles',
  //   component: VehiclesComponent,
  //   data: { title: 'Vehicles' }
  // },
  // ,
  // {
  //   path: 'Tickets',
  //   component: TicketsComponent,
  //   data: { title: 'Tickets' }
  // } ,
  // {
  //   path: 'Sadad-Bills',
  //   component: SadadBillsComponent,
  //   data: { title: 'SadadBills' }
  // },
  {
    path: "app-account-g",
    component: AccountGComponent,
    data: { title: "app-account-g" },
  },
  {
    path: "about-us",
    component: AboutUsComponent,
    data: { title: "about-us" },
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
    data: { title: "contact-us" },
  },
  {
    path: "privacy-policy",
    component: ConditionsPolicyComponent,
    data: { title: "privacy-policy" },
  },
  {
    path: "termsandconditions",
    component: TermsandconditionsComponent,
    data: { title: "termsandconditions" },
  },
  {
    path: "promotionPrograms",
    component: PromotionProgramsComponent,
    data: { title: "Promotion Programs" },
  },
  {
    path: "careers",
    component: CareersComponent,
    data: { title: 'careers' }
    }  
    ,
    {
      path: 'wooref',
      component: ProgramWoorefComponent,
      data: { title: 'wooref' }
      }  
      ,
      {
        path: 'profile',
        component: HomeProfileComponent,
        data: { title: 'profile' },
        canActivate: [AuthGuardService]
        }
        ,
        {
          path: 'bills',
          component: BillsComponent,
          data: { title: 'bills' }
        } ,
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  entryComponents: [
    ConfirmationDialogBuynowComponent,
    ConfirmationAddTicketComponent,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AccountGComponent,
    HomepageComponent,
    InsuredComponent,
    AdditionalDriversComponent,
    AdditionalInfoComponent,
    LogoSliderComponent,
    MainDataInsuredComponent,
    MainDataInsuredMobileComponent,
    CaptchaComponent,
    CaptchaMobileComponent,
    PageNotFoundComponent,
    FormtemplateComponent,
    QuotationsComponent,
    MainPgHeaderComponent,
    OffersComponent,
    CheckoutComponent,
    MyInfoComponent,
    StatisticsComponent,
    NotificationsComponent,
    PurchasesComponent,
    ProductsComponent,
    VehiclesComponent,
    TicketsComponent,
    SadadBillsComponent,
    RegisterComponent,
    AboutUsComponent,
    ContactUsComponent,
    ConditionsPolicyComponent,
    CareersComponent,
    ProgramWoorefComponent,
    HomeProfileComponent,
    PoliciesComponent,
    PaymentHyperPayComponent,
    PaymentMadaComponent,
    ProceedHyperPayComponent,
    ProceedMadaComponent,
    BillsComponent,
    SuccessPaymentComponent,
    PaymentErrorComponent,
    LoaderComponent,
    LoaderQuotationsComponent,
    ConfirmationDialogBuynowComponent,
    PaymentSadadComponent,
    TermsandconditionsComponent,
    InsuranceDocumentComponent,
    MissingFieldsComponent,
    ConfirmationAddTicketComponent,
    PromotionProgramsComponent,
    NumberCommaDirective,
    NationalAddressComponent,
    NewQutationsComponent,
    SearchResultComponent,
    SearchResultOptionsComponent,
    ProductListComponent,
    ProductComponent,
    BenefitsComponent,
  ],
  imports: [
    MatSelectModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgSelectModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule,
    MatDatepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DataTablesModule,
    AngularFontAwesomeModule,
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
  })
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatPaginatorModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    AuthGuardService,
    ConfirmationDialogBuynowService,
    AuthServiceService,
    ConfirmationAddTicketComponentService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
