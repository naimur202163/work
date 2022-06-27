import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { WriteIcon } from "./Icons";
import Slider from "react-slick";
import { createLiveSchedule, getVideoCategories, updateScheduleById } from "../actions";
import useInput from "../hooks/useInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import VideoCategories from "./VideoCategory";

const Scheduler = ({ date, showScheduler, reloadSchedules, schedule }) => {
    date = date.split(" ")
    const month = date[1]
    const day = date[2]
    const category = "1";
    const dispatch = useDispatch()
    const [startTime, setStartTime] = useState({ hour: schedule.startHour || 0, minute: schedule.startMinute || 0 })
    const [endTime, setEndTime] = useState({ hour: schedule.endHour || 0, minute: schedule.endMinute || 0 })
    const [defaultCategories, setDefaultCategories] = useState([]);
    const liveClassCategory = useSelector(state => state.liveClassCategory)
    const [selectedCategory, setSelectedCategory] = useState(liveClassCategory || [])
    const title = useInput(schedule.title || "");
    const videoCategories = useSelector(state => state.video.videoCategories)
    const wrapperContent = document.querySelector('.wrapper__content');
    const startHourRef = useRef()
    const startMinuteRef = useRef()
    const endHourRef = useRef()
    const endMinuteRef = useRef()
    wrapperContent.style.overflow = 'hidden';

    const startTimeHour = {
        afterChange: (e) => setStartTime({ ...startTime, hour: e + 1 })
    }
    const startTimeMinute = {
        afterChange: (e) => setStartTime({ ...startTime, minute: e * 5 })
    }
    const endTimeMinute = {
        afterChange: (e) => setEndTime({ ...endTime, minute: e * 5 })
    }
    const endTimeHour = {
        afterChange: (e) => setEndTime({ ...endTime, hour: e + 1 })
    }

    const setLiveSchedule = async () => {
        if (!title.value) {
            return toast.error('You need to give your live class a title')
        }

        // if (!selectedCategory.length) {
        //     return toast.error('Please select at least one category for your live class');
        // }
        if (!schedule) {
            dispatch(
                createLiveSchedule({
                    title: title.value,
                    categoryId: 1,
                    categoryList: selectedCategory,
                    startHour: `${startTime.hour}`,
                    startMinute: `${startTime.minute}`,
                    endHour: `${endTime.hour}`,
                    endMinute: `${endTime.minute}`,
                    month,
                    day,
                })
            )
        }
        else {
            dispatch(
                updateScheduleById(schedule.id, {
                    title: title.value,
                    categoryId: 2,
                    categoryList: selectedCategory,
                    startHour: `${startTime.hour}`,
                    startMinute: `${startTime.minute}`,
                    endHour: `${endTime.hour}`,
                    endMinute: `${endTime.minute}`,
                    month,
                    day,
                })

            )
        }
        wrapperContent.style.overflow = 'visible';
        showScheduler(false);
    }

    const closeModal = () => {
        wrapperContent.style.overflow = 'visible';
        showScheduler(false);
    }

    useEffect(() => {
        dispatch(getVideoCategories())
        startHourRef.current.slickGoTo(parseInt(schedule?.startHour) || 0)
        startMinuteRef.current.slickGoTo(parseInt(schedule?.startMinute) || 0)
        endHourRef.current.slickGoTo(parseInt(schedule?.endHour) || 0)
        endMinuteRef.current.slickGoTo(parseInt(schedule?.endMinute) || 0)
    }, [])

    useEffect(() => {
        setSelectedCategory(liveClassCategory)
    }, [liveClassCategory])

    const SliderSettings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        swipeToSlide: true,
        verticalSwiping: true,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        className: 'center',
    };
    const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
    return (
        <SchedulerStyled>
            <div className="closeModal" onClick={closeModal}>
                <img src="/assets/utils/close.svg" alt="close" />
            </div>
            <div id="container">
                <p className="title">On {month}, {day}</p>
                <div id="scheduleTime">
                    <div className="startTime">
                        <div className="startHour">
                            <Slider ref={startHourRef} {...{ ...SliderSettings, ...startTimeHour }}>
                                {hours.map(hour => (
                                    <p className="time">{hour}</p>
                                ))}
                            </Slider>
                        </div>
                        <div className="startMinute">
                            <Slider ref={startMinuteRef} {...{ ...SliderSettings, ...startTimeMinute }}>

                                {minutes.map(minute => (
                                    <p className="time">{minute}</p>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <p className="to">TO</p>
                    <div className="endTime">
                        <div className="startHour">
                            <Slider ref={endHourRef} {...{ ...SliderSettings, ...endTimeHour }}>
                                {hours.map(hour => (
                                    <p className="time">{hour}</p>
                                ))}
                            </Slider>
                        </div>
                        <div className="startMinute">
                            <Slider ref={endMinuteRef} {...{ ...SliderSettings, ...endTimeMinute }}>
                                {minutes.map(minute => (
                                    <p className="time">{minute}</p>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="class-details">
                    <input
                        type="text"
                        className="title"
                        name=""
                        placeholder="Title your Live Class"
                        id=""
                        value={title.value}
                        onChange={title.onChange}
                    />
                    {/* <WriteIcon /> */}
                    <br />
                    <VideoCategories
                        videoCategories={videoCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        defaultCategories={defaultCategories}
                    />
                </div>
                <div>
                    <button className="delete">Delete</button>
                    <button className="set" onClick={setLiveSchedule}>{schedule ? 'Update' : 'Set'}</button>
                </div>
            </div>
        </SchedulerStyled>
    )
};

export default Scheduler;

const SchedulerStyled = styled.div`
    background: #7d7d7d;
    position: fixed;
    z-index: 900;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    transition: all 0.7s ease;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .slick-slide{
        font-size: 12px;
        height: 35px;
        width: 28px;
    }
    .slick-active{
        padding-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 15px;
        font-size: 18px;
    }
    .slick-current{
        font-size: 25px;
        color: #F2F2F7;
    }
    .slick-slide{
        padding-bottom: 5px;
    }

    #container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #2C2C2E;
        width: 268px;
        padding: 11px 21px 30px;
        height: 332px;
        border-radius: 15px;

        #scheduleTime{
            text-align: center;
            display: flex;
            height: 71px;
            margin: 32px 0 37px 0;
            font-size: 21px;
            align-items: center;
            .startTime, .endTime{
                width: fit-content;
                display: flex;
                height: 100px;
                .startHour {
                    border-right: 1px solid grey;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center:
                }
                .startMinute{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center:
                }
            }
            .to{
                letter-spacing: 1.64px;
                color: #8E8E93;
                margin: 0 20px;
            }
            .time{
                color: AEAEB2;
                font-weight: 600;
                line-height: 2.2;
                width: fit-content;
            }
        }
    }
    .class-details{
        margin-bottom: 13px;
        svg{
            position: relative;
            left: 27px;
        }
        .title{
            background: #1C1C1E;
            margin-top: 7px;
            margin-bottom: 7px;
            font-size: 10px;
            border: none;
            color: #8E8E93;
        }
        .title, .category, option{
            padding: 14px;
            width: 307px;
            border-radius: 5px;
            width: 228px;
            height: 40px;
            font-weight: 600;
            font-size: 10px;
            line-height: 13;
        }
        .category, option{
            background: #1C1C1E;
            border: none;
            color: #8E8E93;
        }
    }

    .delete{
        color: #F46A6A;
        background: #48484A;
        margin-right: 20px;
    }
    .delete, .set {
        border: none;
        border-radius: 8px;
        width: 84px;
        height: 36px;
        font-weight: 600;
        font-size: 9px;
        line-height: 10p;
    }
    .set{
        color: #F2F2F7;
        background-image: linear-gradient(113deg, #F9903D, #F75B8C);
    }

    .closeModal {
        position: absolute;
        top: 10%;
        height: 2.8rem;
        width: 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #333;
        border-radius: 50%;
        cursor: pointer;
        z-index: 5;

        img {
        height: 1.2rem;
        width: 1.2rem;
        }
    }
    
`;