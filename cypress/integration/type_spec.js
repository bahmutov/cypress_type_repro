export function modal() {
  return cy.get(".ModalContainer");
}

export function popover() {
  return cy.get(".PopoverContainer.PopoverContainer--open");
}

describe("type repro", () => {
  let user = {
    first_name: "Damon",
    last_name: "Tester",
    email: "damon@tester.local",
    password: "12341234",
    group_ids: null,
  };

  before(() => {
    // Set up metabase if not already done
    cy.request("GET", "/api/session/properties").then(
      ({ body: properties }) => {
        if (properties["setup-token"]) {
          cy.request("POST", "/api/setup", {
            token: properties["setup-token"],
            user: user,
            prefs: {
              site_name: "Epic Team",
              allow_tracking: false,
            },
            database: null,
          }).then(() => {
            cy.visit("http://localhost:3000");
            cy.contains("Damon");
          });
        }
      }
    );
  });

  beforeEach(() => {
    cy.request("POST", "/api/session", {
      username: user.email,
      password: user.password,
    });
  });

  it.only("should allow for custom column formulas", () => {
    // go straight to "orders" in custom questions
    cy.visit("/question/new?database=1&table=2&mode=notebook");
    cy.get(".Icon-add_data").click();
    popover().within(() => {
      cy.wait(500)
      cy.get("[contenteditable='true']").type("1+1+1+1+1+1")
      cy.get('input.my1').click()
      // cy.findByPlaceholderText("Something nice and descriptive")
        // .click()
      //   .type("Simple math", { delay: 100 });
      // cy.findByText("Done").click();
    });
  });

  it.skip("should allow for custom column formulas", () => {
    // go straight to "orders" in custom questions
    cy.visit("/question/new?database=1&table=2&mode=notebook");
    cy.get(".Icon-add_data").click();
    popover().within(() => {
      cy.get("[contenteditable='true']").click().type("1 + 1", { delay: 100 });
      cy.get("[contenteditable='true']")
        .clear()
        .click()
        .type("1 + 1", { delay: 100 });
      cy.wait(1000);
      cy.findByPlaceholderText("Something nice and descriptive")
        .click()
        .type("Simple math", { delay: 100 });
      cy.findByPlaceholderText("Something nice and descriptive")
        .clear()
        .click()
        .type("Simple math", { delay: 100 });
      cy.findByText("Done").click();
    });
    cy.findByText("Visualize").click();
    cy.wait(2000);
    cy.findByText("Simple math");
  });
});
