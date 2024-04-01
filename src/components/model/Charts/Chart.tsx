
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import ChartProps from '../../types/Chart/ChartProps';
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Chart: React.FC<ChartProps> = ({id,background,values,date,flag,heading,subHeading,textHeading,pctChange}) => {

  
  const options = {

    chart: {
      
      width: '100%',
      height: 'auto',

      type: "area",
      fontFamily: "Rubik, sans-serif",

      dropShadow: {
        enabled: true,
      },

      toolbar: {
        show: false,
      },



    },
    
    xaxis: {

      categories: date,
      
      labels: {
        style: {
          fontFamily: "Rubik, sans-serif",
          cssClass: 'text-md font-normal fill-gray-500 flex dark:fill-gray-400',
          fontSize: '16px',
        }
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
      
      
    

    },

    yaxis: {

      show: true,
      tickAmount: 5,

      labels: {
        show: true,
        style: {
          fontFamily: "Rubik, sans-serif",
          cssClass: 'text-xl font-normal fill-gray-500 dark:fill-gray-400',
          fontSize: '16px', 
        },

        formatter: function(value: number) {
          return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }

      },

   

    },

    series: [{
        
        name: "Variation",
        data: values,
        color: "#046C4E",
        
      },],


    tooltip: {
      enabled: true,

      x: {
        show: false,
      },

    },
    
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },

    dataLabels: {
      enabled: false,
    },
    
    stroke: {
      width: 6,
    },

    legend: {
      show: false
    },

    grid: {
      show: false,
    },

    responsive: [{

      breakpoint: 762,
      options: {

        chart: {
          height: '300px',
        },

        yaxis: {

          labels : {

              style: {
                fontSize: '13px', 
              },

            }

          },

          xaxis: {

            labels : {

                style: {
                  fontSize: '8px', 
                },

              }

            }
        },



    }],
    


  };

  const renderChart = () => {

    if (!document.getElementById(id) || typeof ApexCharts === 'undefined') {
      return; 
    }

    const chart = new ApexCharts(document.getElementById(id), options);
    chart.render();

    };

    useEffect(() => {

      renderChart();

    },[values])
    
      return (

     
        <div className={`w-full mx-2 flex-1 ${background} h-full md:h-auto
         rounded-lg shadow-md dark:bg-gray-800`}>


        <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">

        <div>

            <h2 className='flex gap-2 items-center'><img src={flag} className='w-5' 
            alt='country flag'
            />{heading}</h2>

            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                
            {subHeading.substring(0, 5)}

             <span className='text-gray-400'>{subHeading.substring(5)}</span>
                
                </h5>

            <p className="text-base font-normal text-gray-500 text-gray-400">{textHeading}</p>
        </div>

        <div

            className=
            {`flex items-center gap-2 px-2.5 py-0.5 text-3xl font-semibold
            ${parseFloat(pctChange) < 0 ? 'text-red-500' : 'text-green-500'} text-center`}>

            {pctChange}%
            {parseFloat(pctChange) < 0 ? <FontAwesomeIcon 
            icon={faDownLong} /> :
             <FontAwesomeIcon icon={faUpLong} />}

        </div>
        
    </div>
  
    <div id={id} className="h-auto px-0.5 md:px-2.5 py-4"></div>
    
  </div>

    );
}

export default Chart;