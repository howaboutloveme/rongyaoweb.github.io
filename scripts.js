// 页面切换逻辑
let currentPage = 1;
const page1 = document.querySelector('.page1');
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
let startY;

// 新增：初始化时强制显示当前页（避免刷新时隐藏状态残留）
showPage(currentPage);

const showPage = (page) => {
    page1.classList.add('hidden');
    page2.classList.add('hidden');
    page3.classList.add('hidden');

    if (page === 1) {
        page1.classList.remove('hidden');
    } else if (page === 2) {
        page2.classList.remove('hidden');
    } else if (page === 3) {
        page3.classList.remove('hidden');
    }
};

window.addEventListener('touchstart', function(event) {
    startY = event.touches[0].pageY;
});

window.addEventListener('touchmove', function(event) {
    if (startY) {
        const currentY = event.touches[0].pageY;
        const deltaY = currentY - startY;
        if (deltaY > 50) {
            currentPage = Math.max(1, currentPage - 1);
            showPage(currentPage);
            startY = null;
        } else if (deltaY < -50) {
            currentPage = Math.min(3, currentPage + 1);
            showPage(currentPage);
            startY = null;
        }
    }
});

window.addEventListener('wheel', function(event) {
    if (event.deltaY < 0) {
        currentPage = Math.max(1, currentPage - 1);
        showPage(currentPage);
    } else {
        currentPage = Math.min(3, currentPage + 1);
        showPage(currentPage);
    }
});

// 职业列表逻辑（无变化）
const roleButtons = document.querySelectorAll('.profession-list > button[data-role]');
const subLists = document.querySelectorAll('.sub-list');
const professionImage = document.getElementById('profession-image');

roleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const subList = button.nextElementSibling;
        if (subList.style.display === 'block') {
            subList.style.display = 'none';
        } else {
            subLists.forEach(list => list.style.display = 'none');
            subList.style.display = 'block';
        }
    });
});

const subButtons = document.querySelectorAll('.sub-list button');
subButtons.forEach(button => {
    button.addEventListener('click', () => {
        const imageSrc = button.getAttribute('data-image');
        professionImage.src = imageSrc || '';
    });
});

// 获取按钮元素
const scrollDownBtn = document.getElementById('scrollDownBtn');
const scrollUpBtn = document.getElementById('scrollUpBtn');

// 初始化按钮状态
function updateButtonVisibility() {
    if (currentPage === 3) {
        // 最后一页：显示向上按钮，隐藏向下按钮
        scrollDownBtn.classList.add('hidden');
        scrollUpBtn.classList.remove('hidden');
    } else {
        // 非最后一页：显示向下按钮，隐藏向上按钮
        scrollDownBtn.classList.remove('hidden');
        scrollUpBtn.classList.add('hidden');
    }
}

// 按钮点击事件
scrollDownBtn.addEventListener('click', () => {
    currentPage = Math.min(3, currentPage + 1);
    showPage(currentPage);
    updateButtonVisibility(); // 更新按钮状态
});

scrollUpBtn.addEventListener('click', () => {
    currentPage = Math.max(1, currentPage - 1);
    showPage(currentPage);
    updateButtonVisibility(); // 更新按钮状态
});

// 初始调用（确保页面加载时按钮状态正确）
updateButtonVisibility();

// 在页面切换逻辑中补充调用（确保切换页面时按钮更新）
function showPage(page) {
    // 原有逻辑...
    updateButtonVisibility(); // 页面切换后更新按钮状态
}

