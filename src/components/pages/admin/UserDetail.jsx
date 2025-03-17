import { useContext } from "react"
import { myContext } from "../../../context/myContext"

export const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;
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
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Name</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Email</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Uid</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Date</th>
                                    <th scope="col" className="py-3 px-4 border bg-light fw-bold">Role</th>
                                </tr>
                                {
                                getAllUser.map((value, index) => {
                                    return (
                                <tr key={index} className="text-danger">
                                    <td className="py-3 px-4 border text-secondary">{index+1}</td>
                                    <td className="py-3 px-4 border text-secondary text-capitalize">{value.fullName}</td>
                                    <td className="py-3 px-4 border text-success " >{value.email}</td>
                                    <td className="py-3 px-4 border text-danger " >{value.uid}</td>
                                    <td className="py-3 px-4 border text-secondary text-capitalize">{value.role}</td>
                                    <td className="py-3 px-4 border text-secondary text-capitalize">{value.date}</td>

                                </tr>
                                 )
                                })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>

    </div>
  )
}
