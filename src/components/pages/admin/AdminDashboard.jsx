import React from "react";
import { Layout } from "../../layout/Layout";
import { CiShoppingBasket } from "react-icons/ci";
import { FaListOl } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";

export const AdminDashboard = () => {
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
                        <span className="fw-semibold">Name :</span> Salina Bajracharya
                    </h2>
                    <h2 className="" style={{color:"#67a357"}}>
                        <span className="fw-semibold">Email :</span> salina@gmail.com
                    </h2>
                </div>
            </div>

            <div className="row text-center justify-content-center">
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
            </div>
        </div>
        </Layout>
    );
};


