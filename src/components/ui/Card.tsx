import React from "react";
import { cn } from "@/lib/utils";
import { atlasTheme } from "@/lib/theme/atlas";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
	variant?: "default" | "bordered" | "holographic";
}

export const Card: React.FC<CardProps> = ({
	children,
	className,
	hover = false,
	variant = "default",
}) => {
	const variantClasses = {
		default: `bg-[${atlasTheme.colors.surface}]/80 border border-[${atlasTheme.colors.border}]`,
		bordered: `bg-transparent border-2 border-[${atlasTheme.colors.primary}]/30`,
		holographic: `bg-gradient-to-br from-[${atlasTheme.colors.surface}]/50 to-[${atlasTheme.colors.surfaceLight}]/50 border border-[${atlasTheme.colors.primary}]/20`,
	};

	return (
		<div
			className={cn(
				"rounded-lg backdrop-blur-sm transition-all duration-300",
				variantClasses[variant],
				hover && "hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 hover:border-[#00d4ff]/50 cursor-pointer",
				className
			)}
		>
			{children}
		</div>
	);
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("p-6", className)}>
			{children}
		</div>
	);
};

export const CardActions: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("px-6 pb-6 flex items-center gap-2", className)}>
			{children}
		</div>
	);
};