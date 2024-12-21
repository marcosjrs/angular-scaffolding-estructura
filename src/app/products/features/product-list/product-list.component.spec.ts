import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../data-access/products.service';
import ProductListComponent from './product-list.component';
import ProductCardComponent from '../../ui/product-card/product-card.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    productServiceMock = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([
        { id: '1', name: 'Product 1', price: 100 },
        { id: '2', name: 'Product 2', price: 200 },
      ])),
    };

    activatedRouteMock = {
      title: of('Product List'),
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, ProductCardComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products', () => {
    expect(component.products()?.[0]?.name).toBe('Product 1');
    expect(component.products()?.length).toBe(2);
  });

  it('should alert when buy is called', () => {
    spyOn(window, 'alert');
    const product = { id: '1', name: 'Product 1', price: 100 };
    component.buy(product);
    expect(window.alert).toHaveBeenCalledWith('You bought Product 1');
  });

  it('should set the title on ngOnInit', () => {
    component.ngOnInit();
    expect(component.title).toBe('Product List');
  });

  it('should call route.title.subscribe on ngOnInit', () => {
    spyOn(activatedRouteMock.title, 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(activatedRouteMock.title.subscribe).toHaveBeenCalled();
    expect(component.title).toBe('Product List');
  });

});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProductListComponent } from './product-list.component';

// describe('ProductListComponent', () => {
//   let component: ProductListComponent;
//   let fixture: ComponentFixture<ProductListComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ProductListComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ProductListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

