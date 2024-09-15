document.addEventListener('DOMContentLoaded', function() {
    const character = document.getElementById('character');
    const markers = document.querySelectorAll('.marker');
    const infoBox = document.getElementById('info-text');

    let x = 50, y = 50;
    const speed = 5;

    // 键盘按下事件，用于控制小人的移动和切换图片
    document.addEventListener('keydown', function(e) {
        switch (e.key) {
            case 'w': // W - 向上移动
                y -= speed;
                break;
            case 'a': // A - 向左移动
                x -= speed;
                character.style.backgroundImage = 'url("left.png")';  // 切换为左侧图片
                break;
            case 's': // S - 向下移动
                y += speed;
                break;
            case 'd': // D - 向右移动
                x += speed;
                character.style.backgroundImage = 'url("right.png")';  // 切换为右侧图片
                break;
        }

        // 更新小人的位置
        character.style.transform = `translate(${x}px, ${y}px)`;

        // 检查小人与标记点的距离
        markers.forEach(marker => {
            const markerRect = marker.getBoundingClientRect();
            const characterRect = character.getBoundingClientRect();

            // 计算小人与标记点之间的距离
            const dist = Math.sqrt(Math.pow(markerRect.left - characterRect.left, 2) +
                                   Math.pow(markerRect.top - characterRect.top, 2));

            // 如果距离小于50像素，则显示建筑信息
            if (dist < 100) {
                infoBox.innerText = marker.dataset.info;
            }
        });
    });

    // 在松开键盘时，小人图片恢复为默认状态（上下移动保持man.png）
    document.addEventListener('keyup', function(e) {
        if (e.key === 'w' || e.key === 's') {
            // 上下移动时不切换图片，保持原来的man.png
            character.style.backgroundImage = 'url("right.png")';
        }
    });
});
