import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RelatorioDeConquistasPage } from './relatorio-de-conquistas.page';

describe('RelatorioDeConquistasPage', () => {
  let component: RelatorioDeConquistasPage;
  let fixture: ComponentFixture<RelatorioDeConquistasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDeConquistasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioDeConquistasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
