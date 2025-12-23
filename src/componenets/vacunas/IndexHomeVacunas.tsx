import React from 'react'
import Container from '../../ui/Container'
import ButtonCustom from '../../ui/ButtonCustom'

const IndexHomeVacunas = () => {
  return (
    <Container className='self-center-safe flex flex-col justify-center items-center gap-5'>
        <ButtonCustom className='updateButton'>Ver listado de vacunas</ButtonCustom>
        <ButtonCustom className='updateButton' to='/vacunas/register'>Agregar una vacuna</ButtonCustom>
    </Container>
  )
}

export default IndexHomeVacunas