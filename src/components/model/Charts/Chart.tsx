
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import ChartProps from '../../types/Chart/ChartProps';
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FLEX, GAP_DEFAULT, ITEMS_CENTER, JUSTIFY_BETWEEN, ROUNDED_DEFAULT, TEXT_CENTER, TEXT_GREEN_500, TEXT_RED_600 } from '../../contants/classnames/classnames';



const Chart: React.FC<ChartProps> = ({id,values,date,flag,heading,subHeading,textHeading,pctChange}) => {

  
  const options = {

    chart: {
      
      width: '500px',
      height: '300px',

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
          return value.toFixed(2);
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

    responsive: [

      {
        breakpoint: 302,
        options: {
          chart: {
            height: '300px',
            width: '100%',
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                fontSize: '12px',
              },
              formatter: function (value:number) {
                return value.toFixed(2); 
              },
            },
          },
          xaxis: {
            labels : {
              style: {
                fontSize: '12px', 
              },
            },
          },
        },
      },

      {
        breakpoint: 762,
        options: {
          chart: {
            height: '300px',
            width: '100%',
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                fontSize: '12px',
              },
              formatter: function (value:number) {
                return value.toFixed(2); 
              },
            },
          },
          xaxis: {
            labels : {
              style: {
                fontSize: '12px', 
              },
            },
          },
        },
      },
      {
  
        breakpoint: 1200, 
        options: {

          chart: {
            height: '300px',
            width: '100%',
          },

          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                fontSize: '16px',
              },
              formatter: function (value:number) {
                return value.toFixed(2); 
              },
            },
          },
          xaxis: {
            labels : {
              style: {
                fontSize: '16px', 
              },
            },
          },
        },
      },
    ],
    


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

     
        <div className={`${ROUNDED_DEFAULT} w-auto shadow-md`}>


          <div className="w-full p-3">

            <div>

              <div>
                <h2 className={`${FLEX} ${GAP_DEFAULT} ${ITEMS_CENTER}`}>
                  <img src={flag} className='w-5' alt='country flag'/>
                  {heading}
                </h2>
              </div>

              <div className={`${FLEX} ${JUSTIFY_BETWEEN} w-full`}>

                <div >
                    <h5 className="leading-none text-xl md:text-2xl font-bold text-gray-900 dark:text-white pb-2">
                        
                    {subHeading.substring(0, 5)}

                    <span className='text-gray-400'>{subHeading.substring(5)}</span>
                        
                    </h5>

                    <p className="text-base font-normal text-gray-500 text-gray-400">{textHeading}</p>

                </div>

                <div className={`text-lg md:text-xl font-semibold

                ${parseFloat(pctChange) < 0 ? TEXT_RED_600 : TEXT_GREEN_500} ${TEXT_CENTER}`}>

                <div className={`${FLEX} ${GAP_DEFAULT} ${ITEMS_CENTER}`}>
                  {pctChange}%
                  {parseFloat(pctChange) < 0 ? <FontAwesomeIcon 
                  icon={faDownLong} /> :
                  <FontAwesomeIcon icon={faUpLong} />}
                </div>

                </div>
              </div>

           

          </div>


        
      </div>
    
      <div>

        <div id={id} className="px-0.5 md:px-2.5 py-4"></div>  

      </div>

    
  </div>

    );
}

export default Chart;