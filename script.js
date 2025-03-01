// DOM要素が読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーを読み込む
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // 現在のページに応じてナビゲーションのアクティブ状態を設定
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'index.html' || currentPage === '') {
                document.getElementById('nav-home').classList.add('active');
            } else if (currentPage === 'articles.html') {
                document.getElementById('nav-articles').classList.add('active');
            } else if (currentPage === 'works.html') {
                document.getElementById('nav-works').classList.add('active');
            } else if (currentPage === 'profile.html') {
                document.getElementById('nav-profile').classList.add('active');
            }
        });
    
    // フッターを読み込む
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
    
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