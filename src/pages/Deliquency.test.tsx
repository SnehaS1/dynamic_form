import { render, screen } from "@testing-library/react";
import PaymentGrid, { PaymentData } from "./Deliquency";

const mockData: any = [
  {
    year: 2023,
    months: {
      Jan: "onTime",
      Feb: "onTime",
      Mar: "overdue",
      Apr: "delayed",
    },
  },
];

describe("PaymentGrid Component", () => {
  it("should render the correct number of rows and cells", () => {
    render(<PaymentGrid data={mockData} />);

    // Check if the year 2023 is displayed
    expect(screen.getByText("2023")).toBeInTheDocument();

    // Check if the correct number of columns is rendered (12 months + year column)
    const columns = screen.getAllByRole("columnheader");
    expect(columns).toHaveLength(13); // 12 months + 1 year column

    // Check if 'onTime', 'delayed', 'overdue' statuses are rendered correctly
    expect(screen.getByText("✔️")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();
    expect(screen.getByText("⭕")).toBeInTheDocument();
  });
});
