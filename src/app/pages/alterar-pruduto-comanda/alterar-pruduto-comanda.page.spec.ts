import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarPrudutoComandaPage } from './alterar-pruduto-comanda.page';

describe('AlterarPrudutoComandaPage', () => {
  let component: AlterarPrudutoComandaPage;
  let fixture: ComponentFixture<AlterarPrudutoComandaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarPrudutoComandaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarPrudutoComandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
