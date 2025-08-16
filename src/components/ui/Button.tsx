import React from "react";
import { cn } from "@/lib/utils";
import { atlasTheme } from "@/lib/theme/atlas";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
	children,
	className,
	variant = "primary",
	size = "md",
	disabled,
	...props
}) => {
	const sizeClasses = {
		sm: "px-3 py-1.5 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const variantClasses = {
		primary: `bg-gradient-to-r from-[${atlasTheme.colors.primary}] to-[${atlasTheme.colors.primaryDark}] text-white hover:shadow-lg hover:shadow-cyan-500/50`,
		secondary: `bg-[${atlasTheme.colors.surface}] text-[${atlasTheme.colors.primary}] hover:bg-[${atlasTheme.colors.surfaceLight}] border border-[${atlasTheme.colors.border}]`,
		outline: `border-2 border-[${atlasTheme.colors.primary}] text-[${atlasTheme.colors.primary}] hover:bg-[${atlasTheme.colors.primary}]/10`,
		ghost: `text-[${atlasTheme.colors.primary}] hover:bg-[${atlasTheme.colors.primary}]/10`,
	};

	return (
		<button
			className={cn(
				"font-semibold rounded-lg transition-all duration-300 transform hover:scale-105",
				"disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
				sizeClasses[size],
				variantClasses[variant],
				className
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};