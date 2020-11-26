import { Exclude, Expose, Transform } from 'class-transformer';
import { formatString, transformToArray } from 'src/shared/utils';

export class RecipeDto {
  @Expose()
  @Transform((value) => formatString(value))
  title: string;

  @Expose()
  @Transform((value) => transformToArray(value))
  ingredients: string[];

  @Expose({ name: 'href' })
  link: string;

  @Exclude()
  thumbnail: string;

  @Expose()
  gif: string;
}
