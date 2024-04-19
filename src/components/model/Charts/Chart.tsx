
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GAP_DEFAULT, ROUNDED_DEFAULT, TEXT_GREEN_500, TEXT_RED_600 } from '../../../contants/classnames/classnames';

export interface ChartProps {

  id: string;
  values: number[];
  date: string[];
  flag: string;
  heading: string
  subHeading: string
  textHeading: string;
  pctChange: string

}

const Chart: React.FC<ChartProps> = ({id,values,date,flag,heading,subHeading,textHeading,pctChange}) => {

  
  const options = {

    chart: {
      
      height: '350px',

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

          yaxis: {
            tickAmount: 5,
            labels: {
              style: {
                fontSize: '8px',
              },
              formatter: function (value:number) {
                return value.toFixed(2); 
              },
            },
          },
          xaxis: {
            labels : {
              style: {
                fontSize: '8px', 
              },
            },
          },
        },
      },
      {
  
        breakpoint: 1300, 
        options: {

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
      {
  
        breakpoint: 1100, 
        options: {

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

     
        <div className={`${ROUNDED_DEFAULT} flex-1 shadow-md`}>


          <div className="p-3">

            <div>

              <div>
                <h2 className={`flex ${GAP_DEFAULT} items-center`}>
                  <img src={flag} className='w-5' alt='country flag'/>
                  {heading}
                </h2>
              </div>

              <div className={`flex justify-between w-full`}>

                <div >
                    <h5 className="leading-none text-xl md:text-2xl font-bold text-gray-900 dark:text-white pb-2">
                        
                    {subHeading.substring(0, 5)}

                    <span className='text-gray-400'>{subHeading.substring(5)}</span>
                        
                    </h5>

                    <p className="text-base font-normal text-gray-500 text-gray-400">{textHeading}</p>

                </div>

                <div className={`text-lg md:text-xl font-semibold

                ${parseFloat(pctChange) < 0 ? TEXT_RED_600 : TEXT_GREEN_500} text-center`}>

                <div className={`flex gap-default items-center`}>
                  {pctChange}%
                  {parseFloat(pctChange) < 0 ? <FontAwesomeIcon 
                  icon={faDownLong} /> :
                  <FontAwesomeIcon icon={faUpLong} />}
                </div>

                </div>
              </div>

           

          </div>


        
      </div>
    

      <div id={id} className="px-0.5 md:px-2.5 py-4"></div>  


    
  </div>

    );
}

export default Chart;