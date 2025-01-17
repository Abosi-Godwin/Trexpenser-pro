const config = {
    type: "bar",
    data: {
        labels: ["House Rent", "Emergency Fund", "Vacation Trip"],
        datasets: [
            {
                label: "Amount Saved",
                data: [150000, 75000, 50000], // Saved amounts
                backgroundColor: "rgba(75, 192, 192, 0.7)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            },
            {
                label: "Target Amount",
                data: [300000, 100000, 150000], // Target amounts
                backgroundColor: "rgba(192, 75, 75, 0.3)",
                borderColor: "rgba(192, 75, 75, 1)",
                borderWidth: 1
            }
        ]
    },
    options: {
        indexAxis: "y", // Horizontal bars
        scales: {
            x: {
                beginAtZero: true,
                max: 300000, // Adjust based on the highest target
                title: {
                    display: true,
                    text: "Amount (₦)"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Savings Goals"
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${
                            tooltipItem.dataset.label
                        }: ₦${tooltipItem.raw.toLocaleString()}`;
                    }
                }
            }
        }
    }
};
