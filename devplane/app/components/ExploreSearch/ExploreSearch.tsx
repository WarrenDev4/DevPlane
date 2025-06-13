'use client';

import { useState } from 'react';
import styles from './ExploreSearch.module.css';

export default function ExploreSearch() {
  const [search, setSearch] = useState('');
  const categories = [
  'All',
  'Programming',
  'Frameworks',
  'Artificial Intelligence',
  'Web Development',
  'Mobile',
  'Tools',
  'Open Source',
  'Cloud',
  'DevOps',
  'Data Science',
];

const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main className={styles.pageWrapper}>
      <header className={styles.header}>
        <h2>Explore</h2>
      </header>
      <section className={styles.contentArea}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search latest tech news…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.tabButton} ${
              selectedCategory === category ? styles.activeTab : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      </section>
    </main>
  );
}
