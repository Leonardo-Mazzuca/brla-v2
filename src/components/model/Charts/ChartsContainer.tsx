
import Chart from './Chart';
import { ChartData } from '../../types/Chart/ChartData';
import Loading from '../Loading/Loading';

type Data = {

  data: ChartData[];

}

const ChartsContainer = ({data}: Data) => {
  

  return (

    <section className='flex min-h-screen
     md:justify-between flex-col md:flex-row w-full items-center gap-5 pb-10'>

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
