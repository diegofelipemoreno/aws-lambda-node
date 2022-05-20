const getPizzas = require('../../handlers/get-pizzas');

const mocks = {
    pizzaId: 2,
    pizzaList: [
        {
            "id": 1,
            "name": "Capricciosa",
            "ingredients": [
              "tomato sauce", "mozzarella", "mushrooms", "ham", "olives"
            ]
          },
          {
            "id": 2,
            "name": "Quattro Formaggi",
            "ingredients": [
              "tomato sauce", "mozzarella", "parmesan cheese", "blue cheese", "goat cheese"
            ]
          },
    ]
}

describe('Pizza Api', () => {
    const {pizzaId, pizzaList} = mocks;

    describe('getPizza handler', () => {
        it('should get the pizza list', () => {
            expect(getPizzas(undefined, pizzaList)).toEqual(pizzaList);
        });

        it('should get the a pizza by id', () => {
            expect(getPizzas(pizzaId, pizzaList)).toEqual(pizzaList[1]);
        });

        it('should get an error, the pizza was not found', () => {
            expect(function(){ getPizzas(3, pizzaList); }).toThrow(new Error('The pizza you requested was not found'));
            expect(function(){ getPizzas(3, pizzaList); }).toThrow(new Error('The pizza you requested was not found'));
            expect(function(){ getPizzas(0, pizzaList); }).toThrow(new Error('The pizza you requested was not found'));
            expect(function(){ getPizzas(42, pizzaList); }).toThrow(new Error('The pizza you requested was not found'));
            expect(function(){ getPizzas('a', pizzaList); }).toThrow(new Error('The pizza you requested was not found'));
        });
    });
});