"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });
const HUDOverlay = dynamic(() => import("./HUDOverlay"), { ssr: false });

export default function AzmaraEffects() {
	return (
		<>
			<ParticleField />
			<HUDOverlay />
		</>
	);
}
