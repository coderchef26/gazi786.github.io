import { Variants } from "framer-motion";

// Animation variant types for slice components
export interface AnimatedContentProps {
	children: React.ReactNode;
}

// Common animation variants
export const slideUpVariants: Variants = {
	hidden: { y: 60, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

export const fadeInVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			staggerChildren: 0.2,
		},
	},
};

export const scaleInVariants: Variants = {
	hidden: { 
		opacity: 0, 
		scale: 0.3,
		filter: "blur(10px)"
	},
	visible: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)",
		transition: {
			type: "spring" as const,
			stiffness: 120,
			damping: 12,
		},
	},
};

export const flipInVariants: Variants = {
	hidden: { 
		opacity: 0, 
		rotateY: -90,
		z: -100 
	},
	visible: {
		opacity: 1,
		rotateY: 0,
		z: 0,
		transition: {
			type: "spring" as const,
			stiffness: 100,
			damping: 15,
			duration: 0.8,
		},
	},
};

export const glitchVariants: Variants = {
	hidden: { x: 0 },
	visible: {
		x: [0, -2, 2, 0],
		transition: {
			duration: 0.3,
			repeat: 2,
			delay: 0.5,
		},
	},
};

export const reactorVariants: Variants = {
	hidden: { scale: 0, rotate: -180 },
	visible: {
		scale: 1,
		rotate: 0,
		transition: {
			type: "spring" as const,
			stiffness: 100,
			damping: 15,
			duration: 1.2,
		},
	},
};

export const upgradeVariants: Variants = {
	hidden: { 
		opacity: 0, 
		y: 100,
		rotateX: -90 
	},
	visible: {
		opacity: 1,
		y: 0,
		rotateX: 0,
		transition: {
			type: "spring" as const,
			stiffness: 80,
			damping: 20,
		},
	},
};

export const commVariants: Variants = {
	hidden: { 
		opacity: 0, 
		scale: 0.8,
		filter: "blur(5px)"
	},
	visible: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)",
		transition: {
			type: "spring" as const,
			stiffness: 100,
			damping: 15,
		},
	},
};