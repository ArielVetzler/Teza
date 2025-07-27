import os
from typing import List

import google.generativeai as genai


class LLMIntegration:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file.")
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def extract_tags(self, text: str) -> List[str]:
        """Extracts relevant tags from the given text using the LLM."""
        try:
            prompt = f"Generate a comprehensive list of relevant and general tags for the following text. Consider all aspects, topics, and entities mentioned. Return them as a comma-separated list. Example: 'Tesla announces new battery' -> 'tesla, electric-vehicles, battery-tech, automotive, green-energy'. Only return the comma-separated list, no other text or formatting. Text: {text}"
            response = await self.model.generate_content_async(prompt)
            tags_str = response.text
            return [tag.strip() for tag in tags_str.split(',') if tag.strip()]

        except Exception as e:
            print(f"Error calling LLM: {e}. Falling back to rule-based extraction.")
            return self._fallback_extract_tags(text)

    def _fallback_extract_tags(self, text: str) -> List[str]:
        """A simple rule-based fallback for tag extraction if LLM fails."""
        # This could be more sophisticated, e.g., using regex or a small local model
        return [word for word in text.lower().split() if len(word) > 4 and word.isalpha()][:3]
