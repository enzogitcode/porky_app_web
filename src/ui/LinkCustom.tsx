import type React from "react"
import { Children } from "react"
import { Link } from "react-router-dom"

interface Link {
    to:string
    className?:string
}

const LinkCustom:React.FC = ({children, className, to}) => {
  return (
    <Link to={to} className={className ?? ""}>
    {children}
    </Link>
  )
}

export default LinkCustom