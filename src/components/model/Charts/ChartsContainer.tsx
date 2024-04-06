
import Chart from './Chart';
import { ChartData } from '../../types/Chart/ChartData';
import Loading from '../Loading/Loading';
import { FLEX, FLEX_COL, FLEX_ROW, ITEMS_CENTER, JUSTIFY_BETWEEN, WIDTH_FULL } from '../../contants/classnames/classnames';

type Data = {

  data: ChartData[];

}

const ChartsContainer = ({data}: Data) => {
  

  return (

    <section className={`${FLEX}
     md:${JUSTIFY_BETWEEN} ${FLEX_COL} md:${FLEX_ROW} ${WIDTH_FULL} ${ITEMS_CENTER} gap-5 pb-10`}>

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
