import { render, screen } from "@testing-library/react";
import Card from "./Card";

// Smoke Test: ensures the Card component renders without crashing
it("renders without crashing", function() {
  render(<Card caption="Test Caption" src="test1.com" currNum={1} totalNum={3} />);
  
  // Instead of toBeInTheDocument, we use Jest's toBeTruthy
  expect(screen.getByText("Test Caption")).toBeTruthy();
});

// Snapshot Test: ensures that the UI does not unexpectedly change
it("matches snapshot", function() {
  const { asFragment } = render(
    <Card caption="Test Caption" src="test1.com" currNum={1} totalNum={3} />
  );
  expect(asFragment()).toMatchSnapshot();
});
