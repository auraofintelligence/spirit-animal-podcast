from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "artwork-source" / "cockpit" / "spirit-control-sheet-v1.png"
OUTPUT = ROOT / "public" / "assets" / "cockpit" / "icons"

NAMES = [
    "broadcast-beacon", "studio-mic", "keep-star", "scene-cut", "follow-tracks", "source-check",
    "animal-arrival", "values-compass", "wild-turn", "big-question", "leave-track", "reset",
    "moon-bell", "soft-cue", "wild-call", "heartbeat", "ocean-wash", "spark",
    "weather", "ferry", "yarn-circle", "art", "youth-voice", "celebration",
]

sheet = Image.open(SOURCE).convert("RGB")
cell_width = sheet.width // 6
cell_height = sheet.height // 4
OUTPUT.mkdir(parents=True, exist_ok=True)

for index, name in enumerate(NAMES):
    column = index % 6
    row = index // 6
    box = (
        column * cell_width,
        row * cell_height,
        (column + 1) * cell_width,
        (row + 1) * cell_height,
    )
    icon = sheet.crop(box)
    icon.save(OUTPUT / f"{name}.webp", "WEBP", quality=84, method=6)

print(f"Created {len(NAMES)} cockpit icons at {OUTPUT}")
