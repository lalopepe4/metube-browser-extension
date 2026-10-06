// "quality" values accepted by MeTube for each format exposed by the extension.
//
// MeTube feeds the value straight into the yt-dlp format selector: for video it
// is used as a height cap ([height<=N], hence bare numbers without the "p"),
// and for audio it is read as kbps. See app/dl_formats.py and app/main.py in
// alexta69/metube (the UI defines them in ui/src/app/interfaces/formats.ts).
//
// Stability: the audio bitrates (mp3 320/192/128, m4a 192/128) date back to
// 2021, and so does the video list except for 2160 (2024-10). The last change
// (2026-03) was a reorganization with no new values. If MeTube adds or removes
// values, these lists have to be updated.

const BEST_QUALITY = Object.freeze({ id: 'best', text: 'Best' });

const VIDEO_QUALITIES = [
  BEST_QUALITY,
  { id: '2160', text: '2160p' },
  { id: '1440', text: '1440p' },
  { id: '1080', text: '1080p' },
  { id: '720', text: '720p' },
  { id: '480', text: '480p' },
  { id: '360', text: '360p' },
  { id: '240', text: '240p' },
  { id: 'worst', text: 'Worst' },
];

const AUDIO_MP3_QUALITIES = [
  BEST_QUALITY,
  { id: '320', text: '320 kbps' },
  { id: '192', text: '192 kbps' },
  { id: '128', text: '128 kbps' },
];

const AUDIO_M4A_QUALITIES = [
  BEST_QUALITY,
  { id: '192', text: '192 kbps' },
  { id: '128', text: '128 kbps' },
];

const AUDIO_OPUS_QUALITIES = [BEST_QUALITY];

const AUDIO_WAV_QUALITIES = [BEST_QUALITY];

const THUMBNAIL_QUALITIES = [BEST_QUALITY];

const QUALITY_OPTIONS = {
  any: VIDEO_QUALITIES,
  mp4: VIDEO_QUALITIES,
  m4a: AUDIO_M4A_QUALITIES,
  mp3: AUDIO_MP3_QUALITIES,
  opus: AUDIO_OPUS_QUALITIES,
  wav: AUDIO_WAV_QUALITIES,
  thumbnail: THUMBNAIL_QUALITIES,
};

// Unknown formats (e.g. a stale stored value) only ever get "best".
const DEFAULT_QUALITY_OPTIONS = [BEST_QUALITY];

function getQualityOptions(format) {
  return QUALITY_OPTIONS[format] || DEFAULT_QUALITY_OPTIONS;
}

function isValidQuality(format, quality) {
  return getQualityOptions(format).some((option) => option.id === quality);
}
