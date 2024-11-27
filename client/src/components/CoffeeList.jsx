import React, { useEffect, useState } from "react";
import axios from "axios";
import CoffeeCard from "./CoffeeCard";

const CoffeeList = () => {
    const URI = import.meta.env.VITE_API_URL;
    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URI}/coffee`, {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setCoffees(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching coffee data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-amber-50 mt-14">
            {coffees.map((coffee) => (
                <CoffeeCard
                    key={coffee._id}
                    id={coffee._id}
                    title={coffee.title}
                    image={coffee.image}
                    price={coffee.price}
                    description={coffee.description}
                />
            ))}
        </div>
    );
};

export default CoffeeList;
