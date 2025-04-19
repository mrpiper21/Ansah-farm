export const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'crops', name: 'Crop Guides' },
    { id: 'soil', name: 'Soil Health' },
    { id: 'pests', name: 'Pest Control' },
    { id: 'irrigation', name: 'Irrigation' },
  ];

  // Sample resources data with image URLs
  export const resources = [
    {
      id: '1',
      type: 'article',
      title: 'Organic Fertilizer Guide',
      description: 'Learn to make natural fertilizers from farm waste',
      category: 'soil',
      icon: 'compost',
      saved: true,
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      type: 'video',
      title: 'Drip Irrigation Setup',
      description: 'Step-by-step video guide to efficient water systems',
      category: 'irrigation',
      icon: 'water',
      saved: false,
      videoUrl: 'tmEj3MQPlTY',
      thumbnail: 'https://i.ytimg.com/vi/abc123/mqdefault.jpg',
      duration: '12:30'
    },
    {
      id: '3',
      type: 'article',
      title: 'Common Crop Diseases',
      description: 'Identify and treat plant diseases early',
      category: 'crops',
      icon: 'leaf',
      saved: true,
      imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '4',
      type: 'video',
      title: 'Natural Pest Solutions',
      description: 'Chemical-free pest management techniques',
      category: 'pests',
      icon: 'bug',
      saved: false,
      videoUrl: 'EiEObwJVrpM',
      thumbnail: 'https://i.ytimg.com/vi/def456/mqdefault.jpg',
      duration: '8:45'
    },
  ];
  
  export const tips = [
    {
      id: '1',
      type: 'article',
      title: 'Watering in Early Morning',
      content: 'Reduces evaporation and prevents fungal growth',
      category: 'irrigation',
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      type: 'video',
      title: 'Companion Planting Guide',
      content: 'Video tutorial on effective plant pairing',
      category: 'pests',
      videoUrl: 'YkSU5dkAREA',
      thumbnail: 'https://i.ytimg.com/vi/ghi789/mqdefault.jpg',
      duration: '6:15'
    },
  ];
  
