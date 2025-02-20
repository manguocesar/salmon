'use client';
import React from 'react'

export const SVGAnimation = ({ translateX }: { translateX: number }) => {
    return (
        <div>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                color='#dd6b20'
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 mx-auto animate-swim"
            >
                <path d="M22 12c-1.5 1.5-4 1.5-6 0s-4-1.5-6 0-4 1.5-6 0-4-1.5-6 0" />
                <path d="M2 12l10-10 10 10-10 10-10-10z" />
            </svg>
            <style jsx>{`
            @keyframes swim {
                0% {
                    transform: translateX(0) translateY(0);
                }
                50% {
                    transform: translateX(${translateX}px) translateY(0px);
                }
                100% {
                    transform: translateX(0) translateY(0);
                }
            }
            .animate-swim {
                animation: swim 2s infinite;
            }
        `}</style>

        </div>
    )
}