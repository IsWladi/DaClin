describe("Login test e2e", () => {
  it("getting happy login", () => {

    cy.visit("http://localhost:8100/login");

    cy.get("#inp-username") // Selecciona el elemento por su ID
      .type("dev") // Escribe el texto deseado en el input
      .should("have.value", "dev"); // Verifica que el valor del input sea el esperado

    cy.get("#inp-password") // Selecciona el elemento por su ID
      .type("123456") // Escribe el texto deseado en el input
      .should("have.value", "123456"); // Verifica que el valor del input sea el esperado

    cy.get("#btn-login")
      .click()
    //delay para arreglar el bug de que la primera vez no redirige
    cy.wait(4000);

    cy.url().should("eq", "http://localhost:8100/tabs/tabs/tab1");
  });

  it("getting happy login with save credentials and close sesion", () => {
    cy.visit("http://localhost:8100/login");

    cy.get("#inp-username") // Selecciona el elemento por su ID
      .type("dev") // Escribe el texto deseado en el input
      .should("have.value", "dev"); // Verifica que el valor del input sea el esperado

    cy.get("#inp-password") // Selecciona el elemento por su ID
      .type("123456") // Escribe el texto deseado en el input
      .should("have.value", "123456"); // Verifica que el valor del input sea el esperado

    // mantenerse conectado
    cy.get("#chbx-save").click(); // Simula el clic en la casilla de verificación

    cy.get("#btn-login")
      .click()
      .url()
      .should("eq", "http://localhost:8100/tabs/tabs/tab1"); // verifica que el login se haga sin problemas

    // verificar que se haya guardado el id de usuario
    cy.window()
      .its("localStorage.userId")
      .should("eq", "649875976654db375524b477");

    // cerrar sesion
    cy.get("#btn-cerrarSesion").click();

    // verificar que se haya borrado el id de usuario
    cy.window().its("localStorage.userId").should("eq", undefined);
  });

  // verifica que no inicie sesion con credenciales incorrectas
  it("getting sad login", () => {
    cy.visit("http://localhost:8100/login");

    cy.get("#inp-username") // Selecciona el elemento por su ID
      .type("fakeAccount") // Escribe el texto deseado en el input
      .should("have.value", "fakeAccount"); // Verifica que el valor del input sea el esperado

    cy.get("#inp-password") // Selecciona el elemento por su ID
      .type("123456") // Escribe el texto deseado en el input
      .should("have.value", "123456"); // Verifica que el valor del input sea el esperado

    cy.get("#btn-login")
      .click()
      .url()
      .should("eq", "http://localhost:8100/login"); // verifica que el login no se haga por que el usuario no existe
  });
});
