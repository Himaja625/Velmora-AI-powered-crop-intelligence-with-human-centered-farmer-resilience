# Field Wisdom

Build a polished, responsive web application called "Velmora".

Velmora is an AI-powered farmer livelihood and climate resilience platform. Its primary purpose is to act as a real-time bridge between raw field conditions and actionable agronomic guidance.

CORE PROBLEM:

Farmers often have to make important crop-management decisions from incomplete information. Velmora should help transform real-world field observations into clear, understandable guidance by combining:

1. A photo of a crop/leaf

2. The farmer's location

3. Current and upcoming weather conditions

4. AI-powered analysis

The primary user journey must be:

FIELD CONDITION → AI ANALYSIS → CROP GUIDANCE → WEATHER CHECK → SAFE ACTION WINDOW

The application should also contain a secondary human-centered "Farmer Resilience" layer. Farming problems can create uncertainty, stress, isolation, and financial anxiety. Velmora should provide a private AI conversation experience where a farmer can express what they are going through and receive an empathetic, natural, non-judgmental response. This is NOT a therapy replacement and should never diagnose mental illness or pretend to be a therapist.

IMPORTANT PRODUCT PRIORITY:

The agriculture and climate-resilience functionality is the PRIMARY purpose of the application.

The farmer-resilience and community functionality is the DIFFERENTIATING layer.

Do NOT make this look like a generic mental-health or social-media application.

BRAND:

Name: Velmora

Tagline: "Know your field. Know your next step."

Brand feeling: trustworthy, calm, human, intelligent, grounded, safe, modern, and agricultural without looking old-fashioned.

Avoid generic healthcare/therapy aesthetics.

Use an elegant nature-inspired visual language with subtle earth, leaf, sky, and warm neutral elements.

Do not make the interface overly colorful or childish.

MAIN NAVIGATION:

- Home

- Field Scan

- Advisory

- Talk to Velmora

- Community

- About

HOME PAGE:

Create a strong hero section explaining:

"From field signals to confident decisions."

Supporting text:

"Velmora combines crop observations, location, weather, and AI-powered guidance to help farmers understand what is happening in their fields and decide what to do next."

Primary CTA:

"Scan My Field"

Secondary CTA:

"Talk to Velmora"

Also show a concise 3-step explanation:

1. Capture what you see

2. Understand what it means

3. Act at the right time

FIELD SCAN PAGE:

Create a clean guided interface where the farmer can:

- Upload a crop/leaf image

- Enter/select crop type

- Enter their location

- Request/use location access if available

- Continue to analysis

Clearly show that the image, location, and weather are used together.

Use a drag-and-drop image upload area with a preview.

Include validation and helpful error states.

Do not pretend that image analysis is accurate before an actual AI/image model is connected.

ADVISORY PAGE:

Create a professional results dashboard containing:

- Crop health assessment

- Likely issue/disease

- Confidence indicator

- Observed visual indicators

- Recommended next steps

- Treatment guidance

- Weather summary

- Weather risks

- Recommended action window

- Explanation of why that action window is recommended

Use language such as "Likely issue" rather than claiming absolute diagnosis.

Example structure:

LIKELY ISSUE

Tomato Early Blight

CONFIDENCE

87%

WHAT WE OBSERVED

Dark lesions and yellowing patterns consistent with the detected condition.

WHAT TO DO

1. Remove severely affected leaves.

2. Improve air circulation.

3. Avoid unnecessary overhead watering.

4. Follow locally appropriate agricultural treatment guidance.

WEATHER CHECK

Rain expected within the next several hours.

ACTION WINDOW

Wait until the weather conditions are more suitable before applying treatment.

IMPORTANT:

The advisory interface must make it visually obvious that the final recommendation is based on BOTH crop analysis and weather conditions.

TALK TO VELMORA:

Create a conversational AI interface designed specifically for farmers.

The AI should feel warm, attentive, and context-aware rather than like a generic chatbot.

Example:

Farmer:

"My crop is failing and I'm scared because this is my income."

Velmora:

"Losing part of a crop can feel frightening when your livelihood depends on it. You don't have to explain everything at once. If you want, tell me what has happened so far."

The AI should:

- acknowledge what the farmer actually said

- reflect the emotional/contextual meaning naturally

- avoid generic motivational clichés

- avoid repeatedly saying "stay positive"

- avoid automatically recommending breathing exercises, journaling, or generic wellness activities

- ask thoughtful follow-up questions when appropriate

- remember relevant context within the current conversation

- distinguish between agricultural questions and emotional concerns

- provide practical agricultural guidance when appropriate

- never claim to be a human

- never claim to be a therapist

- never diagnose mental-health conditions

- never provide dangerous medical or agricultural instructions

Include a small, non-intrusive safety note explaining that Velmora is an AI support tool and is not a replacement for qualified professional or agricultural advice.

"YOU ARE NOT ALONE" SIGNAL:

When appropriate, show a subtle community insight such as:

"Many farmers are facing similar weather-related crop concerns."

or

"64 anonymous community reports this week mention weather-related crop loss."

Do NOT fabricate real-world statistics. Build this initially using clearly labeled demo/community data that can later be connected to real aggregated data.

COMMUNITY:

Create anonymous, topic-based discussion rooms.

The purpose is shared experience and support, NOT dating or social networking.

Example rooms:

- Crop Disease

- Weather & Crop Loss

- Climate Uncertainty

- Harvest Pressure

- Financial Stress

- Farming Challenges

- Young Farmers

- Feeling Overwhelmed

IMPORTANT ANTI-DATING / SAFETY DESIGN:

Do NOT create:

- private direct messaging

- follower/following systems

- profile photos

- dating/matching features

- attractiveness-based discovery

- public personal information

- exact location sharing

Instead use:

- anonymous display identities

- topic-based rooms

- problem-based connection

- group conversation

- reporting/moderation controls

- clear community guidelines

The core principle is:

"Connect people through shared experiences, not personal identity."

Create sample anonymous posts so the interface is visually understandable during a demonstration.

ACCESSIBILITY:

Follow accessible design practices:

- semantic HTML

- readable contrast

- keyboard-friendly interactions

- visible focus states

- descriptive labels

- ARIA labels where appropriate

- accessible error messages

- responsive design for mobile, tablet, and desktop

SECURITY:

Do not expose API keys or secrets in frontend code.

Use environment variables for future API integrations.

Validate uploaded files and user inputs.

Do not collect unnecessary personal information.

Avoid exposing precise farmer locations publicly.

TECHNICAL DIRECTION:

Use a clean React + TypeScript architecture.

Use reusable components.

Keep dependencies lean.

Use clear naming and logical folder organization.

Make the application easy to connect later to:

- a crop/leaf image analysis model

- a live weather API

- an LLM API

- a database for anonymous community data

For now, use clearly labeled mock/demo data where a real backend or API is not yet connected.

Create a polished working frontend first.

Do not add unnecessary features.

Prioritize a coherent, realistic product experience over quantity of pages.

The final product should feel like a serious hackathon prototype that could realistically become a real product.

MOST IMPORTANT:

The application must communicate this story clearly:

A farmer sees something wrong in the field.

↓

Velmora understands the crop image.

↓

Velmora combines the farmer's location with current/upcoming weather.

↓

Velmora explains what may be happening.

↓

Velmora recommends what to do.

↓

Velmora tells the farmer when conditions are more suitable to act.

↓

If the farmer is overwhelmed, Velmora also listens.

↓

If they want human connection, Velmora safely connects them to anonymous topic-based community experiences.

Build the initial application now with this structure and design system.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/880f65e5-c75e-468b-924a-7cfe3dc3f442).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
