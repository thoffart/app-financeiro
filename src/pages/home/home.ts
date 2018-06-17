import { GastoPage } from "./../gasto/gasto";
import { ApiProvider } from "./../../providers/api/api";
import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { Chart } from "chart.js";
import "chartjs-plugin-datalabels";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/distinctuntilchanged";
import { from } from "rxjs/observable/from";
import { map } from "rxjs/operators";
import { mapTo } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements AfterViewInit {
  /*  categorias = [
    "Alimentação",
    "Animal de estimação",
    "Casa",
    "Educação",
    "Gastos Pessoais",
    "Impostos",
    "Lazer",
    "Receita",
    "Saúde",
    "Seguros",
    "Serviços Financeiros",
    "Transporte"
  ]; */
  categorias: any = [];
  gastos: any;
  receitas: any;
  noValues = true;

  @ViewChild("doughnutCanvas") doughnutCanvas;
  @ViewChild("search", { read: ElementRef })
  searchBar: ElementRef;
  doughnutChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private modalctrl: ModalController
  ) {}

  ngAfterViewInit() {
    this.api.getCat("-987").subscribe(res => {
      this.categorias = JSON.parse(res);
      this.categorias = this.categorias.categorias;
    });
    
    let USEREMAIL = 'K1kd@gmail.com';

    this.api.getGastos(USEREMAIL).subscribe(res => { //Pega os gastos e atualiza o grafico
      let gastos = JSON.parse(res);
      gastos = gastos.gastos
      let sum = 0;
      gastos.forEach(element => {
        sum += parseFloat(element.valor);
      });
      if (sum == 0)
        return
      this.gastos = sum;
      this.doughnutChart.data.datasets[0].data[0] = sum;
      this.doughnutChart.update();
      this.noValues = false; //Tem valor no grafico entao mostra o grafico
    });

    this.api.getReceitas(USEREMAIL).subscribe(res => { //Pega as receitas e atualiza o grafico
      let rec =  JSON.parse(res);
      rec = rec.receitas
      let sum = 0;
      rec.forEach(element => {
        sum += parseFloat(element.valor);
      });
      if (sum == 0)
        return
      this.receitas = sum;
      this.doughnutChart.data.datasets[0].data[1] = sum;
      this.doughnutChart.update();
      this.noValues = false; //Tem valor no grafico entao mostra o grafico
    });
    
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Gastos", "Receita"],
        datasets: [
          {
            label: "# of Votes",
            data: [0, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxWidth: 50,
            fontColor: "black"
          }
        },
        plugins: {
          datalabels: {
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            borderColor: "white",
            borderRadius: 25,
            borderWidth: 2,
            color: "white",
            display: function(context) {
              var dataset = context.dataset;
              var count = dataset.data.length;
              var value = dataset.data[context.dataIndex];
              return value > count * 1.5;
            },
            font: {
              weight: "bold"
            },
            formatter: Math.round
          }
        }
      }
    });



    Observable.fromEvent(this.searchBar.nativeElement, "keyup")
      .map((e: any) => e.target.value)
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(res => {
        console.log(res);
        if (res !== "") {
          this.api.getCat(res).subscribe(res => {
            this.categorias = JSON.parse(res);
            this.categorias = this.categorias.categorias;
            console.log(this.categorias);
          });
        } else {
          this.api.getCat("-987").subscribe(res => {
            this.categorias = JSON.parse(res);
            this.categorias = this.categorias.categorias;
            console.log(this.categorias);
          });
        }
      });


  }

  addcat(categoria: any) {
    const modal = this.modalctrl.create(GastoPage, categoria);
    modal.present();
  }
}
