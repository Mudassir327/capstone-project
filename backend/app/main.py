from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Scientific Claim Critique Platform",
    description="Backend API for scientific claim analysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ClaimRequest(BaseModel):
    claim: str


@app.get("/")
def root():
    return {
        "message": "Scientific Claim Critique Platform API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/api/claims/analyze")
def analyze_claim(request: ClaimRequest):

    return {
        "claim": request.claim,
        "verdict": "Partially Supported",
        "confidence": 78,
        "critique": (
            "The claim points to a measurable trend, but its effect "
            "depends on the development task, team experience, and "
            "how productivity is measured."
        ),
        "reason": (
            "Current evidence suggests improvements for some software "
            "development tasks, but the evidence is not sufficient to "
            "support an unconditional claim."
        ),
        "evidence": [
            {
                "quote": "Sample supporting evidence will appear here.",
                "title": "Sample Research Paper",
                "authors": "Research Authors",
                "year": "2023",
                "source": "Research Database"
            }
        ]
    }