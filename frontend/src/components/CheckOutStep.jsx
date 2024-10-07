import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FaShippingFast } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { RiBankFill } from "react-icons/ri";



function CheckOutStep({ activeStep }) {
    const steps = [
        {
            label: <p>Shipping Info</p>,
            icon: <FaShippingFast />
        },
        {
            label: <p>Confirm Order</p>,
            icon: <GiConfirmed />
        },
        {
            label: <p>Payment</p>,
            icon: <RiBankFill />
        },

    ]
    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {
                    steps.map((item, index) => {
                        return <Step key={index}>
                            <StepLabel icon={item.icon} className='lg:text-2xl text-xl'>{item.label}</StepLabel>
                        </Step>
                    })
                }
            </Stepper>
        </div>
    )
}

export default CheckOutStep
