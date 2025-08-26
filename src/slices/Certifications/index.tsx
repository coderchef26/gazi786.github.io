"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import Link from "next/link";

/**
 * Props for `Certifications`.
 */
export type CertificationsProps =
  SliceComponentProps<Content.CertificationsSlice>;

interface CertificationsItem {
  cert_name?: string;
  cert_acronym?: string;
  issuing_organization?: string;
  issuer_logo?: any;
  cert_type?: string;
  cert_level?: string;
  issue_date?: string;
  expiry_date?: string;
  is_lifetime?: boolean;
  credential_id?: string;
  verification_url?: any;
  certificate_image?: any;
  voice_summary?: string;
  achievement_keywords?: string;
  credential_importance?: number;
}

/**
 * Component for "Certifications" Slices - Collection of Certifications with Repeatable Zones.
 */
const Certifications: FC<CertificationsProps> = ({
  slice,
}) => {
  const { announce, speak, config } = useAtlas();
  const [certifications, setCertifications] = useState<CertificationsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Extract certifications from Prismic repeatable zones
  useEffect(() => {
    const extractCertificationsFromCollection = () => {
      const certificationsData: CertificationsItem[] = [];
      
      // Handle repeatable zones (items array)
      if (slice.items && Array.isArray(slice.items)) {
        slice.items.forEach((item: any, index) => {
          if (item.cert_name) {
            certificationsData.push({
              cert_name: item.cert_name,
              cert_acronym: item.cert_acronym,
              issuing_organization: item.issuing_organization,
              issuer_logo: item.issuer_logo,
              cert_type: item.cert_type,
              cert_level: item.cert_level,
              issue_date: item.issue_date,
              expiry_date: item.expiry_date,
              is_lifetime: item.is_lifetime === true,
              credential_id: item.credential_id,
              verification_url: item.verification_url,
              certificate_image: item.certificate_image,
              voice_summary: item.voice_summary,
              achievement_keywords: item.achievement_keywords,
              credential_importance: item.credential_importance || 5
            });
          }
        });
      }
      
      // Sort by importance and issue date
      certificationsData.sort((a, b) => {
        if ((a.credential_importance || 0) !== (b.credential_importance || 0)) {
          return (b.credential_importance || 0) - (a.credential_importance || 0);
        }
        if (a.issue_date && b.issue_date) {
          return new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime();
        }
        return 0;
      });
      
      setCertifications(certificationsData);
      setIsLoading(false);
    };

    extractCertificationsFromCollection();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && certifications.length > 0) {
      const certCount = certifications.length;
      const types = [...new Set(certifications.map(c => c.cert_type))].filter(Boolean);
      const message = `Certifications collection loaded. ${certCount} certifications across ${types.length} different types.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Certifications collection showcasing ${certCount} professional certifications including ${types.slice(0, 3).join(', ')}.`);
      }

      // Register voice commands for collection certifications
      certifications.forEach((cert, index) => {
        const commands = [
          `show me ${cert.cert_name}`,
          `tell me about ${cert.cert_name}`,
          `certification ${index + 1}`,
        ];
        if (cert.cert_acronym) {
          commands.push(`show me ${cert.cert_acronym}`);
        }
      });
    }
  }, [isLoading, certifications, announce, speak, config.assistant.autoSpeak]);

  // Handle certification interaction
  const handleCertificationClick = (cert: CertificationsItem) => {
    const voiceMsg = cert.voice_summary || 
      `${cert.cert_name}: ${cert.cert_level || ''} level ${cert.cert_type || 'certification'} from ${cert.issuing_organization || 'issuing organization'}.`;
    
    announce(`Selected ${cert.cert_name} from certifications collection. ${voiceMsg}`);
    
    if (config.assistant.autoSpeak) {
      speak(voiceMsg);
    }
  };

  // Get unique types for filtering
  const allTypes = [...new Set(certifications.map(c => c.cert_type))].filter(Boolean);

  // Filter certifications by type
  const filteredCertifications = selectedType === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.cert_type === selectedType);

  // Get certification status
  const getCertificationStatus = (cert: CertificationsItem) => {
    if (cert.is_lifetime) return { status: 'Lifetime', color: 'text-emerald-400' };
    if (!cert.expiry_date) return { status: 'Active', color: 'text-green-400' };
    
    const expiryDate = new Date(cert.expiry_date);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'Expired', color: 'text-red-400' };
    if (daysUntilExpiry < 30) return { status: 'Expiring Soon', color: 'text-yellow-400' };
    return { status: 'Active', color: 'text-green-400' };
  };

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'professional': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'associate': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'foundational': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'specialty': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    const colors = {
      'Certification': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'License': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Badge': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Credentials (Micro)': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading certifications collection...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
      aria-labelledby="certifications-collection-heading"
    >
      {/* Skip Link */}
      <a 
        href="#next-section" 
        className="atlas-skip-link"
        onClick={() => announce('Navigating to next section')}
      >
        Skip certifications collection
      </a>

      <div className="container mx-auto px-4">
        {/* Collection Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="certifications-collection-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Certifications Collection
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive collection of professional certifications and industry credentials
          </p>
        </motion.div>

        {/* Type Filters */}
        {allTypes.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
              }`}
              aria-pressed={selectedType === 'all'}
            >
              All Certifications ({certifications.length})
            </button>
            {allTypes.map((type) => {
              const typeCount = certifications.filter(c => c.cert_type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type || 'all')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                  }`}
                  aria-pressed={selectedType === type}
                >
                  {type} ({typeCount})
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Certifications Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCertifications.map((cert, index) => {
            const status = getCertificationStatus(cert);
            return (
              <motion.div
                key={`cert-collection-${cert.cert_name}-${index}`}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCertificationClick(cert)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCertificationClick(cert);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Certification: ${cert.cert_name} from ${cert.issuing_organization}`}
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden h-full transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/10">
                  {/* Certificate Image */}
                  {cert.certificate_image?.url && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={cert.certificate_image.url}
                        alt={cert.certificate_image.alt || cert.cert_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Certification Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white font-orbitron line-clamp-2">
                            {cert.cert_name}
                          </h3>
                          {cert.cert_acronym && (
                            <p className="text-cyan-400 text-sm font-medium">
                              {cert.cert_acronym}
                            </p>
                          )}
                        </div>
                        {cert.issuer_logo?.url && (
                          <img
                            src={cert.issuer_logo.url}
                            alt={cert.issuing_organization}
                            className="w-12 h-12 object-contain rounded-lg bg-white/10"
                          />
                        )}
                      </div>
                      
                      {/* Organization */}
                      {cert.issuing_organization && (
                        <p className="text-slate-300 text-sm mb-3">
                          {cert.issuing_organization}
                        </p>
                      )}
                      
                      {/* Type and Level */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {cert.cert_type && (
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(cert.cert_type)}`}>
                            {cert.cert_type}
                          </span>
                        )}
                        {cert.cert_level && (
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getLevelColor(cert.cert_level)}`}>
                            {cert.cert_level}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status and Dates */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Status</span>
                        <span className={`text-sm font-medium ${status.color}`}>
                          {status.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        {cert.issue_date && (
                          <div className="bg-slate-700/30 rounded-lg p-2">
                            <div className="text-xs text-slate-400">Issued</div>
                            <div className="text-sm font-medium text-white">
                              {new Date(cert.issue_date).getFullYear()}
                            </div>
                          </div>
                        )}
                        {cert.expiry_date && !cert.is_lifetime && (
                          <div className="bg-slate-700/30 rounded-lg p-2">
                            <div className="text-xs text-slate-400">Expires</div>
                            <div className="text-sm font-medium text-white">
                              {new Date(cert.expiry_date).getFullYear()}
                            </div>
                          </div>
                        )}
                        {cert.is_lifetime && (
                          <div className="bg-emerald-500/20 rounded-lg p-2 col-span-2">
                            <div className="text-sm font-medium text-emerald-400">
                              Lifetime Certification
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Credential ID */}
                    {cert.credential_id && (
                      <div className="mb-4 p-3 bg-slate-700/20 rounded-lg">
                        <div className="text-xs text-slate-400 mb-1">Credential ID</div>
                        <div className="text-sm font-mono text-slate-300">{cert.credential_id}</div>
                      </div>
                    )}

                    {/* Verification Link */}
                    {cert.verification_url?.url && (
                      <Link
                        href={cert.verification_url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center w-full justify-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                        onClick={(e) => {
                          e.stopPropagation();
                          announce(`Opening verification for ${cert.cert_name}`);
                        }}
                      >
                        Verify Certification
                      </Link>
                    )}

                    {/* Achievement Keywords */}
                    {cert.achievement_keywords && (
                      <div className="mt-4">
                        <div className="text-xs text-slate-400 mb-1">Keywords</div>
                        <div className="text-xs text-slate-300">{cert.achievement_keywords}</div>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCertifications.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 text-lg">
              No certifications found in this collection matching the selected type.
            </p>
            <button
              onClick={() => setSelectedType('all')}
              className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Show All Collection Certifications
            </button>
          </motion.div>
        )}

        {/* Collection Summary for Screen Readers */}
        <div className="atlas-sr-only" aria-live="polite">
          Certifications collection showing {filteredCertifications.length} certifications
          {selectedType !== 'all' && ` of type ${selectedType}`}.
          Use tab to navigate through certifications and press Enter for details.
        </div>
      </div>
    </section>
  );
};

export default Certifications;
