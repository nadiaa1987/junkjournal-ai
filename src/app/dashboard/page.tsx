"use client";
export const runtime = 'edge';

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
// ─────────────────────────────────────────────
// STYLE PRESETS — Inspired by BowArts Etsy Shop
// ─────────────────────────────────────────────
interface JournalStyle {
  id: string;
  label: string;
  emoji: string;
  accentColor: string;
  info: string;
  promptTemplate: (topic: string, seed: number) => string;
  suggestions: string[];
  customPrompt?: string; // New field to store raw prompt for custom styles
}

const JOURNAL_STYLES: JournalStyle[] = [
  {
    id: "watercolor-garden",
    label: "Watercolor Garden",
    emoji: "🌸",
    accentColor: "#c6a4b0",
    info: "Generates soft, shabby chic watercolor illustrations. Best for nature scenes, whimsical buildings, and vintage garden elements.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Watercolor Whimsical Garden" style.
      Theme: "${topic}".
      Style: Soft watercolor illustration, cottagecore aesthetic, delicate brushstrokes, shabby chic, whimsical, dreamy and nostalgic.
      Colors: Soft pastel palette (sage green, dusty rose, creamy beige, sky blue).
      Elements: watercolor flowers, rustic wooden textures, stone walls, whimsical garden scenes, birdbaths, clotheslines.
      Format: Full-page edge-to-edge illustration, A4 printable, high artistic quality. Under 65 words. Seed:${seed}`,
    suggestions: ["Cottage Garden", "Stone Bridge", "Vintage Mailbox", "Whimsical Archway"],
  },

  {
    id: "boho-spring-blue",
    label: "Boho Spring Blue",
    emoji: "🫐💙",
    accentColor: "#5b8fbd",
    info: "Creates serene Mediterranean and coastal vibes with blue-plaster walls, terracotta, and sunflowers.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Boho Spring Blue Vintage" style.
      Theme: "${topic}".
      Style: Soft romantic watercolor illustration with vintage grain texture. Mediterranean / Provençal / Greek boho aesthetic — serene, airy, nostalgic and timeless.
      Colors: Dominant palette of cornflower blue, dusty steel blue, teal, slate blue, aged blue-grey plaster — accented with warm cream, terracotta, soft sage green, sandy beige, and pops of orange blossom or sunflower yellow.
      Scenes & settings (choose fitting ones): weathered blue-plaster walls, stone arched doorways opening to valley views, cobblestone pathways by the sea, checkerboard or Moroccan tile floors, blue painted wooden doors with terracotta flower pots, coastal village rooftops, garden with stone fountain, wicker chair against blue wall, wooden swing in a leafy garden.
      Objects & botanicals: blue ceramic pitchers/jugs with white blossoms, mason jars with daisies, teal glass bottles with floral motifs, wooden rocking chair with straw hat, kitchen shelves with white ceramic jars, spice jars, watering can with garden tools, blue wine bottle with grapes, seashells on sandy beach, wooden kitchen utensils, terracotta pots with climbing vines.
      Nature: sunflowers, white jasmine or cherry blossoms, wildflowers, lush green trailing vines on stone arches, orange blossom branches on blue backgrounds.
      Format: Full-page serene watercolor illustration, A4 printable, high artistic quality. Under 80 words. Seed:${seed}`,
    suggestions: ["Blue Door Garden", "Coastal Village", "Mediterranean Kitchen", "Stone Arch & Roses"],
  },
  {
    id: "vintage-cookbook",
    label: "Vintage Cookbook",
    emoji: "📖🍰",
    accentColor: "#c4874a",
    info: "Creates detailed farmhouse kitchen aesthetic images layered over handwritten cursive recipes.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Vintage Cookbook" style.
      Theme: "${topic}".
      Style: Warm romantic watercolor illustration layered over aged handwritten cursive recipe manuscript background. Nostalgic farmhouse kitchen aesthetic, antique cookbook feel, rich and detailed still-life composition.
      Colors: Warm sepia, aged cream, burnt sienna, soft golden brown, terracotta, warm ivory — tea-stained throughout.
      Food & ingredients (choose fitting ones): pancakes with berries, rustic bread loaves with butter, croissants, layered cakes with roses, fruit pies on lace doilies, roasted turkey/chicken with herbs, lemon tarts, fresh fruits, jam jars, chocolates, honey jars, vegetables in baskets.
      Kitchen objects: mason jars, cast iron skillet, ceramic pitchers, silver measuring spoons, mortar & pestle, spice tins, wine and dessert glasses, scales, kitchen whisks and utensils, candles, copper pots.
      Botanicals: sprigs of rosemary, lavender, thyme, wildflowers scattered around.
      Texture: dense handwritten cursive recipe text fills the background on aged parchment, with tea stains and worn edges.
      Format: Full-page richly layered illustration, A4 printable, high artistic quality. Under 75 words. Seed:${seed}`,
    suggestions: ["Sunday Baking", "Harvest Kitchen", "French Patisserie", "Rustic Bread & Herbs"],
  },
  {
    id: "whimsical-houses",
    label: "Whimsical Houses",
    emoji: "🏡✨",
    accentColor: "#8b6fc4",
    info: "Magical and vibrant fairy-tale house concepts lit by lanterns and stars.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page featuring a "Whimsical Fairy-Tale House" illustration.
      Theme: "${topic}".
      Style: Vibrant, saturated watercolor painting, fantastical and imaginative, storybook illustration, magical and dreamlike, full of wonder and whimsy.
      Colors: Rich jewel tones and rainbow pastels — candy pink, violet, turquoise, sunflower yellow, emerald green, deep navy night sky, warm golden glow from windows.
      House types (pick fitting one): cupcake house, mushroom house, treehouse with spiral staircase, balloon-lifted cottage, house built on a snail shell, castle tower wrapped in ivy, shoe house, house inside a giant flower, enchanted forest cottage, cloud castle, candy-striped house, house lit by fireflies and lanterns.
      Magical elements: glowing windows, stone pathways, swirling chimneys, floating lanterns, giant sunflowers, fireflies, star-filled night sky, crescent moon, enchanted forest, butterflies, heart decorations, swirls and curls.
      Format: Full-page vibrant illustration, A4 printable, highly detailed and magical. Under 70 words. Seed:${seed}`,
    suggestions: ["Mushroom Cottage", "Balloon House", "Treehouse Night", "Candy Castle"],
  },
  {
    id: "shabby-chic-rose",
    label: "Shabby Chic Rose",
    emoji: "🌹",
    accentColor: "#d4849a",
    info: "Feminine, delicate vintage collage with blush pink roses, lace, and letters.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Shabby Chic Rose" style.
      Theme: "${topic}".
      Style: Soft romantic watercolor illustration layered over aged handwritten cursive script paper background. Shabby chic, feminine, nostalgic, distressed and delicate.
      Colors: Blush pink, dusty rose, antique cream, soft teal/mint, warm ivory, faded peach, parchment beige.
      Elements (choose fitting ones for the theme): pink watercolor roses, lace doilies, handwritten vintage letters & envelopes, ornate keys, vintage scissors, perfume bottles, teapots with roses, stacked old books, songbirds, flickering candles, gilded mirrors, mason jars with roses, apothecary bottles, butterfly on envelope with wax seal, pocket watches, iron lanterns, shuttered windows with climbing roses, ribbon-tied love letters, rose-framed oval frames.
      Texture: aged parchment paper with faint cursive script overlay, soft tea staining, torn paper edges.
      Format: Full-page richly layered collage illustration, A4 printable, high artistic quality. Under 70 words. Seed:${seed}`,
    suggestions: ["Rose Tea Set", "Vintage Letters", "Secret Garden Key", "Perfume & Roses"],
  },
  {
    id: "majestic-wild",
    label: "Majestic & Wild",
    emoji: "🐴",
    accentColor: "#6b7fa3",
    info: "Sweeping, dramatic landscape and animal scenes inspired by romantic realism.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Majestic Wild Nature" style.
      Theme: "${topic}".
      Style: Grand, painterly, impressionistic nature scene, dramatic lighting, romantic realism, National Geographic meets watercolor.
      Colors: Rich earth tones, deep forest greens, golden hour amber, storm grey, twilight purples.
      Elements: wild horses, majestic animals, open meadows, misty forests, dramatic skies, flowing water, ancient trees.
      Format: Full-page sweeping landscape illustration, A4 printable, high artistic quality. Under 65 words. Seed:${seed}`,
    suggestions: ["Wild Horses", "Forest Deer", "Mountain Eagles", "Misty Meadow"],
  },
  {
    id: "garden-cottage",
    label: "Garden Cottage",
    emoji: "🏡",
    accentColor: "#9eb87e",
    info: "Cozy, handmade cottagecore aesthetics featuring rustic pastels and garden props.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Garden Cottage / Cottagecore" style.
      Theme: "${topic}".
      Style: Warm and cozy cottagecore, vintage cottage aesthetic, rustic pastels, handmade and homeopathic.
      Colors: Butter yellow, blush pink, mint green, lavender, warm linen white.
      Elements: flower boxes, birdhouses, picket fences, jam jars, doilies, herb gardens, stone pathways, climbing ivy, wooden gates.
      Format: Full-page illustration, A4 printable, charming and detailed. Under 65 words. Seed:${seed}`,
    suggestions: ["Herb Garden", "Cozy Porch", "Flower Window Box", "Garden Gate"],
  },
  {
    id: "classic-neutral",
    label: "Classic Neutral",
    emoji: "🦢",
    accentColor: "#a09387",
    info: "Timeless elegance using script, mono sketches, stamps, and neutral palettes.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Classic Beige & Grey Vintage" style.
      Theme: "${topic}".
      Style: Timeless, elegant, neutral vintage aesthetic, sophisticated scrapbook, editorial feel with aged patina.
      Colors: Warm beige, classic grey, off-white, aged cream, soft charcoal, pale taupe.
      Elements: script typography, architectural sketches, vintage postage stamps, monograms, aged lace, damask patterns, French script, ornate filigree.
      Format: Full-page elegant collage, A4 printable, refined and detailed. Under 65 words. Seed:${seed}`,
    suggestions: ["French Script", "Monogram Florals", "Vintage Stamps", "Elegant Damask"],
  },
  {
    id: "valentines-day",
    label: "Valentine's Day",
    emoji: "💌🌹",
    accentColor: "#e04c64",
    info: "Delicate flat seamless patterns with scattered romantic hearts and roses.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Valentine's Day Watercolor Pattern" style.
      Theme: "${topic}".
      Style: Flat 2D seamless pattern layout, all-over print design, delicate watercolor painting, shabby chic romantic aesthetic, wrapping paper style, evenly distributed motifs with no single central focal point.
      Background: Cream, warm ivory, soft pastel pink watercolor wash, or faint vintage paper texture.
      Motifs (incorporate based on theme): densely scattered watercolor hearts, delicate branching vines with leaves shaped like hearts, lush bloomed red and pink roses, heart-shaped floral wreaths, hand-painted hearts with stitched details, vertical pink stripes.
      Palette: Bright cherry red, soft blush pink, pale rose, deep crimson, warm cream, accented with soft sage green leaves and occasional dusty denim blue or warm ochre details.
      Format: Edge-to-edge continuous flat pattern illustration for scrapbooking, high artistic quality. Under 80 words. Seed:${seed}`,
    suggestions: ["Branches with Heart Leaves", "Scattered Seamless Hearts", "Vintage Red Roses", "Pink Stripes & Hearts"],
  },
  {
    id: "gardening-cottage",
    label: "Gardening",
    emoji: "🪴🧺",
    accentColor: "#7d9c6c",
    info: "Highly detailed watercolor scenes of vintage gardening activities and props.",
    promptTemplate: (topic, seed) =>
      `Create a detailed image description for a junk journal page in a "Vintage Cottagecore Gardening" style.
      Theme: "${topic}".
      Style: Soft, detailed, shabby chic watercolor illustration, nostalgic and romantic cottage garden aesthetic. Looks like a hand-painted scene on vintage paper.
      Scenes & Elements: stone steps covered in ivy, wicker baskets filled with yarn or flowers, weathered wooden arches or pergolas, blue rustic doors, vintage watering cans with daisies, birdbaths surrounded by lavender, wooden wheelbarrows overflowing with tulips, rustic wooden benches, stone bridges over streams, birdhouses on tables, potted plants, old wooden ladders leaning against picket fences.
      Colors: Soft natural greens, earthy wooden browns, dusty pinks, pastel lavenders, cornflower blues, and warm sunlight tones.
      Format: Full-page high artistic quality illustration, beautiful garden scene for scrapbooking, A4 printable. Under 80 words. Seed:${seed}`,
    suggestions: ["Wicker Basket & Watering Can", "Stone Steps with Ivy", "Vintage Birdbath", "Wooden Ladder Garden"],
  },
];

// ─────────────────────────────────────────────

interface GeneratedItem {
  id: number;
  prompt: string;
  imageUrl: string;
  regenerating?: boolean;
}

export default function Home() {
  const { deductCredits, addCredits, user, expirationDate, loading: authLoading } = useAuth();
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<"square" | "a4">("a4");
  const [activeStyleId, setActiveStyleId] = useState(JOURNAL_STYLES[0].id);
  const [items, setItems] = useState<GeneratedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);

  const [customStyles, setCustomStyles] = useState<JournalStyle[]>([]);
  const [showAddStyleModal, setShowAddStyleModal] = useState(false);
  const [showStyleInfoModal, setShowStyleInfoModal] = useState(false);
  const [newStyleForm, setNewStyleForm] = useState({ label: '', emoji: '✨', info: '', prompt: '', suggestions: [] as string[] });
  const [imageLink, setImageLink] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [activeEditId, setActiveEditId] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <p className="handwritten" style={{ fontSize: '1.5rem' }}>Opening the journal... 🕯️</p>
      </div>
    );
  }

  if (!user) return null;

  useEffect(() => {
    const saved = localStorage.getItem('junk-journal-custom-styles');
    if (saved) {
      try {
        setCustomStyles(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse customs styles");
      }
    }
  }, []);

  const allStyles = [...JOURNAL_STYLES, ...customStyles];
  const activeStyle = allStyles.find(s => s.id === activeStyleId) || allStyles[0];

  const handleAnalyzeImage = async (url: string) => {
    if (!url) return;

    if (!user) {
      alert("Please sign in to analyze images.");
      return;
    }

    const hasEnough = await deductCredits(60);
    if (!hasEnough) return;

    setAnalyzing(true);
    setToastMessage("AI is analyzing your image link... 👁️ (-60 credits)");
    try {
      const systemPrompt = `You are an expert art analyst for junk journals. Look at the provided image and extract its core aesthetic details.
      Return ONLY a JSON object with these exact keys:
      {
        "name": "A short, catchy name for this style (2-4 words)",
        "emoji": "One or two relevant emojis",
        "prompt": "An exhaustive, highly detailed description of the art style, medium, lighting, color palette, and artistic techniques (under 100 words). Include every visual nuance.",
        "elements": "A comma-separated list of all characters, objects, and specific elements visible in the image (e.g., 'vintage teapot, dried roses, old script')."
      }`;

      const payload = {
        model: "openai",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: systemPrompt },
              { type: "image_url", image_url: { url: url } }
            ]
          }
        ]
      };

      const res = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_brPwHCxsHNPBfUG1dkoGRWawPgOcoR51"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const data = await res.json();
      const responseText = data.choices?.[0]?.message?.content;

      if (responseText) {
        try {
          // Extract JSON if AI wrapped it in markdown
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);

          const elementsList = parsed.elements ? parsed.elements.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0) : [];

          setNewStyleForm({
            label: parsed.name || "",
            emoji: parsed.emoji || "✨",
            prompt: parsed.prompt || "",
            info: parsed.elements ? `Try: ${parsed.elements}` : "Style automatically extracted from your reference link.",
            suggestions: elementsList
          });
          setToastMessage("Style analyzed & details extracted! ✨");
          setImageLink('');
        } catch (e) {
          // Fallback if parsing fails
          setNewStyleForm(prev => ({
            ...prev,
            prompt: responseText.trim(),
            info: "Style automatically extracted from your reference link.",
            suggestions: []
          }));
          setToastMessage("Style extracted! 🎨");
          setImageLink('');
        }
      }
    } catch (error) {
      console.error("Vision API error:", error);
      setToastMessage("Failed to analyze image link. ❌ Check the link or API key.");
    } finally {
      setAnalyzing(false);
    }
  };


  const handleCreateCustomStyle = () => {
    if (!newStyleForm.label || !newStyleForm.prompt) return;
    const newStyle: JournalStyle = {
      id: "custom-" + Date.now(),
      label: newStyleForm.label,
      emoji: newStyleForm.emoji || "🖌️",
      accentColor: "#a37c5b",
      info: newStyleForm.info || "A custom art style generated by you.",
      promptTemplate: (topic, seed) => `Create a detailed image description for a junk journal page in a "${newStyleForm.label}" style.\nTheme: "${topic}".\nStyle: ${newStyleForm.prompt}\nFormat: Full-page, A4 printable. High artistic quality. Seed:${seed}`,
      suggestions: newStyleForm.suggestions.length > 0 ? newStyleForm.suggestions : ["My Custom Idea"],
      customPrompt: newStyleForm.prompt // Save the raw prompt
    };

    const updated = [...customStyles, newStyle];
    setCustomStyles(updated);
    localStorage.setItem('junk-journal-custom-styles', JSON.stringify(updated));
    setActiveStyleId(newStyle.id);
    setShowAddStyleModal(false);
    setNewStyleForm({ label: '', emoji: '✨', info: '', prompt: '', suggestions: [] });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success") && query.get("session_id")) {
      fetch("/api/stripe/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: query.get("session_id") })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.credits && data.userId) {
            addCredits(data.credits, data.userId);
            setToastMessage(`Success! ✨ ${data.credits} credits have been magically added to your account.`);
            setTimeout(() => setToastMessage(null), 5000); // Hide after 5 seconds
          }
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch((error) => {
          if (error.name === "AbortError") return;
          console.error("Verification error:", error);
        });
    }
    if (query.get("canceled")) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [addCredits]);

  const getResolution = () => ({
    width: format === "square" ? 1024 : 896,
    height: format === "square" ? 1024 : 1280,
  });

  const buildImageUrl = (prompt: string, w: number, h: number) => {
    // Combine timestamp + random to guarantee a unique seed every call
    const seed = Math.floor((Date.now() + Math.random() * 1000000) % 9999999);
    return `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&model=flux&key=sk_brPwHCxsHNPBfUG1dkoGRWawPgOcoR51`;
  };

  const handleGenerate = async () => {
    if (!topic) return;

    if (!user) {
      alert("Please sign in to generate images.");
      return;
    }

    const hasEnough = await deductCredits(count);
    if (!hasEnough) return;

    setLoading(true);
    setItems([]);
    setProgress({ current: 0, total: count });
    const { width, height } = getResolution();
    const newItems: GeneratedItem[] = [];

    for (let i = 0; i < count; i++) {
      try {
        const textSeed = Math.floor(Math.random() * 1000000);

        // Fix for custom styles loaded from localStorage (functions are lost in JSON)
        let textPromptInput = "";
        if (typeof activeStyle.promptTemplate === 'function') {
          textPromptInput = activeStyle.promptTemplate(topic, textSeed);
        } else {
          // Fallback construction for custom styles using the saved customPrompt
          const styleDescription = activeStyle.customPrompt || activeStyle.info || activeStyle.label;
          textPromptInput = `Create a detailed image description for a junk journal page in a "${activeStyle.label}" style.\nTheme: "${topic}".\nStyle: ${styleDescription}\nFormat: Full-page, A4 printable. High artistic quality. Seed:${textSeed}`;
        }

        const textResponse = await fetch(`https://gen.pollinations.ai/text/${encodeURIComponent(textPromptInput)}?model=gemini-fast&key=sk_brPwHCxsHNPBfUG1dkoGRWawPgOcoR51&seed=${textSeed}`);
        const detailedPrompt = await textResponse.text();
        const imageUrl = buildImageUrl(detailedPrompt, width, height);
        newItems.push({ id: i, prompt: detailedPrompt, imageUrl });
        setProgress(prev => ({ ...prev, current: i + 1 }));
      } catch (error) {
        console.error("Error generating item:", error);
      }
    }

    setItems(newItems);
    setLoading(false);
  };

  const updatePrompt = (id: number, newPrompt: string) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, prompt: newPrompt } : item)));
  };

  // Called by img's onLoad/onError to clear the loading state
  const onImageLoaded = (id: number) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, regenerating: false } : i)));
  };

  const regenerateSingle = async (id: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (!user) {
      alert("Please sign in to generate images.");
      return;
    }

    const hasEnough = await deductCredits(1);
    if (!hasEnough) return;
    const { width, height } = getResolution();
    // For manual edit/regeneration, we just use the prompt as is
    const newUrl = buildImageUrl(item.prompt, width, height);
    // Mark as regenerating; overlay will hide only when the new image fully loads
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, imageUrl: newUrl, regenerating: true } : i
    ));
  };

  const preloadImageAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleDownloadZip = async () => {
    if (items.length === 0) return;
    setDownloadingAll(true);
    setToastMessage("Packaging your magical pages into a ZIP... 📦");
    try {
      const zip = new JSZip();
      for (let i = 0; i < items.length; i++) {
        const response = await fetch(items[i].imageUrl);
        const blob = await response.blob();
        zip.file(`junk-journal-page-${i + 1}.jpg`, blob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${activeStyle.id}-collection.zip`);
      setToastMessage("Your ZIP file is ready! 🎉");
    } catch (error) {
      console.error(error);
      alert("Failed to create ZIP.");
    }
    setDownloadingAll(false);
  };

  const handleDownloadPdf = async () => {
    if (items.length === 0) return;
    setDownloadingAll(true);
    setToastMessage("Binding your pages into a PDF book... 📖");
    try {
      // Create a PDF: A4 size is approx 210x297 mm. Square can be 210x210
      const isPortrait = format === 'a4';
      const pdf = new jsPDF({
        orientation: isPortrait ? 'portrait' : 'landscape',
        unit: 'mm',
        format: isPortrait ? 'a4' : [210, 210] // custom square size roughly a4 width
      });

      const width = isPortrait ? 210 : 210;
      const height = isPortrait ? 297 : 210;

      for (let i = 0; i < items.length; i++) {
        const base64Img = await preloadImageAsBase64(items[i].imageUrl);
        if (i > 0) pdf.addPage(isPortrait ? 'a4' : [210, 210], isPortrait ? 'p' : 'l');
        pdf.addImage(base64Img, 'JPEG', 0, 0, width, height);
      }
      pdf.save(`${activeStyle.id}-journal.pdf`);
      setToastMessage("Your magical PDF book is ready! 🎉");
    } catch (error) {
      console.error(error);
      alert("Failed to create PDF.");
    }
    setDownloadingAll(false);
  };

  return (
    <div>
      {toastMessage && (
        <div className="fade-in" style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg-paper)', border: '2px solid var(--accent-sepia)',
          boxShadow: 'var(--shadow-md)', padding: '1rem 2rem', borderRadius: '50px',
          zIndex: 9999, display: 'flex', alignItems: 'center', gap: '1rem'
        }}>
          <span style={{ fontSize: '1.2rem' }}>💌</span>
          <p className="handwritten" style={{ fontSize: '1.4rem', color: 'var(--accent-ink)', margin: 0 }}>
            {toastMessage}
          </p>
          <button onClick={() => setToastMessage(null)} style={{
            background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-secondary)'
          }}>×</button>
        </div>
      )}

      <div style={{ height: '2rem' }} /> {/* Minimal Spacer */}

      <div className="paper-card fade-in" style={{ maxWidth: '950px', margin: '0 auto', borderBottom: `4px solid ${activeStyle.accentColor}` }}>

        {/* Style Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              Art Style
            </label>
            <button
              onClick={() => setShowStyleInfoModal(true)}
              style={{ background: 'var(--bg-paper)', border: `1px solid ${activeStyle.accentColor}`, borderRadius: '20px', padding: '2px 10px', cursor: 'pointer', fontSize: '0.8rem', color: activeStyle.accentColor, fontWeight: 600 }}
              title="Style Info"
            >
              ℹ️ Style Info
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {allStyles.map(style => (
              <button
                key={style.id}
                onClick={() => setActiveStyleId(style.id)}
                style={{
                  padding: '8px 16px',
                  border: `2px solid ${activeStyleId === style.id ? style.accentColor : 'var(--border-sepia)'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: activeStyleId === style.id ? style.accentColor + '22' : 'transparent',
                  fontWeight: activeStyleId === style.id ? 700 : 400,
                  color: activeStyleId === style.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  transition: '0.2s',
                }}
              >
                {style.emoji} {style.label}
              </button>
            ))}
            <button
              onClick={() => setShowAddStyleModal(true)}
              style={{
                padding: '8px 16px',
                border: `2px dashed var(--border-sepia)`,
                borderRadius: '6px',
                cursor: 'pointer',
                background: 'transparent',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                transition: '0.2s',
              }}
            >
              ➕ Add Style
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <label htmlFor="topic" style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Scene Topic</label>
            <div style={{ display: 'flex', gap: '0.5rem', background: '#f0ede4', padding: '4px', borderRadius: '6px' }}>
              {(["square", "a4"] as const).map(f => (
                <button key={f} onClick={() => setFormat(f)} style={{
                  padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer',
                  background: format === f ? 'var(--accent-sepia)' : 'transparent',
                  color: format === f ? 'white' : 'var(--text-secondary)',
                  fontSize: '0.8rem', fontWeight: 600, transition: '0.2s'
                }}>
                  {f === "square" ? "Square" : "A4 Printable"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <input
              id="topic"
              type="text"
              className="input-field"
              placeholder="e.g. Garden gate with roses, Stone bridge over stream..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
            />

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Try:</span>
              {activeStyle.suggestions.map(tag => (
                <button key={tag} onClick={() => setTopic(tag)} style={{
                  background: 'none', border: 'none', color: 'var(--accent-sepia)',
                  fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline', padding: 0
                }}>
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#fdfbf7', padding: '1rem', borderRadius: '4px', border: '1px dashed var(--border-sepia)' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                  Batch Quantity: <strong>{count}</strong> {count > 1 ? 'Pages' : 'Page'} (Max 50)
                </label>
                <input
                  type="range" min="1" max="50" value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-sepia)', cursor: 'pointer' }}
                />
              </div>
              <button className="btn" onClick={handleGenerate} disabled={loading || !topic} style={{ minWidth: '180px', height: '50px' }}>
                {loading ? `Designing (${progress.current}/${progress.total})...` : "Generate Pack"}
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '100%', height: '4px', background: '#eee', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{
                width: `${(progress.current / progress.total) * 100}%`,
                height: '100%', background: activeStyle.accentColor, transition: 'width 0.3s ease'
              }}></div>
            </div>
            <p className="handwritten" style={{ fontSize: '1.2rem' }}>Creating digital paper... each page is unique.</p>
          </div>
        )}

        {items.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ borderBottom: '1px solid var(--border-sepia)', paddingBottom: '0.5rem', margin: 0 }}>
                  Your Printable Collection
                </h2>
                <span style={{ fontSize: '0.8rem', background: activeStyle.accentColor, color: 'white', padding: '4px 10px', borderRadius: '20px' }}>
                  {activeStyle.emoji} {activeStyle.label} · {format.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleDownloadZip}
                  disabled={downloadingAll}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '4px', cursor: downloadingAll ? 'wait' : 'pointer', background: 'white' }}
                >
                  {downloadingAll ? '...' : '📦 Download ZIP'}
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={downloadingAll}
                  className="btn"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '4px', cursor: downloadingAll ? 'wait' : 'pointer' }}
                >
                  {downloadingAll ? '...' : '📖 Export PDF'}
                </button>
              </div>
            </div>
            <div className="grid-4">
              {items.map((item) => (
                <div key={item.id} className="fade-in image-card-container" style={{
                  background: 'white', border: '1px solid var(--border-sepia)',
                  boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'relative', overflow: 'hidden',
                    aspectRatio: format === 'a4' ? '8.5/11' : '1/1',
                  }}>
                    <img
                      src={item.imageUrl}
                      alt={item.prompt}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        opacity: item.regenerating ? 0.15 : 1,
                        transition: 'opacity 0.4s ease'
                      }}
                      loading="lazy"
                      onLoad={() => onImageLoaded(item.id)}
                      onError={() => onImageLoaded(item.id)}
                    />

                    {/* Corner Download Icon - only visible on hover */}
                    <a
                      href={item.imageUrl} target="_blank" download
                      className="image-card-hover-action corner-download"
                      title="Download HD Junk Journal Page"
                      style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(255,255,255,0.9)', borderRadius: '50%',
                        width: '36px', height: '36px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        textDecoration: 'none', zIndex: 10
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>📥</span>
                    </a>

                    {/* Hover Actions Overlay */}
                    <div className="image-card-hover-action" style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(5px)',
                      padding: '1rem',
                      borderTop: '1px solid var(--border-sepia)',
                      zIndex: 5
                    }}>
                      {activeEditId === item.id ? (
                        <div className="fade-in">
                          <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            Edit Prompt
                          </label>
                          <textarea
                            value={item.prompt}
                            onChange={(e) => updatePrompt(item.id, e.target.value)}
                            rows={3}
                            style={{
                              width: '100%', fontSize: '0.75rem', color: 'var(--text-primary)',
                              fontStyle: 'italic', lineHeight: '1.4', padding: '6px',
                              border: '1px solid var(--border-sepia)', borderRadius: '3px',
                              background: '#fdfbf7', resize: 'none', fontFamily: 'inherit', outline: 'none'
                            }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveEditId(null);
                            }}
                            style={{
                              width: '100%', marginTop: '0.4rem', background: 'none',
                              border: 'none', color: 'var(--text-secondary)', fontSize: '0.7rem',
                              cursor: 'pointer', textDecoration: 'underline'
                            }}
                          >
                            Close Editor
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveEditId(item.id);
                            }}
                            className="btn-secondary"
                            style={{ padding: '6px 8px', fontSize: '0.7rem', flex: 1, background: 'white' }}
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              regenerateSingle(item.id);
                            }}
                            disabled={item.regenerating}
                            className="btn"
                            style={{ padding: '6px 8px', fontSize: '0.7rem', flex: 1 }}
                          >
                            {item.regenerating ? "..." : "↺ Redo"}
                          </button>
                        </div>
                      )}
                    </div>

                    {item.regenerating && (
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(253,251,247,0.85)', gap: '0.75rem',
                        zIndex: 20
                      }}>
                        {/* CSS spinner */}
                        <div style={{
                          width: '36px', height: '36px',
                          border: '3px solid var(--border-sepia)',
                          borderTop: '3px solid var(--accent-sepia)',
                          borderRadius: '50%',
                          animation: 'spin 0.9s linear infinite'
                        }} />
                        <p className="handwritten" style={{ fontSize: '1.1rem', color: 'var(--accent-sepia)' }}>
                          Painting...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '6rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>Success Tips</h2>
        <div className="grid">
          <div className="paper-card">
            <h3 className="handwritten" style={{ fontSize: '1.8rem' }}>Edit & Refine</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Each card has an editable prompt — tweak it and hit <strong>↺ Regenerate</strong> for a new variation.</p>
          </div>
          <div className="paper-card">
            <h3 className="handwritten" style={{ fontSize: '1.8rem' }}>Bundle Packs</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Use the batch slider to create 10–15 matching pages for a single themed collection.</p>
          </div>
          <div className="paper-card">
            <h3 className="handwritten" style={{ fontSize: '1.8rem' }}>File Format</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Download the HD images and convert to PDF or JPG before listing on Etsy.</p>
          </div>
        </div>
      </div>
      {showStyleInfoModal && (
        <div className="modal-overlay" onClick={() => setShowStyleInfoModal(false)}>
          <div className="modal fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px', borderTop: `6px solid ${activeStyle.accentColor}` }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span>{activeStyle.emoji}</span> {activeStyle.label}
            </h2>
            <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: '6px', border: '1px solid var(--border-sepia)', marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                {activeStyle.info}
              </p>
            </div>

            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', borderBottom: '1px dashed var(--border-sepia)', paddingBottom: '0.5rem' }}>Pro Tips for this style:</h3>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              <li>Keep the Scene Topic under 10 words.</li>
              <li>Let the AI do the heavy lifting for the aesthetic.</li>
              {activeStyle.suggestions.length > 0 && (
                <li>Try some suggested topics like: <em>{activeStyle.suggestions.slice(0, 2).join(", ")}</em>.</li>
              )}
            </ul>

            <button className="btn" onClick={() => setShowStyleInfoModal(false)} style={{ width: '100%', padding: '0.8rem' }}>
              Got it! ✨
            </button>
          </div>
        </div>
      )}
      {
        showAddStyleModal && (
          <div className="modal-overlay" onClick={() => setShowAddStyleModal(false)}>
            <div className="modal fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2>➕ Add Custom Style</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Create your own unique generation style by defining its core aesthetic and instructions. Your style is saved to this browser.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Style Name</label>
                  <input type="text" className="input-field" placeholder="e.g. Steampunk Diary" value={newStyleForm.label} onChange={e => setNewStyleForm(prev => ({ ...prev, label: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Emoji (Optional)</label>
                  <input type="text" className="input-field" placeholder="e.g. ⚙️" value={newStyleForm.emoji} onChange={e => setNewStyleForm(prev => ({ ...prev, emoji: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Style Instructions (The Prompt)</label>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#888', marginBottom: '0.3rem' }}>
                    What makes this style unique? (Manual entry is <strong>Free / 0 Credit</strong>)
                  </span>
                  <textarea className="input-field" rows={4} placeholder="Type aesthetic description here..." value={newStyleForm.prompt} onChange={e => setNewStyleForm(prev => ({ ...prev, prompt: e.target.value }))}></textarea>
                </div>

                <div style={{ padding: '1.2rem', border: '2px dashed var(--border-sepia)', borderRadius: '8px', textAlign: 'center', background: '#fffcf5' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                    <strong>Or Use AI Image Analysis</strong><br />
                    <span style={{ color: '#d97706', fontWeight: 700, display: 'block', margin: '4px 0' }}>Cost: 60 Credits</span>
                    Paste an image link and we'll extract its style automatically.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Paste image URL here..."
                      value={imageLink}
                      onChange={(e) => setImageLink(e.target.value)}
                      style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                    />
                    <button
                      className="btn"
                      onClick={() => handleAnalyzeImage(imageLink)}
                      disabled={analyzing || !imageLink}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                      {analyzing ? "..." : "Analyze"}
                    </button>
                  </div>
                  {analyzing && (
                    <p className="handwritten" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Scanning aesthetics... 🕯️</p>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Info (Tips for users)</label>
                  <input type="text" className="input-field" placeholder="e.g. Works best with mechanical objects." value={newStyleForm.info} onChange={e => setNewStyleForm(prev => ({ ...prev, info: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-secondary" onClick={() => setShowAddStyleModal(false)} style={{ flex: 1 }}>Cancel</button>
                <button className="btn" onClick={handleCreateCustomStyle} disabled={!newStyleForm.label || !newStyleForm.prompt} style={{ flex: 1 }}>✨ Save Style</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
