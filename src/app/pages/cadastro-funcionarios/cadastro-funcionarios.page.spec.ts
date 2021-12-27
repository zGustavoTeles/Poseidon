import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroFuncionariosPage } from './cadastro-funcionarios.page';

describe('CadastroFuncionariosPage', () => {
  let component: CadastroFuncionariosPage;
  let fixture: ComponentFixture<CadastroFuncionariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroFuncionariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroFuncionariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
