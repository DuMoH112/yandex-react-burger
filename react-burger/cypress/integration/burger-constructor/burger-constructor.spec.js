describe('Make order', function () {
    before(function () {
        cy.visit('http://localhost:3000');
    })

    // ----------------------Filling cart----------------------
    it('should be available on localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });

    it('should add bun', function () {
        cy.get('div').contains('Булки').parent().parent().parent().find('li').first().as('bun')
        cy.get('[class^=burger-constructor_root__]').first().as('burgerConstructor');
        cy.get('@bun').trigger('dragstart')
        cy.get('@burgerConstructor').trigger('drop');
        cy.get('@bun').find('span').first().should(($p) => {
            expect($p.text().trim()).equal("2");
        });
        cy.get('@burgerConstructor').find('[class^=burger-constructor_item__]').should('have.length', 2);
    })

    it('should add sauce', function () {
        cy.get('div').contains('Соусы').parent().click().parent().parent().find('li').first().as('sauce')
        cy.get('[class^=burger-constructor_root__]').first().as('burgerConstructor');
        cy.get('[class^=burger-constructor_scrollable__]').as('burgerConstructorScrollable');
        cy.get('@sauce').trigger('dragstart')
        cy.get('@burgerConstructor').trigger('drop');
        cy.get('@sauce').find('span').first().should(($p) => {
            expect($p.text().trim()).equal("1");
        });
        cy.get('@burgerConstructor').find('[class^=burger-constructor_item__]').should('have.length', 2);
        cy.get('@burgerConstructorScrollable').find('[class^=burger-constructor-item_item__]').should('have.length', 1);
    })

    it('should add filling', function () {
        cy.get('div').contains('Начинки').parent().click().parent().parent().find('li').first().as('filling')
        cy.get('[class^=burger-constructor_root__]').first().as('burgerConstructor');
        cy.get('[class^=burger-constructor_scrollable__]').as('burgerConstructorScrollable');
        cy.get('@filling').trigger('dragstart')
        cy.get('@burgerConstructor').trigger('drop');
        cy.get('@filling').find('span').first().should(($p) => {
            expect($p.text().trim()).equal("1");
        });
        cy.get('@burgerConstructor').find('[class^=burger-constructor_item__]').should('have.length', 2);
        cy.get('@burgerConstructorScrollable').find('[class^=burger-constructor-item_item__]').should('have.length', 2);
    })
    // --------------------------------------------------------

    // ----------------------Create order----------------------
    it('should add filling', function () {
        cy.get('[class^=burger-constructor_root__]').first().as('burgerConstructor').get('button').click();
    })
    // --------------------------------------------------------

    // --------------------------Auth--------------------------
    it('should authorization', function () {
        cy.get('form').as('form');
        cy.get('@form').get('[type^=email]').type('wosow46312@nabajin.com')
        cy.get('@form').get('[type^=password]').type('AutoTest123')
        cy.get('@form').get('button').click()
    })
    // --------------------------------------------------------

    // ----------------------Create order----------------------
    it('should add filling', function () {
        cy.get('[class^=burger-constructor_root__]').first().as('burgerConstructor').get('button').click();
    })
    // --------------------------------------------------------
    
}); 