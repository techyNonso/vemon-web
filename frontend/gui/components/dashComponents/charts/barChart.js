import React from 'react'
import {Bar} from 'react-chartjs-2'


function BarChart(props){
    
    let  info;
    
    if(Object.keys(props.data).length > 0 && props.data.constructor === Object){
       info = props.data

    }else{
        info = {
            Jan:0,
            Feb:0,
            Mar: 0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0
          
          }
    }
    
    const data = {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        datasets: [
            {
               label: 'All Sales Per Month',
               data: [info.Jan,info.Feb,info.Mar,info.Apr,info.May,info.Jun,info.Jul,info.Aug,info.Sep,info.Oct,info.Nov,info.Dec],
               borderColor:['#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853'],
               backgroundColor:['#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853','#00c853'],
               
             },
            
       ]
    }

    const options = {
        title: {
            display: true,
            text: 'Revenue Generated'
        },
        maintainAspectRatio: false
        
    }

   
    return (
        <Bar data={data} options={options} width={100}   />
    )
}

export default BarChart