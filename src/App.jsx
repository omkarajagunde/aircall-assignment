import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";
import Activity from "./Activity.jsx";
import Archive from "./Archive.jsx";
import { GlobalStore } from "./contexts/GlobalContext.jsx";

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
		calls: {
			600: [
				{
					direction: "outbound",
					from: 306306306,
					to: 890,
					via: 600,
					duration: 231,
					is_archived: false,
					call_type: "missed",
					id: "64cd75ec11a82c708838361e",
					created_at: "2023-08-04T22:04:28.098Z"
				}
			],
			1234: [
				{
					direction: "inbound",
					from: 1234,
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: false,
					call_type: "missed",
					id: "639a10a9328500b1a0fa9c04",
					created_at: "2022-12-14T18:06:33.291Z"
				},
				{
					direction: "inbound",
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: false,
					call_type: "missed",
					id: "639a10b8328500b1a0fa9c07",
					created_at: "2022-12-14T18:06:48.754Z"
				},
				{
					direction: "inbound",
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: false,
					call_type: "missed",
					id: "639a143c896e0d0f4bf88b2e",
					created_at: "2022-12-14T18:21:48.406Z"
				},
				{
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: false,
					call_type: "missed",
					id: "639a144e896e0d0f4bf88b31",
					created_at: "2022-12-14T18:22:06.485Z"
				},
				{
					direction: "inbound",
					from: 1234,
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: true,
					call_type: "missed",
					id: "639a177121da466572fd6bd8",
					created_at: "2022-12-14T18:35:29.422Z"
				},
				{
					direction: "outbound",
					from: 1234,
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: true,
					call_type: "missed",
					id: "639a178921da466572fd6bdb",
					created_at: "2022-12-14T18:35:53.057Z"
				},
				{
					direction: "outbound",
					from: 1234,
					to: 1234,
					via: 1234,
					duration: 21312,
					is_archived: true,
					call_type: "missed",
					id: "639a178f21da466572fd6bdd",
					created_at: "2022-12-14T18:35:59.854Z"
				}
			],
			12312: [
				{
					direction: "inbound",
					from: 1231,
					to: 12321,
					via: 12312,
					duration: 21312,
					is_archived: false,
					call_type: "missed",
					id: "639a1043328500b1a0fa9c01",
					created_at: "2022-12-14T18:04:51.894Z"
				}
			],
			30000000: [
				{
					direction: "outbound",
					from: 100000,
					to: 200000,
					via: 30000000,
					duration: 0,
					call_type: "missed",
					is_archived: false,
					id: "6393bb5469073dc45849ca7a",
					created_at: "2022-12-09T22:48:52.789Z"
				}
			],
			30000001: [
				{
					direction: "inbound",
					from: 100001,
					to: 200001,
					via: 30000001,
					duration: 0,
					is_archived: false,
					call_type: "missed",
					id: "639737ac587edc08100c026f",
					created_at: "2022-12-12T14:16:12.721Z"
				}
			],
			30000002: [
				{
					direction: "inbound",
					from: 100002,
					to: 200002,
					via: 30000002,
					duration: 20,
					is_archived: false,
					call_type: "voicemail",
					id: "63973961362d5c09cd79364a",
					created_at: "2022-12-12T14:23:29.409Z"
				}
			],
			30000003: [
				{
					direction: "inbound",
					from: 100001,
					to: 200002,
					via: 30000003,
					duration: 10,
					is_archived: true,
					call_type: "answered",
					id: "6393bb7b69073dc45849ca7c",
					created_at: "2022-12-09T22:49:31.911Z"
				},
				{
					direction: "inbound",
					from: 100003,
					to: 200003,
					via: 30000003,
					duration: 100,
					is_archived: false,
					call_type: "answered",
					id: "639746e963147b03c894f521",
					created_at: "2022-12-12T15:21:13.564Z"
				}
			],
			30000004: [
				{
					direction: "inbound",
					from: 100004,
					to: 200004,
					via: 30000004,
					duration: 1,
					is_archived: true,
					call_type: "voicemail",
					id: "639747acb585e7e5526eb46a",
					created_at: "2022-12-12T15:24:28.091Z"
				}
			],
			30000005: [
				{
					direction: "inbound",
					from: 100005,
					to: 200005,
					via: 30000005,
					duration: 2,
					is_archived: true,
					call_type: "voicemail",
					id: "63974a811f096c984321fe0b",
					created_at: "2022-12-12T15:36:33.277Z"
				}
			]
		}
	});

	useEffect(() => {
		// Example usage
		const apiUrl = "https://cerulean-marlin-wig.cyclic.app/activities";

		// fetch(apiUrl).then((response) =>
		// 	response.json().then((data) => {
		// 		if (data) {
		// 			console.log("Fetched Data:", data);
		// 			let groupByVia = {};
		// 			data.forEach((entry) => {
		// 				if (entry.via) {
		// 					if (groupByVia[entry.via]) {
		// 						groupByVia[entry.via].push(entry);
		// 					} else {
		// 						groupByVia[entry.via] = [entry];
		// 					}
		// 				}
		// 			});
		// 			setState((prevState) => ({
		// 				options: prevState.options,
		// 				filters: prevState.filters,
		// 				isFiltersOpen: prevState.isFiltersOpen,
		// 				calls: groupByVia
		// 			}));
		// 		}
		// 	})
		// );
	}, []);

	const handleSelectOption = (opt) => {
		let opts = state.options;
		opts.forEach((option) => {
			option.selected = opt.name === option.name;
		});
		setState((prevState) => ({
			filters: prevState.filters,
			isFiltersOpen: prevState.isFiltersOpen,
			calls: prevState.calls,
			options: opts
		}));
	};

	let type = state.filters.find((fit) => fit.applied);
	return (
		<GlobalStore.Provider
			value={{
				globalStore: state,
				handleSelectOption
			}}
		>
			<div className="container">
				<Header />
				<div className="pageTitle">{type.name}</div>
				<div className="container-view">
					{state.options.map((opt) => {
						if (opt.selected) {
							return <opt.component />;
						}
					})}
				</div>
				<Navigation />
			</div>
		</GlobalStore.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
