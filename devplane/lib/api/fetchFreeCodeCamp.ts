export async function fetchFreeCodeCampArticles() {
  const res = await fetch('https://dev.to/api/articles?username=freecodecamp');
  const data = await res.json();

  const formatted = data.map((item: any, index: number) => {
    const tags = item.tag_list.map((t: string) => t.toLowerCase());
    let category = 'Programming'; 
    console.log(`Tags for "${item.title}":`, tags);

    if (
      tags.includes('ai') ||
      tags.includes('machine learning') ||
      tags.includes('deep learning') ||
      tags.includes('artificial intelligence')
    ) {
      category = 'AI/ML';
    }

    if (
      tags.includes('web') ||
      tags.includes('html') ||
      tags.includes('css') ||
      tags.includes('javascript') ||
      tags.includes('react') ||
      tags.includes('next.js') ||
      tags.includes('vue.js') ||
      tags.includes('angular') ||
      tags.includes('spring boot') ||
      tags.includes('flask') ||
      tags.includes('django') ||
      tags.includes('.net') ||
      tags.includes('node.js')
    ) {
      category = 'Web Development';
    }

    if (
      tags.includes('cs') ||
      tags.includes('computer science') ||
      tags.includes('data structures') ||
      tags.includes('algorithms') ||
      tags.includes('big o notation') ||
      tags.includes('time complexity')
    ) {
      category = 'CS Concepts';
    }

    if (
      tags.includes('career') ||
      tags.includes('interview') ||
      tags.includes('resume') ||
      tags.includes('portfolio')
    ) {
      category = 'Career Tips';
    }

    if (
      tags.includes('clean code') ||
      tags.includes('best practices') ||
      tags.includes('refactoring')
    ) {
      category = 'Best Practices';
    }

    const article = {
      id: item.id || index,
      title: item.title || '',
      url: item.url || item.canonical_url || '',
      description: item.description || 'No description available.',
      source: 'freeCodeCamp',
      category,
    };

    console.log(`→ Categorized: "${article.title}" => ${category}`);
    return article;
  });

  return formatted;
}
