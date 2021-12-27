import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgendamentosDeClientesPage } from './agendamentos-de-clientes.page';

describe('AgendamentosDeClientesPage', () => {
  let component: AgendamentosDeClientesPage;
  let fixture: ComponentFixture<AgendamentosDeClientesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentosDeClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentosDeClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
