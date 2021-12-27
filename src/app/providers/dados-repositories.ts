import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DadosRepositories {

    constructor() { }


    setLocalStorage(caminho: string, valorDeVenda: any) {
        localStorage.setItem(caminho, valorDeVenda);
    }

    getLocalStorage(caminho) {
        return localStorage.getItem(caminho);
    }

   removeLocalStorage(caminho) {
        return localStorage.removeItem(caminho);
    }

    deleteLocalStorage() {
        return localStorage.clear();
    }

    
}
