import PersonImage from '@/components/Atoms/PersonImage'
import Shape from '@/components/Atoms/Shape'
import TextBackground from '@/components/Atoms/TextBackground'
import TextSide from '@/components/Atoms/TextSide'
import { IApiProfile } from '@/types/api/profile'
import React, { FunctionComponent } from 'react'

interface Props{
	profile: IApiProfile
}

const Section1: FunctionComponent<Props> = ( props ) => {
	const { profile } = props

	return (
		<section
			id="home"
			className="main__section h-[650px] md:h-[487px] transition-default bg-dark relative"
		>
			<Shape />
			<div className="main__container mt-20 sm:mt-6 relative overflow-hidden">
				<div className="text-center sm:text-left transition-default">
					<p>{profile?.name}</p>
					<a href="mailto:ianfebi01@gmail.com" className="text-white-overlay">
						{profile.email}
					</a>
				</div>
				<TextBackground textBg={profile?.textBg as string}/>
				<PersonImage />
				<TextSide openToWork={profile?.openToWork as boolean} />
			</div>
		</section>
	)
}

export default Section1
