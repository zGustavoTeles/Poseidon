
import { LoadingController, Platform } from '@ionic/angular';


/**
 * Class responsavel pela manutenção e controle dos relatórios
 * @autor Amilton Santos
 */

export class RelatorioUtil {
    dadosGerais: any;
    totalVencer: any;
    totalVencidos: any;
    titleRelatorio: any;
    widths: any;
    pageOrietacao: any;
    nomePdf: any;
    nomeArquivo: any;
    alertPdf: any;
    alertCsv: any;
    pdfObj = null;
    quantLinha: any;
    csvData: any[] = [];
    cabecalho: any[] = [];

    constructor(
        private file: File,
        private loadingController: LoadingController,
        private platform: Platform) {
    }

    /**
     * Faz a ordenação do relatorio por data
     * @param listaParaOrdenar - Array a ser ordenado
     * @param tipoOrdenacao - Crescente - Decrecente
     * @returns 
     */
    async ordernarRelatorio(listaParaOrdenar: any, tipoOrdenacao: string): Promise<any> {

        try {
            const temp = [...listaParaOrdenar];

            if (tipoOrdenacao === 'Crescente') {
                temp.sort((a, b) => {
                    return a.dataUltimaFatura <= b.dataUltimaFatura ? -1 : 1
                })
            } else if (tipoOrdenacao === 'Decrescente') {
                temp.sort((a, b) => {
                    return a.dataUltimaFatura >= b.dataUltimaFatura ? -1 : 1

                })
            } else if (tipoOrdenacao === 'Maior Valor') {
                temp.sort((a, b) => {
                    return a.totalValor >= b.totalValor ? -1 : 1

                })

            } else if (tipoOrdenacao === 'Menor Valor') {
                temp.sort((a, b) => {
                    return a.totalValor <= b.totalValor ? -1 : 1

                })

            }else if (tipoOrdenacao === 'Somente Produtos') {
                temp.sort((a, b) => {
                    return a.categoria != 'Serviços' ? -1 : 1

                })

            } else if (tipoOrdenacao === 'Somente Serviços') {
                temp.sort((a, b) => {
                    return a.categoria === 'Serviços' ? -1 : 1

                })
            }

            return temp;

        } catch (error) {
            console.log('Erro na ordenação!:', error);
            return listaParaOrdenar;
        }

    }
}
