'use server';
/**
 * @fileOverview An AI tool that generates a basic page structure and component outlines
 *               based on a description of the page's purpose and key sections.
 *
 * - generatePageBlueprint - A function that handles the page blueprint generation process.
 * - GeneratePageBlueprintInput - The input type for the generatePageBlueprint function.
 * - GeneratePageBlueprintOutput - The return type for the generatePageBlueprint function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePageBlueprintInputSchema = z.object({
  pageDescription: z.string().describe('A detailed description of the page\'s purpose and its key sections.'),
});
export type GeneratePageBlueprintInput = z.infer<typeof GeneratePageBlueprintInputSchema>;

const ComponentOutlineSchema = z.object({
  name: z.string().describe('The name of the component (e.g., HeroBanner, FeatureCard).'),
  description: z.string().describe('A brief description of the component\'s purpose and functionality.'),
  props: z.record(z.string(), z.string()).describe('A key-value pair object describing the component\'s expected props, where keys are prop names and values are their types (e.g., { headline: "string", imageUrl: "string" }).'),
});

const PageSectionSchema = z.object({
  id: z.string().describe('A unique identifier for the section (e.g., hero, about, features).'),
  title: z.string().describe('A human-readable title for the section.'),
  components: z.array(ComponentOutlineSchema).describe('An array of placeholder component outlines within this section.'),
});

const GeneratePageBlueprintOutputSchema = z.object({
  pageTitle: z.string().describe('A suggested title for the page.'),
  layout: z.array(z.string()).describe('An array of high-level layout elements for the page (e.g., "header", "sidebar", "main-content", "footer").'),
  sections: z.array(PageSectionSchema).describe('An array of detailed sections, each containing components.'),
});
export type GeneratePageBlueprintOutput = z.infer<typeof GeneratePageBlueprintOutputSchema>;

export async function generatePageBlueprint(input: GeneratePageBlueprintInput): Promise<GeneratePageBlueprintOutput> {
  return generatePageBlueprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePageBlueprintPrompt',
  input: { schema: GeneratePageBlueprintInputSchema },
  output: { schema: GeneratePageBlueprintOutputSchema },
  prompt: `You are an intelligent blueprinting AI tool. Your task is to generate a basic page structure and placeholder component outlines based on a user's description.

Reason through the provided 'pageDescription' to identify key sections and the types of components that would be appropriate for each section. For each component, provide a name, a brief description, and a list of essential props with their expected types.

Ensure the output strictly adheres to the JSON schema provided in the output description.

Page Description: {{{pageDescription}}}`,
});

const generatePageBlueprintFlow = ai.defineFlow(
  {
    name: 'generatePageBlueprintFlow',
    inputSchema: GeneratePageBlueprintInputSchema,
    outputSchema: GeneratePageBlueprintOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate page blueprint.');
    }
    return output;
  }
);
