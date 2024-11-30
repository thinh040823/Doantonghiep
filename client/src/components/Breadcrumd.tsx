import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumd({title}) {
  return (
   <div className="container py-4">
     <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{title}</li>
        </ol>
    </nav>
   </div>
  )
}
