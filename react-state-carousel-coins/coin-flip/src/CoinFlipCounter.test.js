import { render, fireEvent } from "@testing-library/react";
import CoinFlipCounter from "./CoinFlipCounter";

describe("CoinFlipCounter component", function() {
  // Mock Math.random to control the randomness
  beforeEach(function() {
    jest.spyOn(Math, "random")
      .mockReturnValueOnce(0.25) // First flip will be heads
      .mockReturnValueOnce(0.75); // Second flip will be tails
  });

  afterEach(function() {
    Math.random.mockRestore();
  });

  it("renders without crashing", function() {
    render(<CoinFlipCounter />);
  });

  it("displays no coin image when the page first loads", function() {
    const { container } = render(<CoinFlipCounter />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("updates text correctly for heads and tails", function() {
    const { getByText, getByAltText, queryByAltText } = render(<CoinFlipCounter />);
    
    // Flip the coin for the first time (heads)
    fireEvent.click(getByText("Flip Coin"));
    expect(getByAltText("heads")).toBeTruthy();
    expect(getByText(/1 heads and 0 tails/)).toBeInTheDocument();

    // Flip the coin for the second time (tails)
    fireEvent.click(getByText("Flip Coin"));
    expect(getByAltText("tails")).toBeTruthy();
    expect(getByText(/1 heads and 1 tails/)).toBeInTheDocument();
  });
});
