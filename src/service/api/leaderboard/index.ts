import { IHunterLeaderboard } from "@/model/leaderboard";
import axiosInstance from "@/service/api/axios/axiosInstance";

export const leaderboardAPI = {
	getHunterList: () => {
		return axiosInstance.get<IHunterLeaderboard[]>("api/v3/report/job/getleaderboard", {
			params: {
				leaderBoardType: 1,
				ratingType: 3,
				userType: 5,
			},
		});
	},
};
