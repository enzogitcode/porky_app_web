import ParicionCard from "./ParicionCard";
import type { Paricion } from "../../types/types";

type ParicionesListProps = {
  pariciones: Paricion[];
  pigId: string;
  onDeleteParicion: (paricionId: string) => void;
};

const ParicionesListByPig = ({
  pariciones,
  pigId,
  onDeleteParicion,
}: ParicionesListProps) => {
  return (
    <div className="flex flex-wrap items-stretch">
      {pariciones.map((paricion) => (
        <ParicionCard
          key={paricion._id}
          {...paricion}
          pigId={pigId}
          onDelete={onDeleteParicion}
        />
      ))}
    </div>
  );
};

export default ParicionesListByPig;
