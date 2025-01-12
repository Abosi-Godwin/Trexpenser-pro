import { useEffect, useState } from "react";

import { userReviews } from "../data/data.js";
import { StarRating } from "./Stars.jsx";

const URL = "https://picsum.photos/v2/list?page=6&limit=6";

const ReviewsSection = () => {
    const [userImgs, setUserImgs] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(URL);
            const imgs = await res.json();
            setUserImgs(imgs.map(img => img.download_url).slice(0, 6));
        };
        fetchData();
    }, []);
    return (
        <section className="bg-color-1 flex flex-col gap-4 py-10 px-5">
            <div>
                <h1 className="text-2xl font-bold mb-2">
                    What Our Users Say About Trexpenser
                </h1>
                <p>
                    Real experiences from people who have taken charge of their
                    finances.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 py-5">
                {userReviews.map((data, index) => (
                    <div
                        key={data.id}
                        className="bg-color-2 p-3 rounded-md shadow-md
                    shadow-color-2"
                    >
                        <div className="flex flex-col gap-2 py-3">
                            <p className="text-coloxr-1"> {data.review}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white">
                                <img
                                    src={userImgs[index]}
                                    alt={index}
                                    className="w-full h-full rounded-full
                                    border-2 border-color-8 p-1"
                                />
                            </div>
                            <div>
                                <p className="text-color-8 font-bold">
                                    <strong>{data.name}</strong>
                                </p>

                                <StarRating rate={data.rating} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default ReviewsSection;
