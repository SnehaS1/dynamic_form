import React from "react";

// Define the types for the data received from the backend
type PaymentStatus = "onTime" | "delayed" | "overdue" | "grey";
export const paymentData: PaymentData[] = [
  {
    year: 2022,
    months: {
      Jan: "onTime",
      Feb: "onTime",
      Mar: "onTime",
      Apr: "onTime",
      May: "onTime",
      Jun: "onTime",
      Jul: "onTime",
      Aug: "onTime",
      Sep: "onTime",
      Oct: "onTime",
      Nov: "onTime",
      Dec: "onTime",
    },
  },
  {
    year: 2023,
    months: {
      Jan: "onTime",
      Feb: "onTime",
      Mar: "onTime",
      Apr: "onTime",
      May: "onTime",
      Jun: "overdue",
      Jul: "overdue",
      Aug: "onTime",
      Sep: "onTime",
      Oct: "onTime",
      Nov: "onTime",
      Dec: "onTime",
    },
  },
  {
    year: 2024,
    months: {
      Jan: "onTime",
      Feb: "delayed",
      Mar: "delayed",
      Apr: "onTime",
    },
  },
];
export interface PaymentData {
  year: number;
  months: { [month: string]: PaymentStatus }; // Keyed by month, e.g., Jan, Feb, etc.
}

interface PaymentGridProps {
  data: PaymentData[];
}

const statusColors: { [key in PaymentStatus]: string } = {
  onTime: "green",
  delayed: "orange",
  overdue: "red",
  grey: "grey",
};

const PaymentGrid: React.FC<PaymentGridProps> = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          {months.map((month) => (
            <th key={month}>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paymentData.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            {months.map((month) => {
              const status = yearData.months[month] || "grey"; // Default to grey if not provided
              return (
                <td
                  key={month}
                  style={{
                    backgroundColor: statusColors[status],
                    width: "50px",
                    height: "50px",
                  }}
                >
                  {/* Render visual indicators based on status */}
                  {status === "onTime" && <span>✔️</span>}
                  {status === "delayed" && <span>❌</span>}
                  {status === "overdue" && <span>⭕</span>}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentGrid;
