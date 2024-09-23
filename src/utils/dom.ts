import { FieldTypes } from "@/components/newsletter-form/newsletter-form";
import { Job } from "@/model/auth";
import { jobAPI } from "@/service/api/jobs";
import { leaderboardAPI } from "@/service/api/leaderboard";
import { utils } from "@/utils";
import { stringUtils } from "@/utils/string";

export const domUtils = {
	createJobItemElement: (job: Job) => {
		const nf = new Intl.NumberFormat("en-US");
		const li = document.createElement("li");
		li.style.fontFamily = "Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif";
		li.style.marginBottom = "5px";

		// Create the <span> element for the price
		const span = document.createElement("span");
		span.style.color = "rgb(255, 255, 255)";
		span.style.backgroundColor = "#0e5135";
		span.style.fontWeight = "700";
		span.style.padding = "0.05em 0.5em 0.1em";
		span.style.whiteSpace = "nowrap";
		span.style.borderRadius = "15px";
		span.textContent = `Thưởng ${nf.format(job.bonusAmount)} VNĐ`;

		// Create the <a> element for the job name
		const a = document.createElement("a");
		a.href = `https://app.aniday.com/vi/jobs/${job.id}`;
		a.textContent = job.name;

		// Append the <span> and <a> to the <li>
		li.appendChild(span);
		li.appendChild(document.createTextNode(" "));
		li.appendChild(a);

		return li;
	},
	createJobGroupTitleElement: (name: string) => {
		const p = document.createElement("p");
		p.style.fontFamily = "Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif";
		p.textContent = stringUtils.capitalizeEachWord(name);

		return p;
	},
	createListJobItems: async (groups: FieldTypes["jobGroup"]) => {
		const listItems: HTMLElement[] = [];

		for (const group of groups) {
			const titleElement = domUtils.createJobGroupTitleElement(group.name);
			listItems.push(titleElement);

			const ol = document.createElement("ol");

			for (const link of group.list) {
				const job = await jobAPI.getDetail(parseInt(link.link.split("/")?.pop() ?? "0")).then((data) => data.data);
				const jobListItem = domUtils.createJobItemElement(job);
				ol.appendChild(jobListItem);
			}

			listItems.push(ol);
		}

		return listItems;
	},
	insertHtmlElementsAtComment: (htmlString: string, elements: HTMLElement[], comment: string) => {
		const container = document.createElement("div");
		container.innerHTML = htmlString;

		const fragment = document.createDocumentFragment();
		elements.forEach((element) => {
			fragment.appendChild(element);
		});

		const commentNode = Array.from(container.childNodes).find((node) => {
			return node.nodeType === Node.COMMENT_NODE && node.nodeValue?.trim() === comment;
		});

		if (commentNode) {
			commentNode.parentNode?.insertBefore(fragment, commentNode);
		} else {
			console.warn(`Comment "${comment}" not found.`);
		}

		return container.innerHTML;
	},
	createImageTable: (src: string) => {
		// Create table element
		const table = document.createElement("table");
		table.style.color = "#333333";
		table.style.width = "100%";
		table.style.maxWidth = "720px";
		table.style.whiteSpace = "nowrap";
		table.style.paddingBottom = "8px";
		table.style.borderCollapse = "collapse";
		table.style.textAlign = "center";
		table.setAttribute("cellpadding", "0");
		table.setAttribute("cellspacing", "0");

		// Create tbody element
		const tbody = document.createElement("tbody");

		// Create tr element
		const tr = document.createElement("tr");

		// Create td element
		const td = document.createElement("td");

		// Create anchor element
		const a = document.createElement("a");
		a.href = "https://app.aniday.com/vi/jobs";

		// Create img element
		const img = document.createElement("img");
		img.alt = "image";
		img.src = src;
		img.style.borderRadius = "10px";
		img.setAttribute("width", "100%");

		// Append img to a, a to td, td to tr, tr to tbody, tbody to table
		a.appendChild(img);
		td.appendChild(a);
		tr.appendChild(td);
		tbody.appendChild(tr);
		table.appendChild(tbody);

		return table;
	},
	createContentElement: (content: string) => {
		const modifiedContent = content.replaceAll("<p><br></p>", "");

		const container = document.createElement("div");
		container.innerHTML = modifiedContent;

		const newContent: HTMLElement[] = [];

		for (const child of Array.from(container.children) as HTMLElement[]) {
			if (child.innerHTML) {
				console.log("child.tagName: ", child.tagName);
				console.log("child.children[0]?.tagName: ", child.children[0]?.tagName);
				if (child.children[0]?.tagName === "IMG") {
					const table = domUtils.createImageTable(child.children[0].getAttribute("src") ?? "");
					newContent.push(table);
				} else {
					child.style.fontFamily = "Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif";
					newContent.push(child);
				}
			}
		}

		return newContent;
	},
	getBodyContent: (html: string) => {
		if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");
			return doc.body.innerHTML;
		} else {
			// Handle the case where DOMParser is not available (e.g., on the server)
			console.warn("DOMParser is not available. Returning empty string.");
			return "";
		}
	},
	createLeaderboardTable: async () => {
		const data = (await leaderboardAPI.getHunterList()).data.slice(0,5);
		// Create the table element
		const table = document.createElement("table");
		table.style.color = "rgb(0, 0, 0)";
		table.style.width = "100%";
		table.style.maxWidth = "100%";
		table.style.whiteSpace = "nowrap";
		table.style.fontFamily = "'Google Sans', Roboto, RobotoDraft, Helvetica, Arial, sans-serif";
		table.cellSpacing = "0";
		table.cellPadding = "0";

		// Create the thead element
		const thead = document.createElement("thead");
		const headerRow = document.createElement("tr");

		const headers = ["Hạng", "Hunter", ""];
		headers.forEach((headerText) => {
			const th = document.createElement("th");
			th.style.textAlign = headerText === "Hạng" ? "left" : "center";
			th.style.borderBottom = "1px solid rgb(237, 240, 241)";

			if (headerText === "Hạng") {
				th.style.width = "40px";
				th.style.minWidth = "40px";
			}

			th.textContent = headerText;
			headerRow.appendChild(th);
		});

		thead.appendChild(headerRow);
		table.appendChild(thead);

		// Create the tbody element
		const tbody = document.createElement("tbody");

		data.forEach((item, index) => {
			const row = document.createElement("tr");
			row.style.fontSize = index === 0 ? "1.2em" : index === 1 ? "1.1em" : "1em";

			// Rank cell
			const rankCell = document.createElement("td");
			rankCell.style.padding = "3px";
			rankCell.style.textAlign = "center";

			if (index < 3) {
				// For ranks 1, 2, and 3, use an image
				const img = document.createElement("img");
				img.title = `#${index + 1}`;
				img.src = `https://i.imgur.com/${utils.getImageId(index)}.jpg`; // Replace with your logic to get image ID
				img.width = 15;
				rankCell.appendChild(img);
			} else {
				// For ranks 4 and 5, use a div
				const rankDiv = document.createElement("div");
				rankDiv.style.width = "15px";
				rankDiv.style.height = "15px";
				rankDiv.style.lineHeight = "15px";
				rankDiv.style.margin = "0 auto";
				rankDiv.style.color = "rgb(255, 255, 255)";
				rankDiv.style.textAlign = "center";
				rankDiv.style.backgroundColor = "rgb(189, 189, 189)";
				rankDiv.style.borderRadius = "15px";
				rankDiv.textContent = (index + 1).toString(); // Use the ID as the rank number
				rankCell.appendChild(rankDiv);
			}

			row.appendChild(rankCell);

			// Name cell
			const nameCell = document.createElement("td");
			nameCell.style.textAlign = "center";
			nameCell.textContent = item.name;
			row.appendChild(nameCell);

			// Points cell
			const pointsCell = document.createElement("td");
			pointsCell.textContent = `${Math.floor(item.point/1000000)} Triệu`;
			row.appendChild(pointsCell);

			tbody.appendChild(row);
		});

		// Add a row for the "See all" link
		const seeAllRow = document.createElement("tr");
		seeAllRow.style.fontSize = "0.9em";

		const emptyCell = document.createElement("td");
		emptyCell.style.padding = "3px";
		emptyCell.style.textAlign = "center";
		seeAllRow.appendChild(emptyCell);

		const seeAllCell = document.createElement("td");
		seeAllCell.style.textAlign = "center";
		const seeAllLink = document.createElement("a");
		seeAllLink.href = "https://app.aniday.com/vi/jobs/leaderboard";
		seeAllLink.textContent = "Xem toàn bộ";
		seeAllCell.appendChild(seeAllLink);
		seeAllRow.appendChild(seeAllCell);

		tbody.appendChild(seeAllRow);
		table.appendChild(tbody);

		return table;
	},
};
