// videoLogic.ts
import { useState } from 'react';

interface VideoClip {
 titulo: string;
 url: string;
 portada: string;
}

interface VideoItem {
 title: string;
 subtitle: string;
 imageUrl: string;
 videoClip: VideoClip[];
}

export class VideoLogic {
    selectedVideo:string = './videos/iglesia1.mp4';
    videoItems: VideoItem[] = [
    {
      title: 'Categoria7',
      subtitle: 'subtitulo',
      imageUrl: 'https://picsum.photos/200/300?random=',
      videoClip: [
        { titulo: 'Iglesia1', url: './videos/iglesia1.mp4', portada: 'https://picsum.photos/200/300?random=' },
        { titulo: 'Iglesia2', url: './videos/iglesia2.mp4', portada: 'https://picsum.photos/200/300?random=' },
        { titulo: 'Ascencion', url: './videos/asencion.mp4', portada: 'https://picsum.photos/200/300?random=' }
      ]
    },
    {
      title: 'Categoria8',
      subtitle: 'subtitulo',
      imageUrl: 'https://picsum.photos/200/300?random=',
      videoClip: [
        { titulo: 'Iglesia5', url: './videos/iglesia5.mp4', portada: 'https://picsum.photos/200/300?random=' },
        { titulo: 'Iglesia6', url: './videos/iglesia6.mp4', portada: 'https://picsum.photos/200/300?random=' },
        { titulo: 'Iglesia7', url: './videos/iglesia7.mp4', portada: 'https://picsum.photos/200/300?random=' },
        { titulo: 'Ascencion', url: './videos/asencion.mp4', portada: 'https://picsum.photos/200/300?random=' }
      ]
    }
  ];

    constructor( ) {

  }





  videoSelected(videoUrl: string): string {
  this.selectedVideo = videoUrl;
  return this.selectedVideo;
}

  useVideoState() {
  const [selectedCategory, setSelectedCategory] = useState<VideoItem | null>(null);

  function handleCategoryClick(category: VideoItem) {
    setSelectedCategory(category);
  }

  const selectedVideos = selectedCategory ? selectedCategory.videoClip : [];

  return { selectedCategory, selectedVideos, handleCategoryClick };
}
}