import React from 'react'
import { useSelector } from 'react-redux'
import Breadcrumd from '../components/Breadcrumd'
import Helmetz from '../components/Helmetz'

export default function Account() {
    const userState = useSelector(state=>state.auth.user)
    return (
        <>
            <Breadcrumd title="Tài khoản của bạn"/>
            <Helmetz title='Tài khoản của bạn'/>
            <div className='container pb-5 pt-[155px]'>
                <h3 className='title_pr'>TÀI KHOẢN CỦA BẠN</h3>
                <div className="py-3">
                    <p><strong>Tên : </strong>{userState?.name}</p>
                    <p><strong>Email : </strong>{userState?.email}</p>
                </div>
            </div>
        </>
    )
}
