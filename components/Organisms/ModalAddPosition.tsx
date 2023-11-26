import React, { FunctionComponent } from 'react'
import Modal from './Modal'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
}
const ModalAddPosition: FunctionComponent<Props> = ( { isOpen, setIsOpen } ) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}
			onConfirm={()=>null}
			title='Add new position'
		>
			<p>lkanklsd alksndaskld alksdnkals mklasnmdkna lkasndklas</p>
		</Modal>
	)
}

export default ModalAddPosition
