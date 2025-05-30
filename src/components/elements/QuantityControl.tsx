'use client'
import { Link } from "@/src/i18n/navigation";
import { useState } from 'react'

export default function QuantityControl() {
	const [qtyVal, setQtyVal] = useState(1)

	const handleIncrement = (e: any) => {
		e.preventDefault()
		setQtyVal(prevQty => prevQty + 1)
	}

	const handleDecrement = (e: any) => {
		e.preventDefault()
		setQtyVal(prevQty => Math.max(1, prevQty - 1))
	}

	return (
		<div className="detail-qty">
			<Link href="#" onClick={handleDecrement} className="qty-down ps-2">
				<svg className="invert" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
					<path d="M15.125 12.375H6.875C6.51033 12.375 6.16059 12.2301 5.90273 11.9723C5.64487 11.7144 5.5 11.3647 5.5 11C5.5 10.6353 5.64487 10.2856 5.90273 10.0277C6.16059 9.76987 6.51033 9.625 6.875 9.625H15.125C15.4897 9.625 15.8394 9.76987 16.0973 10.0277C16.3551 10.2856 16.5 10.6353 16.5 11C16.5 11.3647 16.3551 11.7144 16.0973 11.9723C15.8394 12.2301 15.4897 12.375 15.125 12.375Z" fill="#101010" />
				</svg>
			</Link>

			<input
				type="text"
				name="quantity"
				className="qty-val w-100px pl-45"
				value={qtyVal}
				readOnly
			/>

			<Link href="#" onClick={handleIncrement} className="qty-up pe-2">
				<svg className="invert" xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
					<path d="M15.5833 10.0833H11.9167V6.41667C11.9167 6.17355 11.8201 5.94039 11.6482 5.76849C11.4763 5.59658 11.2431 5.5 11 5.5C10.7569 5.5 10.5237 5.59658 10.3518 5.76849C10.1799 5.94039 10.0833 6.17355 10.0833 6.41667V10.0833H6.41667C6.17355 10.0833 5.94039 10.1799 5.76849 10.3518C5.59658 10.5237 5.5 10.7569 5.5 11C5.5 11.2431 5.59658 11.4763 5.76849 11.6482C5.94039 11.8201 6.17355 11.9167 6.41667 11.9167H10.0833V15.5833C10.0833 15.8264 10.1799 16.0596 10.3518 16.2315C10.5237 16.4034 10.7569 16.5 11 16.5C11.2431 16.5 11.4763 16.4034 11.6482 16.2315C11.8201 16.0596 11.9167 15.8264 11.9167 15.5833V11.9167H15.5833C15.8264 11.9167 16.0596 11.8201 16.2315 11.6482C16.4034 11.4763 16.5 11.2431 16.5 11C16.5 10.7569 16.4034 10.5237 16.2315 10.3518C16.0596 10.1799 15.8264 10.0833 15.5833 10.0833Z" fill="#101010" />
				</svg>
			</Link>
		</div>
	)
}
