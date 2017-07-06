export const config = {
  title: "Your awesome title",
  email: "your-email@domain.com",
  baseurl: "",
  url: "http://yourdomain.com",
  theme: "test"
};

export const collections = [
  {
    label: "posts",
    path: "/posts"
  },
  {
    label: "movies",
    path: "/movies"
  }
];

export const content = {
  content: "Body",
  title: "GSoC",
  layout: "post",
  path: "gsoc.md",
  categories: "gsoc",
  students: [
    "GSoC Students",
    {
      name: {
        first: "Mert",
        last: "Kahyaoğlu"
      },
      email: [
        "mertkahyaoglu93@gmail.com",
        "test@gmail.com"
      ],
      username: "mertkahyaoglu"
    },
    {
      name: {
        first: "Ankur",
        last: "Singh"
      },
      email: "ankur13019@iiitd.ac.in",
      username: "rush-skills"
    }
  ],
  mentors: ["Ben Balter", "Jurgen Leschner", "Parker Moore"]
};

export const notification = {
  title: 'Test',
  message: 'Testing notifications',
  level: 'success'
};

export const site = {
  layouts: ['default', 'test'],
  content_pages: ['page.md', 'test.md'],
  drafts: ['draft.md'],
  posts: ['2017-06-01-test-post.md'],
  collections: ['posts', 'puppies'],
  data_files: ['data.yml'],
  static_files: ['static-text.txt']
};

export const blank_site = {
  content_pages: [],
  drafts: [],
  posts: [],
  collections: ['posts'],
  data_files: [],
  static_files: []
};
