import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const PieChart = ({ title, importData }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (Array.isArray(importData) && importData.length > 0) {
			const updatedData = [];

			importData.forEach((item) => {
				let duplicate = updatedData.find((duplicate) => duplicate.category === item.category);
				if (duplicate) {
					duplicate.amount = parseFloat(duplicate.amount) + parseFloat(item.amount);
				} else {
					updatedData.push({ ...item });
				}
			});
			console.log(updatedData);
			setData(updatedData);
		}
	}, [importData]);

	const chartData = {
		labels: data.map((expense) => expense.category),
		datasets: [
			{
				label: "Amount",
				data: data.map((expense) => expense.amount), // Sample data
				backgroundColor: ["#a7eba0", "#f86c63", "#6193bd"], // Different colors for each bar
				borderWidth: 0,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<div className="chart-container">
			<div className="chart-title">{title}</div>
			<Pie data={chartData} options={chartOptions} />
		</div>
	);
};

export default PieChart;
