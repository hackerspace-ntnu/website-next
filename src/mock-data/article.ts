const articleMockData = [
  {
    id: 1,
    internal: true,
    title: 'Gruppe status: prosjekt spill',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis aut perferendis a, deleniti accusantium amet sunt autem eligendi repellat soluta omnis, nisi quam at vero perspiciatis. Ex repellendus saepe excepturi. Quam repellendus culpa quia facilis, exercitationem ipsa voluptatem nostrum aut libero labore quisquam est sed odio modi, eius quaerat tenetur deserunt facere officiis odit quibusdam consequuntur, rem vel similique? Nesciunt. Possimus libero ab suscipit enim quia. Error rerum architecto quidem ad voluptates distinctio minima tempore vel veniam esse ipsum officia atque, voluptatem molestias magni corrupti ducimus, placeat sint blanditiis praesentium? Cumque dignissimos totam pariatur repellat quod, vitae alias nostrum! Porro sequi mollitia blanditiis nulla accusantium fugiat explicabo! Soluta rerum debitis voluptates. Esse asperiores soluta facere fuga? Quas facilis nam inventore! Reiciendis tempora autem commodi dolor in doloremque eius a veritatis doloribus aliquid. Animi ipsam voluptatum sequi, eveniet placeat laboriosam iure, ullam ex odio reiciendis dicta enim libero, cupiditate et? Non. Quis ut eos, quod laboriosam suscipit exercitationem ratione incidunt blanditiis animi veritatis. Quos possimus exercitationem dolor inventore, esse ipsum, quod placeat provident officia et ab nihil? Modi impedit soluta eveniet. Sit qui cupiditate mollitia corrupti, sapiente neque enim vel praesentium veritatis voluptatibus? Laudantium sit nulla assumenda! Esse obcaecati sint dolores quos dolorum aliquam cum excepturi autem ad, fuga culpa veritatis! Quo nisi accusantium voluptatibus ipsam quia, ratione consectetur cupiditate adipisci sequi, nobis ab animi dolorem hic. Voluptates repellat ut molestias harum eos illo, odio sapiente doloribus, minima quidem, reprehenderit eum. Optio ut repellendus repudiandae at odit! Voluptates quidem eos perferendis amet veritatis quo excepturi fuga ipsa sunt quod facilis saepe, libero ea, neque cupiditate. Sint inventore laudantium error? Consectetur, porro. Laborum id assumenda, repellat ipsam cupiditate dolorum provident quod nostrum beatae a praesentium sequi animi corporis consequuntur. Atque inventore porro eum vitae? Architecto, officiis fugit tempora deserunt temporibus totam tenetur!',
  },
  {
    id: 2,
    internal: false,
    title: 'DevOps Møtet',
    date: '69. oktober 6969',
    photoUrl: 'mock.jpg',
  },
  {
    id: 3,
    internal: false,
    title: 'Jonas er kul',
    date: '42. november 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 4,
    internal: true,
    title: 'Iskrem er godt',
    date: '18. februar 1942',
    photoUrl: 'mock.jpg',
  },
  {
    id: 5,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 6,
    internal: true,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 7,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 8,
    internal: false,
    title: 'Dette er en veeeeldig lang overskrift som skal testes',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 9,
    internal: true,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 10,
    internal: true,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 11,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 12,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 13,
    internal: true,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 14,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 15,
    internal: true,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 16,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 17,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 18,
    internal: false,
    title: '18',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },

  {
    id: 19,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 20,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 21,
    internal: false,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 22,
    internal: true,
    title: 'Hvorfor er jeg her?',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
  {
    id: 23,
    internal: false,
    title: '23',
    date: '22. oktober 2023',
    photoUrl: 'mock.jpg',
  },
];

const authorMockData = [
  {
    name: 'Michael Jackson',
    initials: 'MJ',
    photoUrl: 'authorMock.jpg',
  },
];

export { articleMockData, authorMockData };
