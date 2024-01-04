import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";
import Activity from "./Activity.jsx";
import Archive from "./Archive.jsx";
import Details from "./Details.jsx";
import { GlobalStore } from "./contexts/GlobalContext.jsx";
import BackArrow from "./res/BackArrow.jsx";

const apiUrl = "https://cerulean-marlin-wig.cyclic.app/";
const App = () => {
	const [state, setState] = useState({
		options: [
			{ name: "Activity", selected: true, component: Activity },
			{ name: "Archived", selected: false, component: Archive }
		],
		isFiltersOpen: false,
		filters: [
			{ name: "All calls", applied: true, id: "all" },
			{ name: "Inbound calls", applied: false, id: "inbound" },
			{ name: "Outbound calls", applied: false, id: "outbound" }
		],
		calls: {}
	});

	useEffect(() => {
		// Example usage
		fetchCalls();
	}, []);

	const fetchCalls = () => {
		fetch(apiUrl + "/activities").then((response) =>
			response.json().then((data) => {
				if (data) {
					console.log("Fetched Data:", data);
					let groupByVia = {};
					data.forEach((entry) => {
						if (entry.via && !entry.is_archived) {
							if (groupByVia[entry.via]) {
								groupByVia[entry.via].push(entry);
							} else {
								groupByVia[entry.via] = [entry];
							}
						}
					});
					setState((prevState) => ({
						options: prevState.options,
						filters: prevState.filters,
						isFiltersOpen: prevState.isFiltersOpen,
						selectedCall: prevState.selectedCall,
						calls: groupByVia
					}));
				}
			})
		);
	};

	const handleSelectOption = (opt) => {
		let opts = state.options;
		opts.forEach((option) => {
			option.selected = opt.name === option.name;
		});
		setState((prevState) => ({
			filters: prevState.filters,
			isFiltersOpen: prevState.isFiltersOpen,
			calls: prevState.calls,
			selectedCall: prevState.selectedCall,
			options: opts
		}));
	};

	const setActivityDetail = (call) => {
		setState((prevState) => ({
			filters: prevState.filters,
			isFiltersOpen: prevState.isFiltersOpen,
			calls: prevState.calls,
			options: prevState.options,
			selectedCall: call
		}));
	};

	const handleArchiveCall = (call) => {
		fetch(apiUrl + "activities/" + call.id, {
			method: "PATCH",
			headers: {
				Accept: "application.json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ is_archived: true }),
			cache: "default"
		}).then((response) => {
			if (response.ok) {
				fetchCalls();
			}
		});
	};

	let type = state.filters.find((fit) => fit.applied);
	return (
		<GlobalStore.Provider
			value={{
				globalStore: state,
				handleSelectOption,
				setActivityDetail,
				handleArchiveCall
			}}
		>
			<div className="container">
				<Header />
				<div className="topBar">
					{state.selectedCall && <BackArrow onClick={() => setActivityDetail(null)} />}
					<div className="pageTitle">{type.name}</div>
					{state.selectedCall && <div className="pageSubTitle">{`via ${state.selectedCall.via}`}</div>}
				</div>
				<div className="container-view">
					{!state.selectedCall &&
						state.options.map((opt) => {
							if (opt.selected) {
								return <opt.component />;
							}
						})}

					{state.selectedCall && <Details call={state.selectedCall} />}
				</div>
				<Navigation />
			</div>
		</GlobalStore.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
