import { useLoaderData } from "react-router-dom";
import { userReviews } from "../data/data.js";
import { StarRating } from "./Stars";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";
const ReviewsSection = () => {
    const userImgs = useLoaderData();

    return (
        <motion.section  variants={slideUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} className="bg-light-sectionBackground flex flex-col gap-4 py-10 px-5">
            <div>
                <h1 className="text-2xl font-bold mb-2">
                    What Our Users Say About Trexpenser
                </h1>
                <p>
                    Real experiences from people who have taken charge of their
                    finances.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-3">
                {userReviews.map((data, index) => (
                    <div
                        key={data.id}
                        className="bg-light-cardBackground p-3 rounded-md shadow-md
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
                                    border-2 border-light-dividers p-1"
                                />
                            </div>
                            <div>
                                <p className="text-light-text font-bold">
                                    <strong>{data.name}</strong>
                                </p>

                                <StarRating rate={data.rating} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};
export default ReviewsSection;


/*
GET https://picsum.photos/v2/list?page=6&limit=6 200

Response Headers

cache-control: private, no-cache, no-store, must-revalidate
content-type: application/json
link: <https://picsum.photos/v2/list?page=5&limit=6>; rel="prev", <https://picsum.photos/v2/list?page=7&limit=6>; rel="next"

[{"id":"30","author":"Shyamanta Baruah","width":1280,"height":901,"url":"https://unsplash.com/photos/aeVA-j1y2BY","download_url":"https://picsum.photos/id/30/1280/901"},{"id":"31","author":"How-Soon Ngu","width":3264,"height":4912,"url":"https://unsplash.com/photos/7Vz3DtQDT3Q","download_url":"https://picsum.photos/id/31/3264/4912"},{"id":"32","author":"Rodrigo Melo","width":4032,"height":3024,"url":"https://unsplash.com/photos/eG3k60PrTGY","download_url":"https://picsum.photos/id/32/4032/3024"},{"id":"33","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"https://unsplash.com/photos/LBI7cgq3pbM","download_url":"https://picsum.photos/id/33/5000/3333"},{"id":"34","author":"Aleks Dorohovich","width":3872,"height":2592,"url":"https://unsplash.com/photos/zZvsEMPxjIA","download_url":"https://picsum.photos/id/34/3872/2592"},{"id":"35","author":"Shane Colella","width":2758,"height":3622,"url":"https://unsplash.com/photos/znM0ujn2RUA","download_url":"https://picsum.photos/id/35/2758/3622"}]





*/