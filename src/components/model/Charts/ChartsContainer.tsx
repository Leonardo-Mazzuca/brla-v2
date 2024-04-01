
import Chart from './Chart';
import { ChartData } from '../../types/Chart/ChartData';

type Data = {

  data: ChartData[];

}

const ChartsContainer = ({data}: Data) => {
  

  return (

    <section className='flex justify-between w-full items-center gap-5 flex-wrap pb-10 mt-14'>

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

        <div>Carregando</div>

      )}


    </section>

  );

};

export default ChartsContainer;
