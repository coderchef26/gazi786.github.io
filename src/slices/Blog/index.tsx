import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `Blog`.
 */
export type BlogProps = SliceComponentProps<Content.BlogSlice>;

/**
 * Component for "Blog" Slices.
 */
const Blog: FC<BlogProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="py-20"
		>
			{isFilled.richText(slice.primary.title) && (
				<div className="text-center mb-12">
					<PrismicRichText 
						field={slice.primary.title}
						components={{
							heading1: ({ children }) => (
								<h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
									{children}
								</h1>
							),
							heading2: ({ children }) => (
								<h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
									{children}
								</h2>
							),
							paragraph: ({ children }) => (
								<p className="text-lg text-cyan-200/80 max-w-3xl mx-auto mt-4 font-inter">
									{children}
								</p>
							)
						}}
					/>
				</div>
			)}

		</section>
	);
};

export default Blog;
