import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartaoFidelidadePage } from './cartao-fidelidade.page';

describe('CartaoFidelidadePage', () => {
  let component: CartaoFidelidadePage;
  let fixture: ComponentFixture<CartaoFidelidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoFidelidadePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoFidelidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
