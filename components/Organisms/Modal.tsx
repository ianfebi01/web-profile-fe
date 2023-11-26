import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, FunctionComponent, ReactNode } from 'react'
import Button2 from '../Atoms/Button2'

interface Props{
    isOpen: boolean
    setIsOpen: ( value: boolean ) => void
	title: string
	desciption?: string
	children: ReactNode
	onConfirm: () => void
	confirmText?: string
	cancelText?: string

}
const Modal: FunctionComponent<Props> = ( props ) => {

	const { isOpen, setIsOpen, title, desciption, children, onConfirm, confirmText='Save', cancelText='Cancel'  } = props
	
	return (
		<Transition
			show={isOpen}
			enter="transition-opacity ease-in-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			as={Fragment}
			unmount={false}
		>

			<Dialog open={isOpen} onClose={() => setIsOpen( false )}
				unmount={false}
				className="fixed z-50 inset-y-0 my-auto inset-x-0 mx-auto w-full bg-dark/75  flex items-center justify-center"
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-75 translate-y-40"
					enterTo="opacity-100 scale-100 translate-y-0"
					leave="ease-in duration-300"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
					unmount={false}
				>

					<Dialog.Panel className='inset-x-0 inset-y-0 m-auto max-w-2xl w-full max-h-[600px] bg-dark border border-none rounded-lg overflow-hidden'>
						<Dialog.Title className={`px-4 pt-4 text-xl ${!desciption ? 'border-b-[1px] border-white/25 pb-4' : ''}`}>{title}</Dialog.Title>
						{desciption ? 
							<Dialog.Description className='px-4 border-b-[1px] border-white/25 pb-4'>
								{desciption}
							</Dialog.Description>
							: ''
						
						}
						<div className='p-4 border-b-[1px] border-white/25 pb-4'>
							{children}
						</div>
						<div className='p-4 flex justify-end gap-2'>
							<Button2 type='button'
								onClick={() => setIsOpen( false )}
							>{cancelText}</Button2>

							<Button2 type='button' className='bg-dark-secondary'
								onClick={() => onConfirm( )}
							>{confirmText}</Button2>
						</div>
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	)
}

export default Modal
