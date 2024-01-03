import React, { useContext, useEffect, useState } from "react";
import Filters from "./res/Filter.jsx";
import { GlobalStore } from "./contexts/GlobalContext.jsx";

function Navigation() {
	const { globalStore, handleSelectOption } = useContext(GlobalStore);

	return (
		<div className="navigation">
			{globalStore.options.map((opt) => {
				return (
					<div
						onClick={() => handleSelectOption(opt)}
						className={`navigation--option ${opt.selected ? "selected" : ""}`}
					>
						{opt.name}
					</div>
				);
			})}
			<div
				className={`navigation--option`}
				style={{ width: "80px" }}
			>
				<Filters />
			</div>
			{globalStore.isFiltersOpen && (
				<div
					className="activityMenu"
					id="activityMenu"
				>
					<div className="activityMenu--item">All calls</div>
					<div className="activityMenu--item">Inbound</div>
					<div className="activityMenu--item">Outbound</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
