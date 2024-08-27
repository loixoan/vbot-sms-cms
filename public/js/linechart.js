$.ajax({
    url: 'dispositionchart',
    success: function (result) {
        let labelY = result.times
        let label = result.datasets.map((x) => x.label)
        let data = result.datasets.map((x) => x.data)
        let color = ['#1cab4e', '#387CFF', '#F9F400', '#e63343']
//        console.log(result)
//        console.log(labelY)
//        console.log(label)
//        console.log(data)
//        console.log(color)
        var objChartLine = new objectChartLineCustom(labelY, label, data, color);
        objChartLine.lineChart('#dispositionlinechart');
    }
});

$.ajax({
    url: 'typecallchart',
    success: function (result) {
        let labelY = result.times
        let label = result.datasets.map((x) => x.label)
        let data = result.datasets.map((x) => x.data)
        let color = ['#1cab4e', '#387CFF', '#F9F400', '#e63343']
        var objChartLine = new objectChartLineCustom(labelY, label, data, color);
        objChartLine.lineChart('#typecalllinechart');
    }
});

//Draw line
function objectChartLineCustom(lablesY, lables, datas, colors) {
    this.lablesY = lablesY;
    this.datas = datas;
    this.colors = colors;
    this.lables = lables;
    this.dataSet = function () {
        var arrDatas = [];
        for (let i = 0; i < this.datas.length; ++i) {
            arrDatas.push({
                label: this.lables[i],
                data: this.datas[i],
                borderColor: this.colors[i],
                backgroundColor: this.colors[i],
                fill: false,
            })
        }
        return arrDatas;
    }
    this.dataLine = function () {
        return {
            labels: this.lablesY,
            datasets: this.dataSet()
        };
    }
    this.configLine = function () {
        return {
            type: 'line',
            data: this.dataLine(),
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                borderWidth: 2,
                pointBackgroundColor: '#fff0',
                pointBorderColor: '#fff0',
                pointBorderWidth: 1,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    },
                }
            },
        }
    }
    this.lineChart = function (selectorElement) {
        const myChartLine = new Chart(
                document.querySelector(selectorElement).getContext('2d'),
                this.configLine()
                );
    }
}