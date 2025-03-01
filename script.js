// DOM要素が読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 現在の年を取得してフッターの著作権表示を更新
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2023', currentYear);
    }
    
    // 新しい記事を追加する機能（デモ用）
    const addNewPost = () => {
        const blogPosts = document.querySelector('.blog-posts');
        if (!blogPosts) return;
        
        // 新しい記事のテンプレート
        const newPostTemplate = `
            <article class="post">
                <h2>新しいブログ記事</h2>
                <div class="post-meta">
                    <span class="date">${new Date().toLocaleDateString('ja-JP')}</span>
                    <span class="author">投稿者: ユーザー</span>
                </div>
                <div class="post-content">
                    <p>これは動的に追加された新しいブログ記事です。</p>
                    <p>JavaScriptを使って記事を追加することができます。</p>
                </div>
                <div class="post-tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">動的</span>
                </div>
            </article>
        `;
        
        // 記事を追加
        blogPosts.insertAdjacentHTML('afterbegin', newPostTemplate);
    };
    
    // コンソールにメッセージを表示
    console.log('ブログの初期化が完了しました！');
}); 