
import Chart from './Chart';
import { ChartData } from '../../types/Chart/ChartData';
import Loading from '../Loading/Loading';
import { FLEX, ITEMS_CENTER, JUSTIFY_CENTER, LG_JUSTIFY_BETWEEN, WIDTH_FULL } from '../../contants/classnames/classnames';

type Data = {

  data: ChartData[];

}

const ChartsContainer = ({data}: Data) => {
  

  return (

    <section className={`${FLEX} ${JUSTIFY_CENTER}
     ${LG_JUSTIFY_BETWEEN} flex-col xl:flex-row ${WIDTH_FULL} ${ITEMS_CENTER} gap-5 pb-10`}>

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