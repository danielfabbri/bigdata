document.addEventListener('DOMContentLoaded', function () {
    fetch('motivos_atrasos.json')
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                if (data[i]['name']==null) {
                    data[i]['name']='Blank';
                }
            }
            grafico1(data);
        })
        .catch(error => console.error('Error loading JSON:', error));  
    fetch('dados_atrasos.json')
        .then(response => response.json())
        .then(data => {
            grafico2(data);
        })
        .catch(error => console.error('Error loading JSON:', error)); 
    fetch('aeronaves_atrasos.json')
        .then(response => response.json())
        .then(data => {
            grafico3(data);
        })
        .catch(error => console.error('Error loading JSON:', error));  
    fetch('cancelamentos_atrasos.json')
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                if (data[i]['name']==true) {
                    data[i]['name']='Cancelados';
                } else {
                    data[i]['name']='Não cancelados';
                }
            }
            grafico4(data);
        })
        .catch(error => console.error('Error loading JSON:', error));  
});
function grafico1(dados) {
    Highcharts.chart('container1', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Maiores causas de atrasos',
            align: 'left'
        },
    
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
    
        plotOptions: {
            series: {
                borderRadius: 5,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: '-30%',
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 5
                    },
                    format: '',
                    style: {
                        fontSize: '0.9em',
                        textOutline: 'none'
                    }
                }]
            }
        },
    
        tooltip: {
            pointFormat: '<b>{point.y:.0f}</b><br/>'
        },
    
        series: [
            {
                colorByPoint: true,
                data: dados
            }
        ]
    });
}   
function grafico2(dados) {
    Highcharts.chart('container2', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Origens que mais atrasam',
            align: 'left'
        },    
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
    
        plotOptions: {
            series: {
                borderRadius: 5,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: '-30%',
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 5
                    },
                    format: '',
                    style: {
                        fontSize: '0.9em',
                        textOutline: 'none'
                    }
                }]
            }
        },
        tooltip: {
            pointFormat: '<b>{point.y:.0f}</b><br/>'
        },
    
        series: [
            {
                name: 'Browsers',
                colorByPoint: true,
                data: dados
            }
        ]
    });
}
function grafico3(dados) {
    Highcharts.chart('container3', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Aeronaves que mais atrasam',
            align: 'left'
        },    
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
    
        plotOptions: {
            series: {
                borderRadius: 5,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: '-30%',
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 5
                    },
                    format: '',
                    style: {
                        fontSize: '0.9em',
                        textOutline: 'none'
                    }
                }]
            }
        },
        tooltip: {
            pointFormat: '<b>{point.y:.0f}</b><br/>'
        },
    
        series: [
            {
                name: 'Browsers',
                colorByPoint: true,
                data: dados
            }
        ]
    });
}
function grafico4(dados) {
    Highcharts.chart('container4', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Cancelamento de voos',
            align: 'left'
        },    
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
    
        plotOptions: {
            series: {
                borderRadius: 5,
                dataLabels: [{
                    enabled: true,
                    distance: 15,
                    format: '{point.name}'
                }, {
                    enabled: true,
                    distance: '-30%',
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 5
                    },
                    format: '',
                    style: {
                        fontSize: '0.9em',
                        textOutline: 'none'
                    }
                }]
            }
        },
        tooltip: {
            pointFormat: '<b>{point.y:.0f}</b><br/>'
        },
    
        series: [
            {
                name: 'Browsers',
                colorByPoint: true,
                data: dados
            }
        ]
    });
}
