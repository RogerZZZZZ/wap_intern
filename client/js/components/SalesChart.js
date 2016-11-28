import React from 'react';
var echarts = require('echarts');
import * as SalesService from '../services/SalesService';

const option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
};

export default React.createClass({

    getOption(){
        return option;
    },

    getData(){
        SalesService.findSales(this.props.productId).then(data => {
            console.log(data);
            this.setState({data});
        })
    },

    getInitialState() {
        return {data: []};
    },

    componentDidMount(){
        var myChart = echarts.init(document.getElementById('charts'));
        // 绘制图表
        myChart.setOption(option);
        console.log(this.props.productId);
        this.getData();
    },

    render() {
        return (
            <div className="charts" id="charts">

            </div>
        );
    }

});
