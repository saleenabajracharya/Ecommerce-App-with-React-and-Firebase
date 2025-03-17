import {useContext} from "react";
import { myContext } from "../../../context/myContext";
import { Layout } from "../../layout/Layout";
import { CiShoppingBasket } from "react-icons/ci";
import { FaListOl } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ProductDetail } from "./ProductDetail";
import { OrderDetail } from "./OrderDetail";
import { UserDetail } from "./UserDetail";

export const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('users'))
  const context = useContext(myContext);
    const {getAllProduct, getAllOrder, getAllUser} = context;
    return (
        <Layout>
        <div className="container mt-5">
            <div className="text-center mb-2">
                <div className="bg-light p-3 border border-success rounded">
                    <h2 className=" fw-semibold" style={{color:"#67a357"}}>Admin Dashboard</h2>
                </div>
            </div>

            <div className="text-center mb-2">
                <div className="bg-light p-2 rounded border border-success">
                    <div className="d-flex justify-content-center">
                        <img src="/images/user.png" style={{height:"150px"}}alt="Profile" />
                    </div>
 
                    <h2 className="" style={{color:"#67a357"}}>
                        <span className="fw-semibold">Name :</span> {user?.fullName}
                    </h2>
                    <h2 className="" style={{color:"#67a357"}}>
                        <span className="fw-semibold">Email :</span> {user?.email}
                    </h2>
                    <h2 className="" style={{color:"#67a357"}}>
                        <span className="fw-semibold">Date :</span> {user?.date}
                    </h2>
                    <h2 className="" style={{color:"#67a357"}}>
                        <span className="fw-semibold">Role :</span> {user?.role}
                    </h2>
                </div>
            </div>


            {/* <div className="row text-center justify-content-center">
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="border bg-light border-success p-1 rounded cursor-pointer">
                        <div className="" style={{color:"#67a357"}}>
                        <CiShoppingBasket className="my-2" style={{ fontSize: "50px" }} />
                        </div>
                        <h2 className="fw-semibold" style={{color:"#67a357"}}>10</h2>
                        <p className=" fw-semibold" style={{color:"#67a357"}}>Total Products</p>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="border bg-light border-success p-1 rounded cursor-pointer">
                    <div className="" style={{color:"#67a357"}}>
                        <FaListOl className="my-3" style={{ fontSize: "35px" }} />
                        </div>
                        <h2 className=" fw-semibold" style={{color:"#67a357"}}>10</h2>
                        <p className=" fw-semibold" style={{color:"#67a357"}}>Total Orders</p>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="border bg-light border-success p-1 rounded cursor-pointer">
                        <div className="" style={{color:"#67a357"}}>
                            <LuUsers className="my-3"
                            style={{ fontSize: "35px" }}/>
                        </div>
                        <h2 className="fw-semibold" style={{color:"#67a357"}}>10</h2>
                        <p className=" fw-semibold" style={{color:"#67a357"}}>Total Users</p>
                    </div>
                </div>
            </div> */}

<div className="container">
      <Tabs>
        <TabList className="d-flex flex-wrap justify-content-center text-center s" style={{cursor:"pointer"}}>
          {/* Total Products */}
          <Tab className="col-md-4 col-sm-6 col-12 p-2 cursor-pointer ">
            <div className="border bg-light border-success p-3 rounded hover-shadow">
              <div className="text-success d-inline-block">
              <div className="" style={{color:"#67a357"}}>
                        <CiShoppingBasket className="my-2" style={{ fontSize: "50px", fontWeight:"100px" }} />
                        </div>
              </div>
              <h2 className="fw-bold display-6" style={{color:"#67a357"}}>{getAllProduct.length}</h2>
              <p className="fw-bold" style={{color:"#67a357"}}>Total Products</p>
            </div>
          </Tab>

          {/* Total Order */}
          <Tab className="col-md-4 col-sm-6 col-12 p-2 cursor-pointer">
            <div className="border bg-light border-success p-3 rounded hover-shadow">
              <div className="text-success d-inline-block ">
              <div className="" style={{color:"#67a357"}}>
              <FaListOl className="my-3" style={{ fontSize: "35px" }} />
                        </div>
              </div>
              <h2 className="fw-bold display-6" style={{color:"#67a357"}}>{getAllOrder.length}</h2>
              <p className="fw-bold" style={{color:"#67a357"}}>Total Order</p>
            </div>
          </Tab>

          {/* Total Users */}
          <Tab className="col-md-4 col-sm-6 col-12 p-2 cursor-pointer">
            <div className="border bg-light border-success p-3 rounded hover-shadow">
              <div className="text-success d-inline-block">
              <div className="" style={{color:"#67a357"}}>
                            <LuUsers className="my-3"
                            style={{ fontSize: "35px" }}/>
                        </div>
              </div>
              <h2 className="fw-bold display-6"  style={{color:"#67a357"}}>{getAllUser.length}</h2>
              <p className="fw-bold"  style={{color:"#67a357"}}>Total Users</p>
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="p-3">
            <ProductDetail/>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-3">
            <OrderDetail/>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-3"><UserDetail/></div>
        </TabPanel>
      </Tabs>
    </div>
        </div>
        </Layout>
    );
};


