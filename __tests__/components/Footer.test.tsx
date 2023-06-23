import React from 'react'
import { getAllByRole, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '@/components/Footer'

describe("Footer", () => {
  test("renders copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText("2023 Jakub Baran");
    expect(copyrightText).toBeInTheDocument();
  });

  test("renders GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/baranero"
    );
  });

  test("renders LinkedIn link", () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jakub-baran-42a00522b/"
    );
  });

  test("renders image attribution links", () => {
    render(<Footer />);
    const freepikLink = screen.getByRole("link", {
      name: /Image by Freepik/i,
    });
    const pexelsLink = screen.getByRole("link", {
      name: /Image added by Burak The Weekender/i,
    });

    expect(freepikLink).toBeInTheDocument();
    expect(freepikLink).toHaveAttribute(
      "href",
      "https://www.freepik.com/free-photo/top-view-desk-arrangement-with-notebook_16688666.htm#query=schedule%20draw&position=34&from_view=search&track=ais"
    );

    expect(pexelsLink).toBeInTheDocument();
    expect(pexelsLink).toHaveAttribute(
      "href",
      "https://www.pexels.com/pl-pl/zdjecie/czarny-niebieski-i-czerwony-wykres-ilustracja-186461/"
    );
  });

  test('hover styles on mouseover', () => {
    render(<Footer/>)

    const links = screen.getAllByRole('link')

    links.forEach(link => {
        link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

        expect(link).toHaveClass("hover:opacity-60");
    })

})

});
