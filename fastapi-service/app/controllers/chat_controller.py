from fastapi import HTTPException
import openai

async def generate_response(prompt: str):
    try:
        response = openai.chat.completions.create(
            model="omni-moderation-latest",
            messages=[{"role": "user", "content": prompt}]
        )
        generated_text = response.choices[0].message.content
        
        return {"response": generated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))