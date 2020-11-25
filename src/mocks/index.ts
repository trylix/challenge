export const puppyOkResponse = {
  status: 200,
  response: {
    results: [
      {
        title: 'Vegetable-Pasta Oven Omelet',
        href:
          'http://find.myrecipes.com/recipes/recipefinder.dyn?action=displayRecipe&recipe_id=520763',
        ingredients:
          'tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper',
        thumbnail: 'http://img.recipepuppy.com/560556.jpg',
      },
    ],
  },
};

export const puppyBadRequestResponse = {
  status: 400,
  response: {},
};

export const puppyInvalidIngredientsResponse = {
  status: 200,
  response: {
    results: [],
  },
};
