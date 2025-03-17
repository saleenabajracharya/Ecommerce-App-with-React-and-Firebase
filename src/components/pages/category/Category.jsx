import { useNavigate } from "react-router-dom";

const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
        name: 'Fashion'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
        name: 'Shirt'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
        name: 'Jacket'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'Mobile'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
        name: 'Laptop'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'Shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
        name: 'Home'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
        name: 'Books'
    }
]
export const Category = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="d-flex flex-column mt-3">
                <div className="d-flex overflow-auto justify-content-lg-center hide-scroll-bar">
                    <div className="d-flex">
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-2 px-lg-4">
                                    <div 
                                        onClick={() => navigate(`/category/${item.name}`)} 
                                        className="d-flex justify-content-center align-items-center rounded-circle bg-danger transition cursor-pointer mb-1"
                                        style={{ width: "64px", height: "64px", maxWidth: "96px", backgroundColor: "#e91e63" }} 
                                    >
                                        <div className="d-flex justify-content-center mb-3">
                                            <img src={item.image} alt="img" className="img-fluid" />
                                        </div>
                                    </div>
                                    <h1 className="text-center fw-medium fs-6 fs-lg-5">{item.name}</h1>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .hide-scroll-bar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </div>
    );
}


