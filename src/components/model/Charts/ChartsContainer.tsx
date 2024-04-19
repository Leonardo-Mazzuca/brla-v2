
import Chart from './Chart';
import Loading from '../Loading/Loading';

export type ChartData = {

  id: string,
  flag: string,
  values: number[],
  date: string[],
  pctChange: string,
  heading: string,
  subHeading: string,
  textHeading: string,

}

type Data = {

  data: ChartData[];

}

const ChartsContainer = ({data}: Data) => {
  

  return (

    <section className={`flex
     lg:justify-between flex-col md:flex-row w-full gap-5 pb-10`}>

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