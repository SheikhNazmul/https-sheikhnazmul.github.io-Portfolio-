"use client";

import { useState } from "react";
import { Play, X, Video, Info, AlertCircle } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnail?: string;
  title: string;
  description?: string;
  duration?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  title,
  description,
  duration,
  isOpen,
  onClose,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  // Helper to render YouTube / Vimeo iframe or html5 video
  const renderEmbed = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        videoId = urlParams.get("v") || "";
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0] || "";
      }
      
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      return (
        <iframe
          className="w-full h-full rounded-xl"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (url.includes("vimeo.com")) {
      const vimeoId = url.split("vimeo.com/")[1]?.split("?")[0] || "";
      return (
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={url}
        controls
        autoPlay
        className="w-full h-full rounded-xl object-contain bg-black"
      >
        Your browser does not support HTML5 video playback.
      </video>
    );
  };

  // If used as a Modal trigger
  if (isOpen !== undefined && onClose) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Watch Me Explain: {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-4">
            {videoUrl ? (
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-800">
                {renderEmbed(videoUrl)}
              </div>
            ) : (
              <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-white">
                  Project explanation video coming soon
                </h4>
                <p className="text-xs text-slate-400 max-w-md">
                  I am currently recording the architecture, backend microservice walk-through, and live code demo for this project. Check back shortly or view the GitHub code directly.
                </p>
              </div>
            )}

            {description && (
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <p className="text-xs font-mono text-cyan-400 mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Breakdown Notes:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Inline Card Video Player view
  return (
    <div className="space-y-2">
      <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden group">
        {videoUrl ? (
          playing ? (
            renderEmbed(videoUrl)
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center" />
              )}
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

              <button
                onClick={() => setPlaying(true)}
                className="relative z-10 w-14 h-14 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform group-hover:scale-110"
                aria-label={`Play video explanation for ${title}`}
              >
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </button>

              {duration && (
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-slate-950/80 text-[10px] font-mono text-white border border-slate-800">
                  {duration}
                </div>
              )}
            </div>
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center space-y-2 bg-slate-950">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
              <Video className="w-5 h-5" />
            </div>
            <p className="text-xs font-mono text-slate-400">
              Project explanation video coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
