import { useState } from "react";


export const BuyNowModal = ({addressInfo, setAddressInfo, buyNowFunction}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            {/* Buy Now Button */}
            <button
                type="button"
                onClick={handleOpen}
                className="btn"
                style={{ backgroundColor: '#67a357', color: 'White' }}
            >
                Buy Now
            </button>

            {/* Modal */}
            {open && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content bg-light">
                            <div className="modal-header">
                                <h5 className="modal-title">Buy Now</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleOpen}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={addressInfo.name}
                                        onChange={(e) => {
                                            setAddressInfo({
                                                ...addressInfo,
                                                name: e.target.value
                                            })
                                        }}
                                        placeholder="Enter your name"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="address"
                                        value={addressInfo.address}
                                        onChange={(e) => {
                                            setAddressInfo({
                                                ...addressInfo,
                                                address: e.target.value
                                            })
                                        }}
                                        placeholder="Enter your address"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="number"
                                        name="pincode"
                                        value={addressInfo.pincode}
                                        onChange={(e) => {
                                            setAddressInfo({
                                                ...addressInfo,
                                                pincode: e.target.value
                                            })
                                        }}
                                        placeholder="Enter your pincode"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={addressInfo.mobileNumber}
                                        onChange={(e) => {
                                            setAddressInfo({
                                                ...addressInfo,
                                                mobileNumber: e.target.value
                                            })
                                        }}
                                        placeholder="Enter your mobile number"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn  w-100" style={{ backgroundColor: '#67a357', color: 'White' }} 
                                onClick={() => {
                                    handleOpen();
                                    buyNowFunction();
                                }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


