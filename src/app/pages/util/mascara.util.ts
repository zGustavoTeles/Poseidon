import { Injectable } from '@angular/core';

@Injectable()

export class MascaraUtil {
    // Nao apagar essas variaveis
    DECIMAL_SEPARATOR = '.';
    GROUP_SEPARATOR = ',';
    pureResult: any;
    maskedId: any;
    val: any;
    v: any;

    constructor() { }

    // Formatando
    format(valString) {
        if (!valString) {
            return '';
        }
        const val = valString.toString();
        const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        // Verificando se e CPF ou CNPJ
        if (parts[0].length == 11) {
            this.maskedId = this.cpf_mask(parts[0]);
            return this.maskedId;
        } else if (parts[0].length == 14) {
            this.maskedId = this.cnpj(parts[0]);
            return this.maskedId;
        } else {
            return null;
        }
    }

    // Removendo tudo que não e digito
    unFormat(val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');

        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        } else {
            return val.replace(/\./g, '');
        }
    }

    // Mascara CPF
    cpf_mask(v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        // de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    }

    // Mascara CNPJ
    cnpj(v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;
    }

    // Formatando o CEP //
    formatCep(valString) {
        if (!valString) {
            return '';
        }
        const val = valString.toString();
        const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (parts[0].length == 8) {
            // Fazendo mascara para o cep //
            this.maskedId = this.cep_mask(parts[0]);
            return this.maskedId;
        } else {
            return null;
        }
    }

    cep_mask(v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        return v;

    }

    // Formatando o Telefone //
    formatTel(valString) {
        if (!valString) {
            return '';
        }
        const val = valString.toString();
        const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (parts[0].length == 11) {
            this.maskedId = this.tel_mask_cel(parts[0]);
            return this.maskedId;
        } else if (parts[0].length == 10) {
            this.maskedId = this.tel_mask_tel(parts[0]);
            return this.maskedId;
        } else if (parts[0].length < 10) {
            this.maskedId = this.tel_mask_tel(parts[0]);
            return this.maskedId;
        } else {
            return null;
        }
    }

    tel_mask_cel(v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{0})(\d)/, '$1($2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{2})(\d)/, '$1)$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;

    }

    tel_mask_tel(v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        v = v.replace(/(\d{0})(\d)/, '$1($2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{2})(\d)/, '$1)$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;

    }

    // Formatando data do cartão //
    formatDataCartao(valString) {
        if (!valString) {
            return '';
        }
        const val = valString.toString();
        const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (parts[0].length == 6) {
            this.maskedId = this.data_mask(parts[0]);
            return this.maskedId;
        } else {
            return null;
        }
    }


    data_mask(v) {
        v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
        // v = v.replace(/(\d{0})(\d)/, '$1($2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{2})(\d)/, '$1/$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        // v = v.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return v;

    }
}
