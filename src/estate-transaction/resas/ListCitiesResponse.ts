import { z } from 'zod';

export const ListCitiesResponse = z.object({
  message: z.string().nullable(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      cityCode: z.string().regex(/[0-9]+/),
      cityName: z.string(),
      bigCityFlag: z.union([
        z.literal('0'),
        z.literal('1'),
        z.literal('2'),
        z.literal('3'),
      ]),
    }),
  ),
});

type ListCitiesResponse = z.infer<typeof ListCitiesResponse>;
