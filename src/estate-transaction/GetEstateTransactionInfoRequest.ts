import { z } from 'zod';

export const GetEstateTransactionInfoRequest = z.object({
  year: z.coerce.number().min(2009).max(2021),
  prefCode: z.coerce.number().min(1).max(47),
  cityCode: z.union([z.string().regex(/[0-9]+/), z.literal('-')]),
  displayType: z.union([
    z.literal('1'),
    z.literal('2'),
    z.literal('3'),
    z.literal('4'),
    z.literal('5'),
  ]),
});

export type GetEstateTransactionInfoRequest = z.infer<
  typeof GetEstateTransactionInfoRequest
>;
