import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
export const easeOutExpo = gsap.parseEase('cubic-bezier(0.16, 1, 0.3, 1)')
