import PorkCard from '../ui/PorkCard';
import type { Hembras } from '../types/types';

type PorkListProps = {
  data?:Hembras[]

  
}

const PorkList:React.FC<PorkListProps> = ({data}) => {

  return (
        <div>
        {data && data.map( (item) => (<PorkCard key={item.nro} {...item}/>) )}
      </div>
  )
}

export default PorkList