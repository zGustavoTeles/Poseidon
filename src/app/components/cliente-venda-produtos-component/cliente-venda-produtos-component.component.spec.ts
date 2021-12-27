import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClienteVendaProdutosComponentComponent } from './cliente-venda-produtos-component.component';

describe('ClienteVendaProdutosComponentComponent', () => {
  let component: ClienteVendaProdutosComponentComponent;
  let fixture: ComponentFixture<ClienteVendaProdutosComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteVendaProdutosComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteVendaProdutosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
