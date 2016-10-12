import Chart from 'chartjs';
import { bindable, children, inlineView } from 'aurelia-framework';

export function chartElement(api) {
  return function (target) {
    bindable('labels')(target);
    children({ selector: 'chart-data', name: 'datasets' })(target);
    inlineView(`
    <template>
      <div  style="width: 200px;">
        <canvas ref="canvas" width="150" height="150"></canvas>
      </div>
      <div ref="legend" style="font-size:small;"></div>
      <slot></slot>
    </template>
    `)(target);

    target.prototype.bind = function () {
      this.context = this.canvas.getContext('2d');
    };

    target.prototype.attached = function () {
      this.render();
    };

    target.prototype.render = function () {
      if (this.chart) {
        this.chart.destroy();
      }

      if (api === 'Doughnut') {
        let data = this.datasets[0].data;
        this.chart = new Chart(this.context).Doughnut(data, {
          animateScale: true,
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\" style=\"list-style: none;\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>;width: 1em;height: 1em;display: inline-block; margin-right: 5px;\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        });
        var legend = this.chart.generateLegend();
        this.legend.innerHTML = legend;
      } else {
        let data = {
          labels: this.labels,
          datasets: this.datasets
        };
        this.chart = new Chart(this.context)[api](data);
      }

    };

    target.prototype.detached = function () {
      if (this.chart) {
        this.chart.destroy();
      }
    };
  }
}
