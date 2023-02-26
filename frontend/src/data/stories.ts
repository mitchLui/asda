export type Story = {
  id: number;
  title: string;
  description: string;
  detail: string,
  image: string;
  imageAlt: string;
  storyURL: string;
}

export const stories: Story[] = [
  {
    id: 1,
    title: 'Protecting people',
    description: 'James McKenzie in Scotland had his tongue bit off by a woman in Edinburgh before a seagull swooped in and ate it.',
    detail: "While we cannot prevent a guy's tongue from being bit off, we could have prevented it from being taken with our propriety range of ASDA's.",
    image: '/story-1.jpg',
    imageAlt: 'Story 1 image',
    storyURL: 'https://www.edinburghnews.scotsman.com/news/crime/edinburgh-woman-bit-off-mans-tongue-in-street-brawl-before-seagull-swooped-down-and-ate-it-3141625'
  },
  {
    id: 2,
    title: 'Protecting animals',
    description: "Becca Louse Hill's family pet Chihuahua Gizmo was grabbed by a seagull in Paignton, Devon.",
    detail: 'Pets can wear a portable ASDA on their collar to prevent seagulls from stealing them.',
    image: '/story-2.jpg',
    imageAlt: 'Story 2 image',
    storyURL: 'https://www.bbc.com/news/uk-england-devon-49070562'
  },
  {
    id: 3,
    title: 'Protecting fish and chips',
    description: "PC Ryan Francis had his fish and chips stolen by a seagull in Tenby. The seagull reportedly 'went straight for the fish'.",
    detail: 'Story 3 detail',
    image: '/story-3.jpg',
    imageAlt: 'Story 3 image',
    storyURL: 'https://www.bbc.com/news/uk-wales-south-west-wales-43727683'
  }
];