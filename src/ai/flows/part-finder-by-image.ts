'use server';
/**
 * @fileOverview This file defines a Genkit flow for identifying auto parts from an image.
 *
 * The flow takes an image of a car part as input and uses AI to identify the part
 * and suggest matching parts from a catalog.
 *
 * @exports `partFinderByImage` - The main function to initiate the part finding process.
 * @exports `PartFinderByImageInput` - The input type for the `partFinderByImage` function.
 * @exports `PartFinderByImageOutput` - The output type for the `partFinderByImage` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PartFinderByImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a car part, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'\'\'data:<mimetype>;base64,<encoded_data>\'\'\'.' // keep the single quotes in the expected format
    ),
});
export type PartFinderByImageInput = z.infer<typeof PartFinderByImageInputSchema>;

const PartFinderByImageOutputSchema = z.object({
  identifiedPart: z.string().describe('The identified car part.'),
  suggestedParts: z.array(z.string()).describe('Suggested matching parts from the catalog.'),
});
export type PartFinderByImageOutput = z.infer<typeof PartFinderByImageOutputSchema>;

export async function partFinderByImage(input: PartFinderByImageInput): Promise<PartFinderByImageOutput> {
  return partFinderByImageFlow(input);
}

const partFinderByImagePrompt = ai.definePrompt({
  name: 'partFinderByImagePrompt',
  input: {schema: PartFinderByImageInputSchema},
  output: {schema: PartFinderByImageOutputSchema},
  prompt: `You are an AI assistant that specializes in identifying car parts from images.
  Based on the image provided, identify the car part and suggest matching parts from the catalog.

  Here is the image of the car part: {{media url=photoDataUri}}

  Return the identified part and suggested parts in the format specified in the output schema.
  `,
});

const partFinderByImageFlow = ai.defineFlow(
  {
    name: 'partFinderByImageFlow',
    inputSchema: PartFinderByImageInputSchema,
    outputSchema: PartFinderByImageOutputSchema,
  },
  async input => {
    const {output} = await partFinderByImagePrompt(input);
    return output!;
  }
);
