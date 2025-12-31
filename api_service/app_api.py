from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import torch.nn.functional as F
from torchvision import models, transforms
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# -------------------------
# CONFIG
# -------------------------
DEVICE = torch.device("cpu")  # or "cuda" if GPU available
binary_classes = ["flooded", "non_flooded"]
severity_classes = ["moderate", "severe"]

image_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# -------------------------
# LOAD MODELS
# -------------------------
binary_model = models.resnet18(pretrained=False)
binary_model.fc = torch.nn.Linear(binary_model.fc.in_features, 2)
binary_model.load_state_dict(torch.load("models/flood_binary_resnet18.pth", map_location=DEVICE))
binary_model.eval()

severity_model = models.resnet18(pretrained=False)
severity_model.fc = torch.nn.Linear(severity_model.fc.in_features, 2)
severity_model.load_state_dict(torch.load("models/flood_severity_resnet18_weighted.pth", map_location=DEVICE))
severity_model.eval()

tokenizer = AutoTokenizer.from_pretrained("models/flood_text_model")
text_model = AutoModelForSequenceClassification.from_pretrained("models/flood_text_model")
text_model.eval()

# -------------------------
# FASTAPI INIT
# -------------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# PREDICTION FUNCTION
# -------------------------
def predict_flood(image: Image.Image, text_input: str):
    image_tensor = image_transform(image).unsqueeze(0)

    # Binary prediction
    with torch.no_grad():
        binary_logits = binary_model(image_tensor)
        binary_probs = F.softmax(binary_logits, dim=1)
        binary_idx = torch.argmax(binary_probs, dim=1).item()

    binary_label = binary_classes[binary_idx]
    binary_conf = binary_probs[0, binary_idx].item()

    if binary_label == "non_flooded":
        return {
            "final_result": "Non-Flooded",
            "confidence": binary_conf,
            "binary": binary_label
        }

    # Image severity
    with torch.no_grad():
        severity_logits = severity_model(image_tensor)
        severity_probs = F.softmax(severity_logits, dim=1)
        severity_idx = torch.argmax(severity_probs, dim=1).item()

    image_severity = severity_classes[severity_idx]
    image_conf = severity_probs[0, severity_idx].item()

    # Text severity
    inputs = tokenizer(text_input, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        text_logits = text_model(**inputs).logits
        text_probs = F.softmax(text_logits, dim=1)
        text_idx = torch.argmax(text_probs, dim=1).item()

    text_severity = severity_classes[text_idx]
    text_conf = text_probs[0, text_idx].item()

    # Fusion
    if image_severity == "severe" or text_severity == "severe":
        final_severity = "Severe"
        final_conf = max(image_conf, text_conf)
    else:
        final_severity = "Moderate"
        final_conf = max(image_conf, text_conf)

    return {
        "final_result": f"Flooded ({final_severity})",
        "confidence": final_conf,
        "binary": binary_label,
        "image_severity": image_severity,
        "text_severity": text_severity
    }

# -------------------------
# API ROUTE
# -------------------------
@app.post("/predict")
async def predict(
    image_file: UploadFile = File(...),
    description: str = Form(...)
):
    if not description.strip():
        return {"error": "Description is mandatory."}

    image = Image.open(io.BytesIO(await image_file.read())).convert("RGB")
    result = predict_flood(image, description)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app_api:app", host="0.0.0.0", port=8000, reload=True)
