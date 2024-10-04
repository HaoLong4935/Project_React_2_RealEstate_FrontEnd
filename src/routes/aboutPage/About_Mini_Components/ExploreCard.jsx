import React from 'react'
import styles from '../AboutUs_Style/style'
import { motion } from "framer-motion"
import { fadeIn } from '../../../utils/motion'

function ExploreCard({ id, imgUrl, title, index, active, handleClick }) {
    console.log({ id, imgUrl, title, index, active, handleClick })
    return (
        <motion.div
            variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
            initial="hidden"
            whileInView="show"
            className={`flex flex-col items-center tall-heigh-card justify-center cursor-pointer border-none w-full p-0 rounded-lg overflow-hidden`}
            onClick={() => handleClick(id)}
        >
            <img
                src={imgUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg mb-2"
            />
            <h3 className="text-md font-playfair">{title}</h3>
        </motion.div>
    )
}

export default ExploreCard