
import Chart from './Chart';
import { ChartData } from '../../types/Chart/ChartData';
import Loading from '../Loading/Loading';
import { FLEX, LG_JUSTIFY_BETWEEN } from '../../contants/classnames/classnames';

type Data = {

  data: ChartData[];

}

const ChartsContainer = ({data}: Data) => {
  

  return (

    <section className={`${FLEX}
     ${LG_JUSTIFY_BETWEEN} flex-col md:flex-row w-full gap-5 pb-10`}>

      {data ? (
        
              data.map((item,index)=> {

                return (
                  <Chart 
                  key={index}
                  {...item}
                  />
                )
        
              })

      ) : (

        <Loading text='Carregando...' />

      )}


    </section>

  );

};

export default ChartsContainer;