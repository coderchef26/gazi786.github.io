import {
	Content,
	KeyTextField,
	RichTextField,
	ImageField,
	LinkField,
} from "@prismicio/client";

export interface ProjectDocument {
	uid: string;
	data: {
		title: KeyTextField;
		description: RichTextField;
		image: ImageField;
		github_link: LinkField;
		demo_link: LinkField;
		technologies: KeyTextField[];
		featured: boolean;
	};
}

export interface PageDocument {
	uid: string;
	data: {
		title: KeyTextField;
		slices: Content.AllSlices[];
	};
}

export interface SkillCategory {
	category: string;
	skills: string[];
}

export interface ContactForm {
	name: string;
	email: string;
	message: string;
}

export interface SocialMediaLink {
	social_logos: KeyTextField;
	social_links: any; // You can refine this to the correct type based on the actual Prismic data
}

export interface ContactDetail {
	contact_label: KeyTextField;
	contact_detail: KeyTextField;
}

export interface SettingsData {
	footer_logo: any; // Replace 'any' with the correct type if known (e.g., PrismicNextImage field type)
	contact_details: ContactDetail[];
	social_media_links: SocialMediaLink[];
}
