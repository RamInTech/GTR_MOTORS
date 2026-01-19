'use server';

/**
 * @fileOverview AI-powered part finder flow.
 *
 * - aiPartFinder - A function that handles the part identification and suggestion process.
 * - AiPartFinderInput - The input type for the aiPartFinder function.
 * - AiPartFinderOutput - The return type for the aiPartFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPartFinderInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a car part, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AiPartFinderInput = z.infer<typeof AiPartFinderInputSchema>;

const AiPartFinderOutputSchema = z.object({
  partIdentification: z.string().describe('The identified car part.'),
  suggestedParts: z.array(z.string()).describe('Suggested matching parts from the catalog.'),
});
export type AiPartFinderOutput = z.infer<typeof AiPartFinderOutputSchema>;

export async function aiPartFinder(input: AiPartFinderInput): Promise<AiPartFinderOutput> {
  return aiPartFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPartFinderPrompt',
  input: {schema: AiPartFinderInputSchema},
  output: {schema: AiPartFinderOutputSchema},
  prompt: `You are an expert automotive part identifier.

You will use the provided image of a car part to identify the part and suggest matching parts from a catalog.

Analyze the following image to identify the car part and suggest matching parts:

Image: {{media url=photoDataUri}}

Return the partIdentification and suggestedParts. suggestedParts should be an array of part names. Part names should be descriptive.
`,
});

const aiPartFinderFlow = ai.defineFlow(
  {
    name: 'aiPartFinderFlow',
    inputSchema: AiPartFinderInputSchema,
    outputSchema: AiPartFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
