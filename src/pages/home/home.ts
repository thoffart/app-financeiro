import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";
import "chartjs-plugin-datalabels";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switch";
import { from } from "rxjs/observable/from";
import { map } from "rxjs/operators";
import { mapTo } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  categorias = [
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
  ];
  @ViewChild("doughnutCanvas") doughnutCanvas;
  doughnutChart: any;
  //search = ElementRef("search");
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    /* Observable.fromEvent(this.search.nativeElement, "keyup")
      .map((e: any) => e.target.value)
      .filter((text: string) => this.expect(text))
      .switch()
      .subscribe((text: string) => {
        //this.data = this.calcnotas(text)
      }); */
  }

  ionViewDidLoad() {
    /* this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Gastos", "Receita"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      },
      options: {
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
 */
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Gastos", "Receita"],
        datasets: [
          {
            label: "# of Votes",
            data: [3569, 2290],
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
  }
}
