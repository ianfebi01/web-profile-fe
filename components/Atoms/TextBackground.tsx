'use client'

import React, { useEffect, useRef } from 'react'
import {
	useAnimation,
	useInView,
	motion,
	easeOut,
} from 'framer-motion'

const TextBackground = () => {
	const textRef = useRef( null )
	const textView = useInView( textRef, {
		once : true,
	} )

	const textControl = useAnimation()

	useEffect( () => {
		if ( textView ) {
			textControl.start( 'visible' )
		}
	}, [textView] )

	return (
		<div
			ref={textRef}
			className="text-9xl font-bold  w-fit h-fit absolute inset-x-0 mx-auto inset-y-0 my-auto -translate-y-10 sm:-translate-y-24"
		>
			<motion.div
				variants={{
					hidden : {
						opacity : 0,
						y       : 75,
					},
					visible : {
						opacity : 1,
						y       : 0,
					},
				}}
				initial="hidden"
				animate={textControl}
				transition={{
					duration : 0.3,
					delay    : 0.3,
					ease     : easeOut,
				}}
				className="flex flex-col sm:flex-row sm:gap-8 text-center"
			>
				<h1 className="leading-none m-0">IAN</h1>
				<h1 className="text-orange leading-none">FEBI</h1>
			</motion.div>
		</div>
	)
}

export default TextBackground
