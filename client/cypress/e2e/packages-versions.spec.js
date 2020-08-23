describe("Retrieve packages and versions", () => {
  it("can retrieve a list of packages, select React and display versions data", () => {
    cy.visit("/");
    cy.findByRole("heading", { name: /DAVIDPHOEBIA/i });
    cy.findByLabelText("Search Term").type("react");
    cy.findByRole("listitem", { name: "react" }).click();
    cy.findByText("BUNDLE 6449 bytes").should("exist");
    cy.findByText("16.13.1").should("exist");
    cy.findByText("16.13.0").should("exist");
    cy.findByText("17.0.0-rc.0").should("exist");
  });

  it("can retrieve a list of packages and select Redux and display versions data", () => {
    cy.visit("/");
    cy.findByRole("heading", { name: /DAVIDPHOEBIA/i });
    cy.findByLabelText("Search Term").type("red");
    cy.findByRole("listitem", { name: "redux" }).click();
    cy.findByText("BUNDLE 7463 bytes").should("exist");
    cy.findByText("3.7.2").should("exist");
    cy.findByText("4.0.3").should("exist");
    cy.findByText("4.0.4").should("exist");
    cy.findByText("4.0.5").should("exist");
  });
});
