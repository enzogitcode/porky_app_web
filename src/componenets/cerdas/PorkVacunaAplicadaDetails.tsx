import { useGetVacunaByIdQuery } from '../../redux/features/vacunaSlice'

type PorkVacunaAplicadaDetailsProps = {
    vacunaId: string
}


const PorkVacunaAplicadaDetails = ({vacunaId}:PorkVacunaAplicadaDetailsProps) => {

    const {data, isLoading, isSuccess, isError} = useGetVacunaByIdQuery(vacunaId,{skip:!vacunaId} )

    console.log(data)

    if (isError) {
        return <div><strong className='text-2xl'>Error al cargar los detalles de la vacuna, o la vacuna ya no existe!</strong></div>
    }
    if (isLoading) {
        return <div>Cargando detalles de la vacuna...</div>
    }
  return (
    <div>
        {isSuccess && data && (
            <div>
                <h4>Detalles de la Vacuna</h4>
                <p>Nombre de la Vacuna: {data?.nombre}</p>
                <p>Laboratorio: {data?.laboratorio}</p>
                <p>Proveedor: {data?.proveedor}</p>
                <p>Descripción: {data?.descripcion}</p>
                <p>Dosis: {data?.dosis}</p>
            </div>
        )}
        
    </div>
  )
}

export default PorkVacunaAplicadaDetails