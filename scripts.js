        let currentPage = 1;
        const page1 = document.querySelector('.page1');
        const page2 = document.querySelector('.page2');
        const page3 = document.querySelector('.page3');
        let startY;

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

        const professionButtons = document.querySelectorAll('.profession-list button');
        const professionImage = document.getElementById('profession-image');

        professionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 更新图片
                const imageSrc = button.getAttribute('data-image');
                professionImage.src = imageSrc;

                // 更新选中状态
                professionButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

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
 </script>



 <script>
const roleButtons = document.querySelectorAll('.profession-list > button[data-role]');
        const subLists = document.querySelectorAll('.sub-list');
        const professionImage = document.getElementById('profession-image');

        roleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const subList = button.nextElementSibling;

                // 显示或隐藏子列表
                if (subList.style.display === 'block') {
                    subList.style.display = 'none';
                } else {
                    subLists.forEach(list => list.style.display = 'none'); // 隐藏其他子列表
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