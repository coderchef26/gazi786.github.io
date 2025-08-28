"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import { motion } from "framer-motion";
import { 
  FaTrophy, FaStar, FaCertificate, FaMedal, FaAward, FaCrown,
  FaRocket, FaBullseye, FaFlag, FaBolt, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter,
  FaCode, FaUsers, FaCoffee, FaCalendar
} from "react-icons/fa";

import SliceContainer from "@/components/slice-internals/SliceContainer";
import { useSliceAtlas } from "@/hooks/useSliceAtlas";
import { componentStyles } from "@/lib/theme/components";
import { themeColors, themeEffects } from "@/lib/theme/colors";
import { animationPresets } from "@/lib/animations/slice-animations";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

// Achievement icon mapping
const achievementIcons = {
  trophy: FaTrophy,
  star: FaStar,
  certificate: FaCertificate,
  medal: FaMedal,
  award: FaAward,
  crown: FaCrown,
  rocket: FaRocket,
  target: FaBullseye,
  flag: FaFlag,
  lightning: FaBolt,
} as const;

// Stats icon mapping
const statsIcons = {
  experience: FaCalendar,
  projects: FaCode,
  clients: FaUsers,
  coffee: FaCoffee,
} as const;

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
  const { announceSlice, generateVoiceCommand } = useSliceAtlas();

  // Announce slice load for accessibility
  if (typeof window !== 'undefined') {
    announceSlice("About section loaded with personal information");
    
    // Voice commands for About section
    generateVoiceCommand("tell me about yourself", () => {
      // Safer access to bio field - will work once Prismic types are regenerated
      const bio = (slice.primary as any)?.bio;
      if (bio && isFilled.richText(bio)) {
        const bioText = bio.map((block: any) => 
          'text' in block ? block.text : ''
        ).join(' ');
        
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(bioText);
          utterance.rate = 0.8;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        // Fallback message
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Welcome to my portfolio! I'm a passionate developer with expertise in modern web technologies.");
          window.speechSynthesis.speak(utterance);
        }
      }
    });

    generateVoiceCommand("show me contact info", () => {
      const contactSection = document.querySelector('[data-contact-info]');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        announceSlice("Contact information displayed");
      }
    });
  }

  const stats = [
    {
      key: 'experience',
      label: 'Years Experience',
      value: (slice.primary as any)?.yearsOfExperience,
      icon: statsIcons.experience,
    },
    {
      key: 'projects',
      label: 'Projects Completed',
      value: (slice.primary as any)?.projectsCompleted,
      icon: statsIcons.projects,
    },
    {
      key: 'clients',
      label: 'Satisfied Clients',
      value: (slice.primary as any)?.clientsSatisfied,
      icon: statsIcons.clients,
    },
    {
      key: 'coffee',
      label: 'Cups of Coffee',
      value: (slice.primary as any)?.coffeeConsumed,
      icon: statsIcons.coffee,
    },
  ].filter(stat => stat.value && isFilled.number(stat.value));

  const socialLinks = [
    {
      field: (slice.primary as any)?.linkedinUrl,
      icon: FaLinkedin,
      label: 'LinkedIn',
      color: 'text-blue-500 hover:text-blue-400',
    },
    {
      field: (slice.primary as any)?.githubUrl,
      icon: FaGithub,
      label: 'GitHub',
      color: 'text-slate-400 hover:text-white',
    },
    {
      field: (slice.primary as any)?.twitterUrl,
      icon: FaTwitter,
      label: 'Twitter',
      color: 'text-blue-400 hover:text-blue-300',
    },
  ].filter(link => link.field && isFilled.link(link.field));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceContainer>
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationPresets.sliceSection.container}
            className="grid lg:grid-cols-2 gap-16 items-center mb-20"
          >
            {/* Profile Image */}
            <motion.div
              variants={animationPresets.sliceSection.item}
              className="relative"
            >
              <div className="relative group">
                {isFilled.image((slice.primary as any)?.profileImage) && (
                  <div className={`relative rounded-2xl overflow-hidden ${themeEffects.glow} ${themeEffects.transition} group-hover:shadow-cyan-500/30`}>
                    <PrismicNextImage
                      field={(slice.primary as any)?.profileImage}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${themeColors.accentGradient} opacity-0 group-hover:opacity-100 ${themeEffects.transition}`} />
                  </div>
                )}
                
                {/* Floating Arc Reactor Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 animate-pulse" />
              </div>
            </motion.div>

            {/* Personal Info */}
            <motion.div
              variants={animationPresets.sliceSection.item}
              className="space-y-6"
            >
              {isFilled.keyText((slice.primary as any)?.name) && (
                <h1 className={`${componentStyles.heading} text-5xl lg:text-6xl mb-4`}>
                  {(slice.primary as any)?.name}
                </h1>
              )}

              {isFilled.keyText((slice.primary as any)?.title) && (
                <h2 className={`${themeColors.primary} text-2xl font-light tracking-wide`}>
                  {(slice.primary as any)?.title}
                </h2>
              )}

              {isFilled.keyText((slice.primary as any)?.tagline) && (
                <p className={`${themeColors.secondary} text-lg italic`}>
                  "{(slice.primary as any)?.tagline}"
                </p>
              )}

              {/* Contact Info */}
              <div className="space-y-3 pt-6" data-contact-info>
                {isFilled.keyText((slice.primary as any)?.location) && (
                  <div className={`flex items-center gap-3 ${themeColors.secondary}`}>
                    <FaMapMarkerAlt className={themeColors.primary} />
                    <span>{(slice.primary as any)?.location}</span>
                  </div>
                )}

                {isFilled.keyText((slice.primary as any)?.email) && (
                  <div className={`flex items-center gap-3 ${themeColors.secondary}`}>
                    <FaEnvelope className={themeColors.primary} />
                    <a 
                      href={`mailto:${(slice.primary as any)?.email}`}
                      className={`hover:${themeColors.primary.replace('text-', 'text-')} ${themeEffects.transition}`}
                    >
                      {(slice.primary as any)?.email}
                    </a>
                  </div>
                )}

                {isFilled.keyText((slice.primary as any)?.phone) && (
                  <div className={`flex items-center gap-3 ${themeColors.secondary}`}>
                    <FaPhone className={themeColors.primary} />
                    <a 
                      href={`tel:${(slice.primary as any)?.phone}`}
                      className={`hover:${themeColors.primary.replace('text-', 'text-')} ${themeEffects.transition}`}
                    >
                      {(slice.primary as any)?.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Links & Resume */}
              <div className="flex flex-wrap gap-4 pt-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.div
                      key={social.label}
                      variants={animationPresets.sliceSection.item}
                      custom={index}
                    >
                      <PrismicNextLink
                        field={social.field}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 ${social.color} ${themeEffects.transition} hover:bg-slate-700/50 ${themeEffects.backdropBlur}`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{social.label}</span>
                      </PrismicNextLink>
                    </motion.div>
                  );
                })}

                {isFilled.link((slice.primary as any)?.resumeLink) && (
                  <motion.div
                    variants={animationPresets.sliceSection.item}
                    custom={socialLinks.length}
                  >
                    <PrismicNextLink
                      field={(slice.primary as any)?.resumeLink}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${themeColors.primaryGradient} text-slate-900 font-semibold ${themeEffects.transition} hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105`}
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Download Resume</span>
                    </PrismicNextLink>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          {stats.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animationPresets.sliceSection.container}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.key}
                    variants={animationPresets.sliceSection.item}
                    custom={index}
                    className={`text-center p-6 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border ${themeEffects.transition} hover:${themeColors.borderHover} hover:scale-105`}
                  >
                    <IconComponent className={`w-8 h-8 mx-auto mb-3 ${themeColors.primary}`} />
                    <div className={`text-3xl font-bold ${themeColors.white} mb-1`}>
                      {stat.value?.toLocaleString()}
                    </div>
                    <div className={`${themeColors.secondary} text-sm`}>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Bio, Mission & Values */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {isFilled.richText((slice.primary as any)?.bio) && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationPresets.sliceSection.item}
                className={`p-8 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border`}
              >
                <h3 className={`${componentStyles.subheading} mb-6`}>
                  About Me
                </h3>
                <div className={`${themeColors.secondary} prose-slate prose-invert max-w-none`}>
                  <PrismicRichText field={(slice.primary as any)?.bio} />
                </div>
              </motion.div>
            )}

            {isFilled.richText((slice.primary as any)?.mission) && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationPresets.sliceSection.item}
                className={`p-8 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border`}
              >
                <h3 className={`${componentStyles.subheading} mb-6`}>
                  Mission
                </h3>
                <div className={`${themeColors.secondary} prose-slate prose-invert max-w-none`}>
                  <PrismicRichText field={(slice.primary as any)?.mission} />
                </div>
              </motion.div>
            )}

            {isFilled.richText((slice.primary as any)?.values) && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationPresets.sliceSection.item}
                className={`p-8 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border`}
              >
                <h3 className={`${componentStyles.subheading} mb-6`}>
                  Core Values
                </h3>
                <div className={`${themeColors.secondary} prose-slate prose-invert max-w-none`}>
                  <PrismicRichText field={(slice.primary as any)?.values} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Achievements */}
          {isFilled.group((slice as any)?.items) && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animationPresets.sliceSection.container}
              className="text-center"
            >
              <motion.h3
                variants={animationPresets.sliceSection.heading}
                className={`${componentStyles.subheading} mb-12`}
              >
                Key Achievements
              </motion.h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {((slice as any)?.items || []).map((item: any, index: number) => {
                  if (!isFilled.keyText(item.achievement)) return null;
                  
                  const IconComponent = item.achievementIcon && achievementIcons[item.achievementIcon as keyof typeof achievementIcons] 
                    ? achievementIcons[item.achievementIcon as keyof typeof achievementIcons]
                    : FaStar;

                  return (
                    <motion.div
                      key={index}
                      variants={animationPresets.sliceSection.item}
                      custom={index}
                      className={`p-6 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border ${themeEffects.transition} hover:${themeColors.borderHover} hover:scale-105`}
                    >
                      <IconComponent className={`w-10 h-10 mx-auto mb-4 ${themeColors.primary}`} />
                      <h4 className={`${themeColors.white} font-semibold mb-2`}>
                        {item.achievement}
                      </h4>
                      {isFilled.number(item.achievementYear) && (
                        <p className={`${themeColors.muted} text-sm`}>
                          {item.achievementYear}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </SliceContainer>
    </section>
  );
};

export default About;