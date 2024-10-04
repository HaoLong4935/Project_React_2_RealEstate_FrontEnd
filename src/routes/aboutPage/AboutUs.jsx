import React, { useState } from 'react';
import '../aboutPage/aboutUs.css';
import styles from './AboutUs_Style/style';
import { motion } from 'framer-motion'
import { slideIn, staggerContainer, fadeIn, textVariant, planetVariants, footerVariants } from '../../../utils/motion'
import { TypingText, TitleText } from './About_Mini_Components/CustomText'
import { exploreWorlds } from './About_Constant_Data/About_Data.js'
import ExploreCard from './About_Mini_Components/ExploreCard'
import StartSteps from './About_Mini_Components/StartSteps'
import { startingFeatures } from './About_Constant_Data/About_Data'
import planetLogo from './About_Constant_Data/travel.png'
import mapLogo from './About_Constant_Data/map.png'
import { useNavigate } from 'react-router-dom';
import startLogo from './About_Constant_Data/power-on.png'
const AboutUs = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState('world-2')
    return (
        <>
            <section className={`${styles.yPaddings} max-w-7xl mx-auto `}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={`${styles.innerWidth} mx-auto flex flex-col`}>

                    {/* Container Content */}
                    <div className='flex justify-center items-center z-10 space-x-2 font-playfair text-xl'>
                        <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
                            Real
                        </motion.h1>
                        <motion.h1 variants={textVariant(1.2)} className={styles.heroHeading}>
                            Esate
                        </motion.h1>
                    </div>

                    {/* Animation Picture */}
                    <motion.div
                        variants={slideIn('right', 'tween', 0.2, 1)}
                        className="w-full md:-mt-[30px] -mt-[12px]  ">
                        <div className=' w-full z-[0] sm:-top-[10px] md:-top-[4px] mt-4 md:mt-5 sm:px-3'>
                            <img
                                src='https://s19538.pcdn.co/wp-content/uploads/2021/07/road-trip.jpg'
                                alt='About us Pic'
                                className='image-top-left-round image-bottom-right-round  w-full sm:h-[500px] h-[350px] rounded-3xl object-cover  z-10 relative'
                            >
                            </img>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            <section className={`max-w-7xl mx-auto py-0`}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
                >
                    <TypingText title="| About our website" textStyles="text-center" className="text-black" />

                    <motion.p variants={fadeIn('up', 'tween', 0.2, 1)} className="mt-[8px] font-normal sm:text-[20px]  md:text-[20px] text-[12px] text-center text-black px-20">
                        <span className="font-normal  text-[#7a7a7a] ">
                            Estate is a popular travel platform that helps travelers plan their trips.
                            It provides reviews, ratings, and recommendations for hotels, restaurants, and attractions.
                            Travelers rely on our web to make informed decisions for their journeys, ensuring memorable and enjoyable experiences.
                        </span>{' '}
                    </motion.p>
                </motion.div>
            </section >

            <section className={`max-w-7xl mx-auto pt-20 py-20 h-[800px]`}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
                >
                    <TypingText title="| The Magic of our Estate Website" textStyles="text-center" />
                    <TitleText title={<>Travel anywhere you desire <br className='md:block hidden'></br> and explore</>} textStyles="text-center" />

                    <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] w-full sm:px-7 md:px-5 lg:px-3 gap-5 py-8'>
                        {
                            exploreWorlds.map((item, index) => {
                                return ( // Thêm return ở đây
                                    <ExploreCard
                                        key={item.id}
                                        {...item}
                                        index={index}
                                        active={active}
                                        handleClick={setActive}
                                    />
                                );
                            })
                        }
                    </div>
                </motion.div>
            </section >

            <section className={` ${styles.yPaddings} max-w-7xl mx-auto`}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={`${styles.innerWidth} ${styles.xPaddings}mx-auto flex lg:flex-row flex-col gap-8`}
                >
                    <motion.div
                        variants={planetVariants('left')}
                        className={`flex-1 ${styles.flexCenter}`}
                    >
                        <img
                            src={planetLogo}
                            alt='get-started'
                            className='w-[90%] h-[90%] object-contain' />
                    </motion.div>
                    <motion.div
                        variants={fadeIn('left', 'tween', 0.2, 1)}
                        className="flex-[0.75] flex justify-center flex-col mt-0 sm:mt-10 ">
                        <TypingText title="| How Estate works" />
                        <TitleText title={<>Get started with just a few clicks</>} />
                        <div className='mt-[30px] flex flex-col max-w-[370px] gap-[24px]'>
                            {startingFeatures.map((item, index) => (
                                <StartSteps
                                    key={item}
                                    number={index + 1}
                                    text={item}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            <section className={` ${styles.yPaddings} max-w-7xl mx-auto `}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className={`${styles.innerWidth} ${styles.xPaddings} mx-auto flex flex-col mt-20 mb-20`}
                >
                    <TypingText title="| Amazing places on the world" textStyles="text-center" />
                    <TitleText title={<>Travel around the world with exciting moments and experience waiting for you</>} textStyles="text-center lg:text-[36px] px-12 mt-8" />
                    <motion.div
                        variants={fadeIn('up', 'tween', 0.3, 1)}
                        className="relative mt-20 flex w-full h0-[550px]">
                        <img
                            src={mapLogo}
                            alt="Map img"
                            className='w-full h-full object-contain' />

                        {/* <div className='absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-blue-800 shadow-lg'>
                            <img
                                src={vacationLogo1}
                                alt='trip1'
                                className='h-full w-full'
                            />
                        </div>

                        <div className='absolute top-10 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-blue-800 shadow-lg'>
                            <img
                                src={vacationLogo2}
                                alt='trip1'
                                className='h-full w-full'
                            />
                        </div>

                        <div className='absolute top-1/2 left-[45%] w-[70px] h-[70px] p-[6px] rounded-full bg-blue-800 shadow-lg'>
                            <img
                                src={vacationLogo3}
                                alt='trip1'
                                className='h-full w-full'
                            />
                        </div> */}
                    </motion.div>
                </motion.div>
            </section >

            <section>
                <motion.footer
                    variants={footerVariants}
                    initial="hidden"
                    whileInView="show"
                    className={`${styles.xPaddings} py-8 flex justify-center`}
                >
                    <motion.button
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.3 }}
                        className='flex gap-4 justify-center items-center bg-yellow-200 rounded-full px-9 py-3 font-sans text-xl '
                        onClick={() => navigate("/list")}
                    >Enter Real Estate
                        <img
                            src={startLogo}
                            alt="headset"
                            className="w-10 h-10 object-contain"
                        />
                    </motion.button>
                </motion.footer>
            </section>
        </>
    );
}

export default AboutUs;