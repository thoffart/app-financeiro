import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
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
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxWidth: 50,
            fontColor: "black"
          }
        }
      }
    });
  }
}
