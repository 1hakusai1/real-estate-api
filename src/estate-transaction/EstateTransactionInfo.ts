import { GetEstateTransactionInfoRequest } from 'src/estate-transaction/GetEstateTransactionInfoRequest';
import { z } from 'zod';

export const EstateTransactionInfo = z.object({
  message: z.string().nullable(),
  result: z.intersection(
    GetEstateTransactionInfoRequest.omit({ year: true }),
    z.object({
      prefName: z.string(),
      cityName: z.string(),
      years: z.array(z.object({ year: z.number(), value: z.number() })),
    }),
  ),
});

export type EstateTransactionInfo = z.infer<typeof EstateTransactionInfo>;
