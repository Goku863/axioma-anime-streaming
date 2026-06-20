// Data Store - Local Storage based anime data
const DataStore = {
  STORAGE_KEY: 'animeforyou_data',

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  },

  getList() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  save(list) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  },

  add(anime) {
    const list = this.getList();
    anime.id = anime.id || 'a' + Date.now();
    anime.createdAt = anime.createdAt || new Date().toISOString();
    list.push(anime);
    this.save(list);
    return anime;
  },

  update(id, data) {
    const list = this.getList();
    const idx = list.findIndex(a => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data };
      this.save(list);
      return list[idx];
    }
    return null;
  },

  remove(id) {
    const list = this.getList().filter(a => a.id !== id);
    this.save(list);
  },

  get(id) {
    return this.getList().find(a => a.id === id) || null;
  },

  search(query) {
    const q = query.toLowerCase();
    return this.getList().filter(a =>
      (a.title || '').toLowerCase().includes(q) ||
      (a.genre || '').toLowerCase().includes(q)
    );
  },

  seedData() {
    if (this.getList().length > 0) return;

    const seedAnime = [
      { id: 'a1', title: 'Solo Leveling', genre: 'Action', rating: 9.2, image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg', episodes: 24, status: 'Airing' },
      { id: 'a2', title: 'Jujutsu Kaisen', genre: 'Supernatural', rating: 9.0, image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg', episodes: 48, status: 'Completed' },
      { id: 'a3', title: 'Attack on Titan', genre: 'Action', rating: 9.5, image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg', episodes: 87, status: 'Completed' },
      { id: 'a4', title: 'Demon Slayer', genre: 'Action', rating: 8.8, image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg', episodes: 55, status: 'Airing' },
      { id: 'a5', title: 'My Hero Academia', genre: 'Action', rating: 8.5, image: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg', episodes: 138, status: 'Completed' },
      { id: 'a6', title: 'One Piece', genre: 'Adventure', rating: 9.1, image: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg', episodes: 1100, status: 'Airing' },
      { id: 'a7', title: 'Chainsaw Man', genre: 'Action', rating: 8.9, image: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg', episodes: 12, status: 'Airing' },
      { id: 'a8', title: 'Spy x Family', genre: 'Comedy', rating: 8.7, image: 'https://cdn.myanimelist.net/images/anime/1441/139637l.jpg', episodes: 37, status: 'Airing' },
      { id: 'a9', title: 'Death Note', genre: 'Thriller', rating: 9.3, image: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg', episodes: 37, status: 'Completed' },
      { id: 'a10', title: 'Fullmetal Alchemist', genre: 'Adventure', rating: 9.4, image: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg', episodes: 64, status: 'Completed' },
      { id: 'a11', title: 'Hunter x Hunter', genre: 'Adventure', rating: 9.2, image: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg', episodes: 148, status: 'Completed' },
      { id: 'a12', title: 'Naruto Shippuden', genre: 'Action', rating: 8.6, image: 'https://cdn.myanimelist.net/images/anime/1565/111305l.jpg', episodes: 500, status: 'Completed' },
      { id: 'a13', title: 'Bleach: TYBW', genre: 'Action', rating: 9.0, image: 'https://cdn.myanimelist.net/images/anime/1908/135431l.jpg', episodes: 52, status: 'Airing' },
      { id: 'a14', title: 'Dragon Ball Super', genre: 'Action', rating: 8.4, image: 'https://cdn.myanimelist.net/images/anime/1007/98865l.jpg', episodes: 131, status: 'Completed' },
      { id: 'a15', title: 'Mob Psycho 100', genre: 'Comedy', rating: 8.8, image: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg', episodes: 37, status: 'Completed' },
      { id: 'a16', title: 'Vinland Saga', genre: 'Drama', rating: 9.0, image: 'https://cdn.myanimelist.net/images/anime/1170/124312l.jpg', episodes: 48, status: 'Completed' },
      { id: 'a17', title: 'Code Geass', genre: 'Mecha', rating: 9.1, image: 'https://cdn.myanimelist.net/images/anime/5/50331l.jpg', episodes: 50, status: 'Completed' },
      { id: 'a18', title: 'Steins;Gate', genre: 'Sci-Fi', rating: 9.3, image: 'https://cdn.myanimelist.net/images/anime/5/73199l.jpg', episodes: 24, status: 'Completed' },
      { id: 'a19', title: 'Cyberpunk: Edgerunners', genre: 'Sci-Fi', rating: 8.9, image: 'https://cdn.myanimelist.net/images/anime/1818/126435l.jpg', episodes: 10, status: 'Completed' },
      { id: 'a20', title: 'Frieren', genre: 'Fantasy', rating: 9.4, image: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg', episodes: 28, status: 'Airing' },
    ];

    seedAnime.forEach(a => this.add(a));
  }
};
