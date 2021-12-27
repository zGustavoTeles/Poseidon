import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroDeUnidadesDevelopPage } from './cadastro-de-unidades-develop.page';

describe('CadastroDeUnidadesDevelopPage', () => {
  let component: CadastroDeUnidadesDevelopPage;
  let fixture: ComponentFixture<CadastroDeUnidadesDevelopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeUnidadesDevelopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroDeUnidadesDevelopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
