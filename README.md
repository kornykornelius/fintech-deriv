## Objectives
A small mobile web app fintech prototype that helps users send money while clearly understanding the transfer fee, total charge and estimated arrival time. 

## Links
- Live: https://fintech-deriv.vercel.app
- Design System: https://fintech-deriv.vercel.app/design-system
- Figma: https://www.figma.com/design/XAnP385an6edNhPz1LVC1C/Deriv?node-id=0-1&t=KKYH3V2Tt0v90P1E-1

## Scope
- Balance overview
- Recent recipients and transactions
- Send money form
- Validation and loading states
- Transfer confirmation

## Design approach
I focused on one simple complete transfer money journey instead of building multiple disconnected features.

## AI Usage
I used Claude Design to explore ideas and generate visual references. Once the design was finalised, I first tried using Figma MCP with Claude Code to build the interface. However, it generated a design system instead, which I then kept as a styling guideline.
Due to the limitations of the Figma Free plan, and because I was concerned that Claude Code might not have enough time to complete the interface, I changed my strategy. I exported each screen as an image and handed them over to Claude Cowork to build the prototype, including subtle animations and transitions.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
