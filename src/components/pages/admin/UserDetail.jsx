import React from 'react'

export const UserDetail = () => {
  return (
    <div>
                <div>
                    <div className="py-3 d-flex justify-content-between align-items-center">
                        {/* text */}
                        <h1 className="fs-4  fw-bold"  style={{color:"#67a357"}}>All Users</h1>
                    </div>
    
                    {/* table */}
                    <div className="w-100 overflow-auto">
                        <table className="table table-bordered table-hover ">
                            <tbody>
                                <tr>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">S.No.</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Location Name</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Action</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Action</th>
                                </tr>
                                <tr className="text-danger">
                                    <td className="py-3 px-4 border text-secondary">1.</td>
                                    <td className="py-3 px-4 border text-secondary text-capitalize">name</td>
                                    <td className="py-3 px-4 border text-success " style={{cursor:"pointer"}}>Edit</td>
                                    <td className="py-3 px-4 border text-danger " style={{cursor:"pointer"}}>Delete</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

    </div>
  )
}
