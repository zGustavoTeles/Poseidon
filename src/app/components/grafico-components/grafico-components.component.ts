import { Component, ViewChild, OnInit, Input, } from '@angular/core';
import * as chartJs from 'chart.js';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'grafico',
    templateUrl: './grafico-components.component.html',
    styleUrls: ['./grafico-components.component.scss'],
})
export class GraficoComponentsComponent implements OnInit {
    public selectTipoGraficoOptions: any = {
        header: 'Tipo de Graficos!'
    };
    tipoGraficoEscolhido: any;

    @ViewChild('barCanvas', { static: false }) barCanvas;
    @ViewChild('lineCanvas', { static: false }) lineCanvas;
    @ViewChild('pieCanvas', { static: false }) pieCanvas;
    @ViewChild('doughnutCanvas', { static: false }) doughnutCanvas;

    barChart: any;
    lineChart: any;
    pieChart: any;
    doughnutChart: any;
    tiposDeGraficos: any;

    @Input() tipoGrafico: any;
    @Input() labelGrafico: any;
    @Input() dataGrafico: any;
    @Input() colorGrafico: any;
    @Input() nomeGrafico: any;
    @Input() vemDoPopover = false;

    // Relatorio
    @Input() relatorioGeral = false;

    constructor(private popoverController: PopoverController) {

        this.tiposDeGraficos = ['Tipo Torta', 'Tipo Barras', 'Tipo Rosca', 'Tipo Linhas'];
    }

    // Pegando a imagem do produto
    ngOnInit() {
        this.carregandoGrafico();
    }

    // Criando graficos para Relaltorio
    public carregandoGraficoRelatorio() {
        setTimeout(() => {
            this.barChart = this.getBarChart();
            this.lineChart = this.getLineChart();
        }, 150);
        setTimeout(() => {
            this.pieChart = this.getPieChart();
            this.doughnutChart = this.getDoughnutChart();
        }, 250);
    }

    // Criando graficos para home
    public carregandoGrafico() {

        console.log('aaaaaa');
        console.log(this.tipoGrafico);
        

        setTimeout(() => {
            if (this.tipoGrafico === 'tipoBarras') {
                this.barChart = this.getBarChart(this.labelGrafico, this.dataGrafico, this.colorGrafico);
            }
            if (this.tipoGrafico === 'tipoLinha') {
                this.lineChart = this.getLineChart(this.labelGrafico, this.dataGrafico, this.colorGrafico);
            }
        }, 250);
        setTimeout(() => {
            if (this.tipoGrafico === 'tipoTorta') {
                this.pieChart = this.getPieChart(this.labelGrafico, this.dataGrafico, this.colorGrafico);
            }
            if (this.tipoGrafico === 'tipoRosca') {
                this.doughnutChart = this.getDoughnutChart(this.labelGrafico, this.dataGrafico, this.colorGrafico);
            }
        }, 250);
    }

    getChart(context, chartType, data, options?) {
        return new chartJs(context, {
            data,
            options,
            type: chartType
        });
    }

    // Grafico de barras
    getBarChart(labelGrafico?: any, dataGrafico?: any, _colorGrafico?: any) {

        const data = {
            labels: labelGrafico,
            datasets: [{
                label: 'Meta',
                data: dataGrafico,
                backgroundColor: [
                    '#21273D',
                    '#303956',
                    '#2A6EDA',
                    '#608BFC',
                    '#E1A902'
                ],
                borderWidth: 1
            }]
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
    }

    // Graficos de linhas
    getLineChart(labelGrafico?: any, dataGrafico?: any, _colorGrafico?: any) {
        const data = {
            labels: labelGrafico,
            datasets: [{
                label: 'Desempenho',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#303EFF',
                borderColor: '#303EFF',
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                pointRadius: 1,
                pointHitRadius: 10,
                data: dataGrafico,
                scanGaps: false,
            }, {
                label: 'Segundo desempenho',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#FF5622',
                borderColor: '#FF5622',
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                pointRadius: 1,
                pointHitRadius: 10,
                data: dataGrafico,
                scanGaps: false,
            }
            ]
        };

        return this.getChart(this.lineCanvas.nativeElement, 'line', data);
    }

    // Grafico pizza
    getPieChart(labelGrafico?: any, dataGrafico?: any, colorGrafico?: any) {
        const data = {
            labels: labelGrafico,
            datasets: [{
                data: dataGrafico,
                backgroundColor: colorGrafico,
            }]
        };

        return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
    }

    // Grafico rosquinha
    getDoughnutChart(labelGrafico?: any, dataGrafico?: any, _colorGrafico?: any) {
        const data = {
            labels: labelGrafico,
            datasets: [{
                label: 'Teste Chart',
                data: dataGrafico,
                backgroundColor: [
                    '#12A059',
                    '#CA1F3D',
                    '#0F323B'
                ]
            }]
        };

        return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
    }

    close() {
        this.popoverController.dismiss();
    }

    async mudandoTipoGrafico(item: any) {
        if (item === 'Tipo Torta ') {
            this.tipoGrafico = 'tipoTorta';
        }
        if (item === 'Tipo Barras ') {
            this.tipoGrafico = 'tipoBarra';
        }
        if (item === 'Tipo Rosca ') {
            this.tipoGrafico = 'tipoRosca';
        }
        if (item === 'Tipo Linhas ') {
            this.tipoGrafico = 'tipoLinha';
        }
        await this.carregandoGrafico();
        console.log(item);
    }

}
