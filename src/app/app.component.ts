import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { DadosRepositories } from './providers/dados-repositories';
import { FirebaseService } from './firebase.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    /**
     * * --------------------------------------ADMINISTRADOR-------------------------------------------------------------------------------------------
     */
    appPagesAdministrador = [
        {
            title: 'Colaboradores',
            url: '/app/tabs/schedule',
            icon: 'medal'
        },
        {
            title: 'Clientes',
            url: '/app/tabs/speakers',
            icon: 'body'
        },
        {
            title: 'Produtos',
            url: '/app/tabs/map',
            icon: 'bag-handle'
        },
        {
            title: 'Relatórios',
            url: '/app/tabs/relatorio-de-vendas',
            icon: 'newspaper'
        },

        {
            title: 'Comandas',
            url: '/app/tabs/relatorios',
            icon: 'basket'
        },
    ];

    /**
     * * --------------------------------------Balcão-------------------------------------------------------------------------------------------
     */
    appPagesBalcao = [
        {
            title: 'Colaboradores',
            url: '/app/tabs/schedule',
            icon: 'medal'
        },
        {
            title: 'Clientes',
            url: '/app/tabs/speakers',
            icon: 'body'
        },

        {
            title: 'Produtos',
            url: '/app/tabs/map',
            icon: 'bag-handle'
        },
        {
            title: 'Relatórios',
            url: '/app/tabs/relatorio-de-vendas',
            icon: 'newspaper'
        },

        {
            title: 'Comandas',
            url: '/app/tabs/relatorios',
            icon: 'basket'
        },
    ];

    /**
    * * --------------------------------------BARBEIRO-------------------------------------------------------------------------------------------
    */
    appPagesBarbeiro = [
        {
            title: 'Clientes',
            url: '/app/tabs/speakers',
            icon: 'body'
        },

        {
            title: 'Produtos',
            url: '/app/tabs/map',
            icon: 'bag-handle'
        },

        {
            title: 'Status',
            url: '/app/tabs/status',
            icon: 'podium'
        },

        {
            title: 'Perfil',
            url: '/app/tabs/account',
            icon: 'person'
        },

    ];

    /**
     * * --------------------------------------CLIENTE-------------------------------------------------------------------------------------------
     */
    appPagesCliente = [
        {
            title: 'Colaboradores',
            url: '/app/tabs/schedule',
            icon: 'medal'
        },
        {
            title: 'Produtos',
            url: '/app/tabs/map',
            icon: 'bag-handle'
        },

        {
            title: 'Fidelidade',
            url: '/app/tabs/cartao-fidelidade',
            icon: 'trophy'
        },

        {
            title: 'Perfil',
            url: '/app/tabs/account',
            icon: 'person'
        },

    ];

    loggedIn = false;
    dark = false;

    perfil: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    imagem: any;
    senha: any;
    nome: any;
    unidade: any;

    documentoUsuario: any;

    constructor(
        private menu: MenuController,
        private platform: Platform,
        private router: Router,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
        public faribaseService: FirebaseService,
        private dadosRepositories: DadosRepositories,
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.getDadosUsuario();
    }

    async initializeApp() {
        await this.platform.ready().then(async () => {
            // this.statusBar.styleDefault();
            // let status bar overlay webview
            this.statusBar.overlaysWebView(false);

            this.verificaUsuarioLogado();

            // set status bar to white
            this.statusBar.backgroundColorByHexString('#1a1b1f');
            this.splashScreen.hide();

        });
    }

    checkLoginStatus() {
        // return this.userData.isLoggedIn().then(loggedIn => {
        //     return this.updateLoggedInStatus(loggedIn);
        // });
    }

    updateLoggedInStatus(loggedIn: boolean) {
        setTimeout(() => {
            this.loggedIn = loggedIn;
        }, 300);
    }

    listenForLoginEvents() {
        window.addEventListener('user:login', () => {
            this.updateLoggedInStatus(true);
        });

        window.addEventListener('user:signup', () => {
            this.updateLoggedInStatus(true);
        });

        window.addEventListener('user:logout', () => {
            this.updateLoggedInStatus(false);
        });
    }

    logout() {
        // this.userData.logout().then(() => {
        //     return this.router.navigateByUrl('/app/tabs/schedule');
        // });
    }

    openTutorial() {
        this.menu.enable(false);
        this.storage.set('ion_did_tutorial', false);
        this.router.navigateByUrl('/tutorial');
    }

    public async getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.imagem = this.dadosRepositories.getLocalStorage('imagem');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }
    public async setDocumentoUsuario() {
        this.faribaseService.getDadosUsuarioDoc(this.email).subscribe(data => {
            data.forEach(row => {
                let line = Object(row.payload.doc.data());
                line.doc = String(row.payload.doc.id);
                this.dadosRepositories.setLocalStorage('documento', line.doc);
            });
        });
    }

    public async verificaUsuarioLogado() {

        if (this.dadosRepositories.getLocalStorage('login') === "true") {

            this.getDadosUsuario();
            this.menu.enable(true);
            this.router.navigateByUrl('/app/tabs/home');
        } else {
            this.router.navigateByUrl('/login');
        }

    }

}