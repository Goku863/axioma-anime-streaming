// AnimeForYou - Data Store
const DataStore = {
  LS_KEY: 'a4y_anime_library',
  LS_VER: 'a4y_ver',
  CURRENT_VER: 5,

  init() {
    var ver = parseInt(localStorage.getItem(this.LS_VER) || '0');
    if (ver < this.CURRENT_VER) {
      localStorage.removeItem(this.LS_KEY);
      localStorage.setItem(this.LS_VER, String(this.CURRENT_VER));
    }
  },

  getList() {
    try { return JSON.parse(localStorage.getItem(this.LS_KEY) || '[]'); }
    catch (e) { return []; }
  },

  setList(list) {
    localStorage.setItem(this.LS_KEY, JSON.stringify(list));
  },

  normalizeAnime(a) {
    if (!a.episodes) a.episodes = [];
    if (typeof a.episodes === 'number') {
      a.episodeCount = a.episodes;
      a.episodes = [];
    }
    if (!a.image && a.cover) a.image = a.cover;
    if (!a.id) a.id = Date.now() + Math.floor(Math.random() * 1000);
    if (!a.createdAt) a.createdAt = Date.now();
    return a;
  },

  getEpCount(a) {
    if (a.episodes && Array.isArray(a.episodes) && a.episodes.length > 0) return a.episodes.length;
    if (a.episodeCount) return a.episodeCount;
    if (typeof a.episodes === 'number') return a.episodes;
    return 0;
  },

  async saveAnime(list) {
    let maxId = 0;
    list.forEach(a => { if (a.id && a.id > maxId) maxId = a.id; });
    list.forEach(a => { if (!a.id) { maxId++; a.id = maxId; } });
    list = list.map(a => this.normalizeAnime(a));
    this.setList(list);
    return list;
  },

  async addAnime(anime) {
    const list = this.getList();
    list.push(anime);
    return this.saveAnime(list);
  },

  async deleteAnime(id) {
    const list = this.getList().filter(a => a.id !== id);
    return this.saveAnime(list);
  },

  async seedData() {
    var list = this.getList();
    var maxId = 0;
    list.forEach(function(a) { if (a.id && a.id > maxId) maxId = a.id; });
    list.forEach(function(a) {
      if (!a.id) { maxId++; a.id = a.id || maxId; }
      if (!a.episodes) a.episodes = [];
      if (typeof a.episodes === 'number') { a.episodeCount = a.episodes; a.episodes = []; }
      if (!a.image && a.cover) a.image = a.cover;
      if (!a.createdAt) a.createdAt = Date.now();
    });
    this.setList(list);
  },

  async addAnimeManual(anime) {
    var list = this.getList();
    var exists = list.find(function(a) { return a.title === anime.title; });
    if (exists) return exists;
    anime.id = anime.id || Date.now();
    anime.createdAt = anime.createdAt || Date.now();
    if (!anime.episodes) anime.episodes = [];
    list.push(anime);
    this.setList(list);
    return anime;
  }
};
