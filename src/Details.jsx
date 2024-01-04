import React, { useContext } from "react";
import { GlobalStore } from "./contexts/GlobalContext.jsx";
import Inbound from "./res/Inbound.jsx";
import Outbound from "./res/Outbound.jsx";
import MissedCall from "./res/MissedCall.jsx";
import Timestamp from "./res/Timestamp.jsx";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";

function Details(props) {
	const { globalStore, setActivityDetail, handleArchiveCall } = useContext(GlobalStore);
	return (
		<div className="details">
			{globalStore.selectedCall.list.map((li) => {
				if (li.from && li.to) {
					return (
						<SwipeToRevealActions
							height="110px"
							actionButtons={[
								{
									content: (
										<div className="archive">
											<span>Archive call</span>
										</div>
									),
									onClick: () => handleArchiveCall(li)
								}
							]}
							actionButtonMinWidth={70}
						>
							<div className="detail">
								<div className="detail--line1">
									<div className="no">
										<div className="label">From:</div>
										<div>{li.from}</div>
									</div>
									<div className="no-dir"> {li.direction === "inbound" ? <Inbound /> : <Outbound />}</div>
									<div className="no">
										<div className="label">to:</div>
										<div>{li.to}</div>
									</div>
								</div>
								<div className="detail--line2">
									<div className="no--tags">{li.duration} secs</div>
									{li.call_type === "missed" && (
										<div className="no--tags">
											<MissedCall /> {"   "} missed
										</div>
									)}
									<div className="no--tags">
										<Timestamp /> {new Date(li.created_at).toDateString()}
									</div>
								</div>
							</div>
						</SwipeToRevealActions>
					);
				}
			})}
		</div>
	);
}

export default Details;
