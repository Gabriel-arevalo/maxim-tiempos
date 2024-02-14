import { GrWorkshop } from "react-icons/gr";
import { FaOilWell } from "react-icons/fa6";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { GiSoccerBall } from "react-icons/gi";


export const activities = [
  {
    name: 'Base',
    value: 'BA',
    icon: <GrWorkshop />
  },
  {
    name: 'Licencia',
    value: 'LI',
    icon: <FaBriefcaseMedical />
  },
  {
    name: 'Descanso',
    value: 'DE',
    icon: <FaBed />
  },
  {
    name: 'Pozo',
    value: 'pozo',
    icon: <FaOilWell />
  },
  {
    name: 'Festivo',
    value:'FE',
    icon: <GiSoccerBall />
  }
]

export const operadoras = [
  {
    name: 'Gran Tierra',
    value: 'GT'
  },
  {
    name: 'Ecopetrol',
    value: 'EC'
  },
  {
    name: 'Parex',
    value: 'PA'
  },
  {
    name: 'Otros...',
    value: 'OT'
  }

]

export const positions =[
  {
    name: 'Ingeniero',
    value: 'Ingeniero',
  },
  {
    name: 'Operador',
    value: 'Operador'
  },
  {
    name: 'Técnico',
    value: 'Técnico'
  }
]

