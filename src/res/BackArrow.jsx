import React from "react";

function BackArrow(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="11"
			viewBox="0 0 18 11"
			fill="none"
			onClick={props.onClick}
			className="pageBackBtn"
		>
			<path
				d="M5.29297 1.29297L2.00007 4.58586C1.60955 4.97639 1.60955 5.60955 2.00007 6.00008L5.29297 9.29297M2.29297 5.29297L16.293 5.29297"
				stroke="#2B3F6C"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	);
}

export default BackArrow;
