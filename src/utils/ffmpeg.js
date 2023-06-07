import pathToFfmpeg from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(pathToFfmpeg);

export default ffmpeg;
