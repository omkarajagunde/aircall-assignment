import React, { useContext } from "react";
import { GlobalStore } from "./contexts/GlobalContext.jsx";
import Inbound from "./res/Inbound.jsx";
import Outbound from "./res/Outbound.jsx";
import Indirection from "./res/Indirection.jsx";
import CountUp from "react-countup";

function Activity() {
	const { globalStore, setActivityDetail } = useContext(GlobalStore);

	const getCalls = () => {
		let calls = [];
		Object.entries(globalStore.calls).forEach((call) => {
			let inbound = 0;
			let outbound = 0;
			call[1].forEach((elem) => {
				if (elem.direction && elem.direction === "inbound") inbound++;
				if (elem.direction && elem.direction === "outbound") outbound++;
			});
			calls.push({ via: call[0], list: call[1], inbound, outbound });
		});

		return calls.map((call) => (
			<div
				className="via"
				onClick={() => setActivityDetail(call)}
			>
				<div>via</div> <div className="via--title">{call.via}</div>
				<div className="via--tags">
					<Inbound />
					<div>
						<CountUp
							end={call.inbound}
							start={0}
						/>
					</div>
				</div>
				<div className="via--tags">
					<Outbound />
					<div>
						<CountUp
							end={call.outbound}
							start={0}
						/>
					</div>
				</div>
				<div className="via--tags">
					<Indirection />
				</div>
			</div>
		));
	};
	return (
		<div className="activity">
			<div>{getCalls()}</div>
		</div>
	);
}

export default Activity;
