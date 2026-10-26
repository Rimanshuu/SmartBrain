// sample photos so first-time visitors can try detection without finding a link themselves
// these are demos only, so they never count toward the user's total
export const EXAMPLE_IMAGES = [
    { label: 'Group of friends', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800' },
    { label: 'People at a table', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800' },
    { label: 'Single portrait', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800' },
];

export const isExampleImage = (url) => EXAMPLE_IMAGES.some(example => example.url === url);
