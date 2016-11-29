import React from 'react';
var echarts = require('echarts');
import * as SalesService from '../services/SalesService';

const option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'Sales',
            type:'bar',
            barWidth: '60%',
            data:[]
        }
    ]
};

export default React.createClass({

    getData(productId){
        if(productId){
            var myChart = echarts.init(document.getElementById('charts'));
            SalesService.findSales(productId).then(data => {
                let xAxis = [];
                let yAxis = [];
                for(var i = 0; i < data.length; i++){
                    xAxis.push(data[i].create_date);
                    yAxis.push(data[i].count);
                }
                option.xAxis[0].data = xAxis;
                option.series[0].data = yAxis;
                myChart.setOption(option);
                // this.setState({data});
            })
        }
    },

    getInitialState() {
        return {option: []};
    },

    componentWillReceiveProps(nextProps) {
        this.getData(nextProps.product.id);
    },

    componentDidMount(){
        // draw
    },

    render() {
        return (
            <div className="charts" id="charts">

            </div>
        );
    }

});
