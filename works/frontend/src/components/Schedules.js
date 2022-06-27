import React, { useEffect, useState } from 'react';
import { createStyles } from '@mantine/core';
import { Month } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { AddIcon, CalendarIcon, ShareIconSvg, VideoIcon } from './Icons';
import { getLiveScheduleByMonth } from '../actions';
import Scheduler from './Scheduler';
import useInput from '../hooks/useInput';
import DeleteIcon from './icons/DeleteIcon';
import DeleteScheduleModal from './DeleteScheduleModal';

const useStyles = createStyles((theme) => ({
    outside: {
        opacity: 0,
        display: 'none'
    },

    weekend: {
        fontSize: '10px', color: '#F2F2F7 !important', textAlign: 'center'
    },
}));

function extractDate(dateObject) {
    const date = new Date(dateObject)
    return date.getDate()
}
function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
        month: 'short',
    });
}

const Schedules = () => {
    const dispatch = useDispatch();
    const liveSchedules = useSelector((state) => state.liveSchedules)
    const { classes, cx } = useStyles();
    const [scheduler, showScheduler] = useState(false)
    const [calendarMonth, setcalendarMonth] = useState(new Date());
    const selectedMonth = useInput((new Date()).getMonth())
    const [dateValue, setDateValue] = useState(null);
    const [date, setDate] = useState(null);
    const [dateSchedules, setDateSchedules] = useState(liveSchedules.info?.schedules || []);
    const [showClasses, setShowClasses] = useState(false);
    const [deleteModal, showDeleteModal] = useState(false);
    let [selectedSchedule, setSelectedSchedule] = useState(false);

    function checkSchedule(date) {
        date = (new Date(date)).getDate()
        const scheduleExists = liveSchedules.info?.schedules.find(schedule => schedule.day == date)
        if (scheduleExists != undefined) {
            return { backgroundColor: 'purple' }
        }
    }

    function handleDelete(schedule) {
        setSelectedSchedule(schedule)
        showDeleteModal(true)
    }

    function addNewSchedule() {
        setSelectedSchedule(false)
        showScheduler(true)
    }

    function showUpdateModal(schedule) {
        setSelectedSchedule(schedule)
        showScheduler(true)
    }

    useEffect(() => {
        const chosenDate = (new Date(dateValue)).toDateString()
        setDate(chosenDate)
        if (date !== null) {
            setShowClasses(true)
        }
        else {
            setShowClasses(false)
        }
    }, [dateValue])

    useEffect(() => {
        if (liveSchedules.info != undefined) {
            let { schedules } = liveSchedules.info
            schedules = schedules.filter(schedule => schedule.day == extractDate(dateValue))
            setDateSchedules(schedules)
        }
    }, [liveSchedules, dateValue])

    useEffect(() => {
        dispatch(getLiveScheduleByMonth(toMonthName(selectedMonth.value)))
        const now = new Date()
        const selectedTime = new Date(now.getFullYear(), selectedMonth.value, 1);

        if (selectedMonth.value !== null) {

            setcalendarMonth(selectedTime)
        }

    }, [selectedMonth.value])

    const calendarMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return (
        <SchedulesStyled>
            {scheduler &&
                <Scheduler date={date} showScheduler={showScheduler} schedule={selectedSchedule} />
            }
            {deleteModal && (
                <DeleteScheduleModal closeModal={() => showDeleteModal(false)} schedule={selectedSchedule} />
            )}
            <div>
                <div className='month'>
                    <CalendarIcon />
                    <select value={selectedMonth.value} onChange={selectedMonth.onChange}>
                        {calendarMonths.map((calendarMonth, index) => (
                            <option selected={index === selectedMonth.value} value={index}>{calendarMonth}</option>
                        ))

                        }
                    </select>
                </div>
                <Month
                    styles={() => ({
                        weekdayCell: { padding: '10px 16px' },
                        weekday: {
                            fontSize: '10px', color: '#F2F2F7', textAlign: 'center'
                        },
                        day: { fontSize: '10px', color: '#F2F2F7', ":hover": { background: '#48484A' }, textAlign: "center" },
                        selected: { background: '#48484A !important' }
                    })}
                    dayClassName={(date, modifiers) =>
                        cx({ [classes.outside]: modifiers.outside, [classes.weekend]: modifiers.weekend })
                    }
                    dayStyle={checkSchedule}
                    month={calendarMonth}
                    value={dateValue}
                    onChange={setDateValue}
                />
            </div>
            {showClasses &&
                <div className='schedulesContainer'>
                    {liveSchedules.loading &&
                        <p>loading live schedules</p>
                    }
                    {!liveSchedules.loading &&
                        dateSchedules.length < 1
                        ? <p>You do not have any live class scheduled for this date</p>
                        : dateSchedules.map(schedule => {
                            const { startHour, startMinute, title, endHour, endMinute } = schedule
                            return (
                                <div className='schedule'>
                                    <div className='schedule-details'>
                                        <span className='time' onClick={() => showUpdateModal(schedule)}>{startHour}:{startMinute} - {endHour}:{endMinute}</span>
                                        <span className='name'>Live Class: {title} in category</span>
                                    </div>
                                    <div className='schedule-icons'>
                                        <div onClick={() => handleDelete(schedule)}>
                                            <DeleteIcon fill="white" />
                                        </div>
                                        <VideoIcon />
                                        <ShareIconSvg />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div onClick={() => addNewSchedule()}>
                        <AddIcon />
                    </div>
                </div>
            }
        </SchedulesStyled>
    )
}

export default Schedules;

const SchedulesStyled = styled.div`
    width: 393px;
    padding: 26px 13px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusify-content: center;
    .month{
        display: flex;
        align-items: center;
        margin-left: 16px;
        select{
            width: 120px;
            padding: 10px;
            border: none;
            color: #F2F2F7;
            background: none;
            option {
                background: #1C1C1E;
                color: #F2F2F7;
            }
        }
    }
    .schedule{
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .schedule-details{
            display: flex;
            flex-direction: column;
            .time{
                color: #F2F2F7;
                letter-spacing: 0px;
                font-size: 25px;
                font-weight: 600;
                cursor: pointer;
            }
            .name{
                font-size: 10px;
            }
        }
        .schedule-icons{
            display: flex;
            margin-top: 10px;
            align-items: center;
            height: fit-content;
            div{
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            svg{
                margin-left: 30px;
            }
        }
    }
    .schedulesContainer{
        width: 393px;
        margin-top: 18px;
        margin-bottom: 30px;
    }

`;