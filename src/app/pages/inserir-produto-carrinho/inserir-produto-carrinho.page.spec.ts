import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InserirProdutoCarrinhoPage } from './inserir-produto-carrinho.page';

describe('InserirProdutoCarrinhoPage', () => {
  let component: InserirProdutoCarrinhoPage;
  let fixture: ComponentFixture<InserirProdutoCarrinhoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserirProdutoCarrinhoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InserirProdutoCarrinhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
