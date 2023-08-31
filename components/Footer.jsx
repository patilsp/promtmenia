"use client"
import React from 'react'

const Footer = () => {
  return (
    <div>
         <div className="w-full">
                <div className="text-white py-10">
                   
                    <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                        <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; Copyright, 2023. </p>
                        <div className="order-1 md:order-2">
                            <span className="px-2">About us</span>
                            <span className="px-2 border-l">Contact us</span>
                            <span className="px-2 border-l">Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>

           
      
    </div>
  )
}

export default Footer
