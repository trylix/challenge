import { Injectable } from '@decorators/di';
import { Controller, Get, Query, Response } from '@decorators/express';
import * as express from 'express';
import { HttpException } from 'src/exceptions';

import { RecipeService } from './recipe.service';

@Injectable()
@Controller('/recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('/')
  async getData(
    @Query('i') ingredients: string,
    @Response() res: express.Response,
  ) {
    try {
      const recipes = await this.recipeService.makeRecipeList(ingredients);

      res.status(200).json(recipes);
    } catch (error) {
      if (error instanceof HttpException) {
        const httpException = error as HttpException;

        res
          .status(httpException.statusCode)
          .json(httpException.getErrorResponse());
      }
    }
  }
}
